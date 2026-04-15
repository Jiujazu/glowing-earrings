"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface WaveShapeProps {
  children: ReactNode;
  className?: string;
}

export default function WaveShape({ children, className = "" }: WaveShapeProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const lastMoveRef = useRef({ x: 0, y: 0, time: 0 });
  const cooldownRef = useRef(false);
  const tiltRAF = useRef(0);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const el = elRef.current;
    const spin = spinRef.current;
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

    // Scale + lift effect (shadow grows, shape scales up)
    const scale = 1 + intensity * 0.06;
    const shadowOffset = Math.round(4 + intensity * 4);
    el.style.transition = "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease-out";
    el.style.transform = `scale(${scale})`;
    el.style.filter = `drop-shadow(${shadowOffset}px ${shadowOffset}px 0px var(--neo-shadow-color, rgba(0,0,0,0.8)))`;

    // Spin the inner element 360°
    if (spin) {
      spin.style.transition = "rotate 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      spin.style.rotate = "360deg";
    }

    // Cooldown to prevent spam
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = elRef.current;
    const spin = spinRef.current;
    if (!el) return;
    cancelAnimationFrame(tiltRAF.current);
    el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease-out";
    el.style.transform = "";
    el.style.filter = "";

    // Spin back to 0°
    if (spin) {
      spin.style.transition = "rotate 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      spin.style.rotate = "0deg";
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    lastMoveRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };

    const el = elRef.current;
    if (!el) return;

    // 3D magnetic tilt based on cursor position within element
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(tiltRAF.current);
    tiltRAF.current = requestAnimationFrame(() => {
      const rotateY = cx * 20;  // max ±10°
      const rotateX = -cy * 20; // max ±10°
      el.style.transition = "transform 0.1s ease-out";
      el.style.transform = `perspective(200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    });
  }, []);

  return (
    <div
      ref={elRef}
      className={`cursor-default ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={spinRef}>
        {children}
      </div>
    </div>
  );
}
