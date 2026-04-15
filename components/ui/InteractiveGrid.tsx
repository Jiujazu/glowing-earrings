"use client";

import { useRef, useEffect, useCallback } from "react";

interface Wave {
  x: number;
  y: number;
  time: number;
  intensity: number;
}

interface InteractiveGridProps {
  className?: string;
  spacing?: number;
  influenceRadius?: number;
  maxDisplacement?: number;
}

export default function InteractiveGrid({
  className = "",
  spacing = 40,
  influenceRadius = 300,
  maxDisplacement = 24,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastDrawRef = useRef({ x: -9999, y: -9999 });
  const isActiveRef = useRef(false);
  const wavesRef = useRef<Wave[]>([]);
  const cachedRectRef = useRef<DOMRect | null>(null);

  const getDisplaced = useCallback(
    (gx: number, gy: number, mx: number, my: number, now: number) => {
      let dx = 0;
      let dy = 0;
      let factor = 0;

      // Mouse displacement
      const ddx = gx - mx;
      const ddy = gy - my;
      const dist2 = ddx * ddx + ddy * ddy;
      const r2 = influenceRadius * influenceRadius;

      if (dist2 < r2 && dist2 > 0) {
        const dist = Math.sqrt(dist2);
        factor = 1 - dist / influenceRadius;
        const push = factor * factor * factor * maxDisplacement;
        dx += (ddx / dist) * push;
        dy += (ddy / dist) * push;
      }

      // Wave displacement
      for (const wave of wavesRef.current) {
        const wdx = gx - wave.x;
        const wdy = gy - wave.y;
        const wDist = Math.sqrt(wdx * wdx + wdy * wdy);
        const elapsed = (now - wave.time) / 1000;
        const waveSpeed = 400;
        const waveRadius = elapsed * waveSpeed;
        const waveWidth = 120;

        // Is this point within the wave ring?
        const distFromRing = Math.abs(wDist - waveRadius);
        if (distFromRing < waveWidth) {
          const ringFactor = 1 - distFromRing / waveWidth;
          // Fade out over time
          const fade = Math.max(0, 1 - elapsed * 1.2);
          const amplitude = ringFactor * fade * wave.intensity * 8;

          if (wDist > 0) {
            dx += (wdx / wDist) * amplitude;
            dy += (wdy / wDist) * amplitude;
          }
          factor = Math.max(factor, ringFactor * fade * wave.intensity * 0.5);
        }
      }

      return { x: gx + dx, y: gy + dy, factor };
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
    const now = performance.now();

    // Prune expired waves
    wavesRef.current = wavesRef.current.filter(w => (now - w.time) < 2000);

    ctx.clearRect(0, 0, w, h);

    const style = getComputedStyle(canvas);
    const isDark = document.documentElement.classList.contains("dark");
    const borderColor = style.getPropertyValue("--neo-border").trim() || (isDark ? "#FFF" : "#000");

    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;

    // Build displaced grid
    const points: { x: number; y: number; factor: number }[][] = [];
    for (let col = 0; col < cols; col++) {
      points[col] = [];
      for (let row = 0; row < rows; row++) {
        points[col][row] = getDisplaced(col * spacing, row * spacing, mx, my, now);
      }
    }

    // Draw base grid lines
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.15;

    for (let row = 0; row < rows; row++) {
      ctx.beginPath();
      for (let col = 0; col < cols; col++) {
        const p = points[col][row];
        if (col === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    for (let col = 0; col < cols; col++) {
      ctx.beginPath();
      for (let row = 0; row < rows; row++) {
        const p = points[col][row];
        if (row === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Glow segments near cursor and waves
    ctx.lineWidth = 1.5;
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

    // Intersection dots
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

    ctx.globalAlpha = 1;
  }, [spacing, getDisplaced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let running = true;

    function onMouseMove(e: MouseEvent) {
      const rect = cachedRectRef.current;
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -influenceRadius && x <= rect.width + influenceRadius &&
          y >= -influenceRadius && y <= rect.height + influenceRadius) {
        mouseRef.current = { x, y };
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          loop();
        }
      } else if (isActiveRef.current && wavesRef.current.length === 0) {
        mouseRef.current = { x: -1000, y: -1000 };
        lastDrawRef.current = { x: -9999, y: -9999 };
        draw(); // restore base grid
        isActiveRef.current = false;
      }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
      lastDrawRef.current = { x: -9999, y: -9999 };
      draw(); // restore base grid
      if (wavesRef.current.length === 0) {
        isActiveRef.current = false;
      }
    }

    // Listen for wave events from shapes
    function onWaveEvent(e: Event) {
      const detail = (e as CustomEvent).detail;
      wavesRef.current.push({
        x: detail.x,
        y: detail.y,
        time: performance.now(),
        intensity: Math.min(detail.intensity, 3),
      });
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        loop();
      }
    }

    function loop() {
      if (!running || !isActiveRef.current) return;
      draw();

      // Keep running if waves are active
      if (wavesRef.current.length > 0 || mouseRef.current.x > -500) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        isActiveRef.current = false;
      }
    }

    cachedRectRef.current = canvas.getBoundingClientRect();
    draw();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("grid-wave", onWaveEvent);

    const resizeObserver = new ResizeObserver(() => {
      cachedRectRef.current = canvas.getBoundingClientRect();
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
      document.removeEventListener("grid-wave", onWaveEvent);
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
