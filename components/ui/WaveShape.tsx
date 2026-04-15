"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface WaveShapeProps {
  children: ReactNode;
  className?: string;
}

export default function WaveShape({ children, className = "" }: WaveShapeProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const lastMoveRef = useRef({ x: 0, y: 0, time: 0 });
  const cooldownRef = useRef(false);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const el = elRef.current;
    if (!el || cooldownRef.current) return;

    // Calculate mouse speed from last move
    const now = performance.now();
    const dt = now - lastMoveRef.current.time;
    const dx = e.clientX - lastMoveRef.current.x;
    const dy = e.clientY - lastMoveRef.current.y;
    const speed = dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0;

    // Intensity based on speed (0.3 = gentle, 2.5 = strong)
    const intensity = Math.min(0.3 + speed * 3, 2.5);

    // Dispatch wave event for the grid
    const rect = el.getBoundingClientRect();
    const section = el.closest("section");
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      document.dispatchEvent(new CustomEvent("grid-wave", {
        detail: {
          x: rect.left + rect.width / 2 - sectionRect.left,
          y: rect.top + rect.height / 2 - sectionRect.top,
          intensity,
        },
      }));
    }

    // Vibrate the shape — intensity controls amplitude
    const amp = Math.round(1 + intensity * 2);
    el.style.animation = "none";
    // Force reflow
    void el.offsetHeight;
    el.style.setProperty("--vx", `${(Math.random() - 0.5) * amp}px`);
    el.style.setProperty("--vy", `${(Math.random() - 0.5) * amp}px`);
    el.style.setProperty("--vr", `${(Math.random() - 0.5) * amp}deg`);
    el.style.animation = `neo-vibrate ${0.2 + intensity * 0.15}s ease-out`;

    // Cooldown to prevent spam
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 400);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    lastMoveRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
  }, []);

  return (
    <div
      ref={elRef}
      className={`cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onAnimationEnd={(e) => {
        (e.currentTarget as HTMLDivElement).style.animation = "";
      }}
    >
      {children}
    </div>
  );
}
