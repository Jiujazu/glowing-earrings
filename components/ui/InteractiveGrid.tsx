"use client";

import { useRef, useEffect, useCallback } from "react";

interface InteractiveGridProps {
  className?: string;
  spacing?: number;
  influenceRadius?: number;
  maxDisplacement?: number;
}

export default function InteractiveGrid({
  className = "",
  spacing = 40,
  influenceRadius = 140,
  maxDisplacement = 16,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastDrawRef = useRef({ x: -1000, y: -1000 });

  // Pre-compute displaced grid positions
  const getDisplaced = useCallback(
    (gx: number, gy: number, mx: number, my: number) => {
      const ddx = gx - mx;
      const ddy = gy - my;
      const dist2 = ddx * ddx + ddy * ddy;
      const r2 = influenceRadius * influenceRadius;

      if (dist2 < r2 && dist2 > 0) {
        const dist = Math.sqrt(dist2);
        const factor = 1 - dist / influenceRadius;
        const push = factor * factor * maxDisplacement;
        return {
          x: gx + (ddx / dist) * push,
          y: gy + (ddy / dist) * push,
        };
      }
      return { x: gx, y: gy };
    },
    [influenceRadius, maxDisplacement]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const dx = mx - lastDrawRef.current.x;
    const dy = my - lastDrawRef.current.y;
    if (dx * dx + dy * dy < 4) return;
    lastDrawRef.current = { x: mx, y: my };

    ctx.clearRect(0, 0, w, h);

    const style = getComputedStyle(canvas);
    const borderColor = style.getPropertyValue("--neo-border").trim() || "#000";

    const cols = Math.ceil(w / spacing) + 1;
    const rows = Math.ceil(h / spacing) + 1;

    // Build displaced grid
    const points: { x: number; y: number }[][] = [];
    for (let col = 0; col < cols; col++) {
      points[col] = [];
      for (let row = 0; row < rows; row++) {
        points[col][row] = getDisplaced(col * spacing, row * spacing, mx, my);
      }
    }

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.08;

    // Draw horizontal lines
    for (let row = 0; row < rows; row++) {
      ctx.beginPath();
      for (let col = 0; col < cols; col++) {
        const p = points[col][row];
        if (col === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
    }

    // Draw vertical lines
    for (let col = 0; col < cols; col++) {
      ctx.beginPath();
      for (let row = 0; row < rows; row++) {
        const p = points[col][row];
        if (row === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
    }

    // Draw intersection dots (subtle, bigger near cursor)
    const r2 = influenceRadius * influenceRadius;
    ctx.fillStyle = borderColor;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const p = points[col][row];
        const ddx = col * spacing - mx;
        const ddy = row * spacing - my;
        const dist2 = ddx * ddx + ddy * ddy;

        if (dist2 < r2) {
          const factor = 1 - Math.sqrt(dist2) / influenceRadius;
          ctx.globalAlpha = 0.06 + factor * 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1 + factor * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1;
  }, [spacing, influenceRadius, getDisplaced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let running = true;

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
      lastDrawRef.current = { x: -9999, y: -9999 };
    }

    function loop() {
      if (!running) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    draw();
    canvas.addEventListener("mouseenter", () => {
      if (running) loop();
    });
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      lastDrawRef.current = { x: -9999, y: -9999 };
      draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
