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
  influenceRadius = 200,
  maxDisplacement = 24,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastDrawRef = useRef({ x: -1000, y: -1000 });
  const isActiveRef = useRef(false);

  const getDisplaced = useCallback(
    (gx: number, gy: number, mx: number, my: number) => {
      const ddx = gx - mx;
      const ddy = gy - my;
      const dist2 = ddx * ddx + ddy * ddy;
      const r2 = influenceRadius * influenceRadius;

      if (dist2 < r2 && dist2 > 0) {
        const dist = Math.sqrt(dist2);
        const factor = 1 - dist / influenceRadius;
        // Cubic easing for softer, more organic falloff
        const push = factor * factor * factor * maxDisplacement;
        return {
          x: gx + (ddx / dist) * push,
          y: gy + (ddy / dist) * push,
          factor,
        };
      }
      return { x: gx, y: gy, factor: 0 };
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
    if (dx * dx + dy * dy < 2) return;
    lastDrawRef.current = { x: mx, y: my };

    ctx.clearRect(0, 0, w, h);

    const style = getComputedStyle(canvas);
    const borderColor = style.getPropertyValue("--neo-border").trim() || "#000";

    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;

    // Build displaced grid
    const points: { x: number; y: number; factor: number }[][] = [];
    for (let col = 0; col < cols; col++) {
      points[col] = [];
      for (let row = 0; row < rows; row++) {
        points[col][row] = getDisplaced(col * spacing, row * spacing, mx, my);
      }
    }

    // Draw grid lines — base opacity higher for visibility
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;

    // Horizontal lines
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
      ctx.globalAlpha = 0.12;
      ctx.stroke();
    }

    // Vertical lines
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
      ctx.globalAlpha = 0.12;
      ctx.stroke();
    }

    // Near-cursor: thicker lines for "glow" effect
    if (mx > -500) {
      ctx.lineWidth = 1.5;
      const glowRadius = influenceRadius * 0.7;
      const gr2 = glowRadius * glowRadius;

      // Horizontal glow segments
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const p1 = points[col][row];
          const p2 = points[col + 1][row];
          const avgFactor = (p1.factor + p2.factor) / 2;
          if (avgFactor > 0.01) {
            ctx.globalAlpha = avgFactor * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Vertical glow segments
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          const p1 = points[col][row];
          const p2 = points[col][row + 1];
          const avgFactor = (p1.factor + p2.factor) / 2;
          if (avgFactor > 0.01) {
            ctx.globalAlpha = avgFactor * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Intersection dots near cursor
      ctx.fillStyle = borderColor;
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const p = points[col][row];
          if (p.factor > 0.05) {
            ctx.globalAlpha = p.factor * 0.4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2 + p.factor * 3, 0, Math.PI * 2);
            ctx.fill();
          }
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

    // Listen on document so mouse works even over text/buttons
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only track if mouse is within or near the canvas bounds
      if (x >= -influenceRadius && x <= rect.width + influenceRadius &&
          y >= -influenceRadius && y <= rect.height + influenceRadius) {
        mouseRef.current = { x, y };

        if (!isActiveRef.current) {
          isActiveRef.current = true;
          loop();
        }
      } else if (isActiveRef.current) {
        mouseRef.current = { x: -1000, y: -1000 };
        lastDrawRef.current = { x: -9999, y: -9999 };
        isActiveRef.current = false;
      }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
      lastDrawRef.current = { x: -9999, y: -9999 };
      isActiveRef.current = false;
    }

    function loop() {
      if (!running || !isActiveRef.current) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    // Initial static draw
    draw();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      lastDrawRef.current = { x: -9999, y: -9999 };
      draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      running = false;
      isActiveRef.current = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
    };
  }, [draw, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
