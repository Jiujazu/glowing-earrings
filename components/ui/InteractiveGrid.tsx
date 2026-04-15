"use client";

import { useRef, useEffect, useCallback } from "react";

interface InteractiveGridProps {
  className?: string;
  spacing?: number;
  dotSize?: number;
  influenceRadius?: number;
  maxDisplacement?: number;
}

export default function InteractiveGrid({
  className = "",
  spacing = 32,
  dotSize = 1.2,
  influenceRadius = 120,
  maxDisplacement = 14,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastDrawRef = useRef({ x: -1000, y: -1000 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Only resize if needed
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Skip redraw if mouse hasn't moved enough
    const dx = mx - lastDrawRef.current.x;
    const dy = my - lastDrawRef.current.y;
    if (dx * dx + dy * dy < 4) return;
    lastDrawRef.current = { x: mx, y: my };

    ctx.clearRect(0, 0, w, h);

    // Read the CSS custom property for color
    const style = getComputedStyle(canvas);
    const borderColor = style.getPropertyValue("--neo-border").trim() || "#000";
    ctx.fillStyle = borderColor;

    const r2 = influenceRadius * influenceRadius;

    for (let gx = spacing; gx < w; gx += spacing) {
      for (let gy = spacing; gy < h; gy += spacing) {
        const ddx = gx - mx;
        const ddy = gy - my;
        const dist2 = ddx * ddx + ddy * ddy;

        let drawX = gx;
        let drawY = gy;
        let size = dotSize;

        if (dist2 < r2 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          // Quadratic falloff: stronger push near center
          const factor = 1 - dist / influenceRadius;
          const push = factor * factor * maxDisplacement;
          drawX += (ddx / dist) * push;
          drawY += (ddy / dist) * push;
          // Dots grow slightly when displaced
          size = dotSize + factor * 1.2;
        }

        ctx.globalAlpha = 0.08 + (dist2 < r2 ? (1 - Math.sqrt(dist2) / influenceRadius) * 0.12 : 0);
        ctx.beginPath();
        ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }, [spacing, dotSize, influenceRadius, maxDisplacement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Check for touch-only devices (no hover)
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
      // Force one more draw to reset
      lastDrawRef.current = { x: -9999, y: -9999 };
    }

    function loop() {
      if (!running) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    // Initial draw
    draw();
    // Only start the animation loop when mouse enters
    canvas.addEventListener("mouseenter", () => {
      if (running) loop();
    });
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // Handle resize
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
