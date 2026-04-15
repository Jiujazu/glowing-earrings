"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface FloatingShapeProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  initialX: number;
  initialY: number;
  size: number;
  pushRadius?: number;
  pushForce?: number;
  friction?: number;
  bounceDecay?: number;
}

export default function FloatingShape({
  children,
  className = "",
  style,
  initialX,
  initialY,
  size,
  pushRadius = 120,
  pushForce = 8,
  friction = 0.96,
  bounceDecay = 0.7,
}: FloatingShapeProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: initialX, y: initialY });
  const velRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);
  const rotRef = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    function getParentRect() {
      return parent!.getBoundingClientRect();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = getParentRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Check if mouse is near this shape
      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < pushRadius && dist > 0) {
        // Push away from cursor
        const factor = (1 - dist / pushRadius);
        const force = factor * factor * pushForce;
        velRef.current.x -= (dx / dist) * force;
        velRef.current.y -= (dy / dist) * force;

        if (!activeRef.current) {
          activeRef.current = true;
          loop();
        }
      }
    }

    function loop() {
      const vx = velRef.current.x * friction;
      const vy = velRef.current.y * friction;
      velRef.current.x = vx;
      velRef.current.y = vy;

      let nx = posRef.current.x + vx;
      let ny = posRef.current.y + vy;

      // Get current parent bounds
      const rect = getParentRect();
      const halfSize = size / 2;
      const minX = halfSize;
      const maxX = rect.width - halfSize;
      const minY = halfSize;
      const maxY = rect.height - halfSize;

      // Bounce off edges
      if (nx < minX) {
        nx = minX;
        velRef.current.x = Math.abs(velRef.current.x) * bounceDecay;
      } else if (nx > maxX) {
        nx = maxX;
        velRef.current.x = -Math.abs(velRef.current.x) * bounceDecay;
      }
      if (ny < minY) {
        ny = minY;
        velRef.current.y = Math.abs(velRef.current.y) * bounceDecay;
      } else if (ny > maxY) {
        ny = maxY;
        velRef.current.y = -Math.abs(velRef.current.y) * bounceDecay;
      }

      posRef.current.x = nx;
      posRef.current.y = ny;

      // Rotate based on velocity
      rotRef.current += vx * 0.3;

      if (el) {
        el.style.transform = `translate(${nx - halfSize}px, ${ny - halfSize}px) rotate(${rotRef.current}deg)`;
      }

      // Stop loop if velocity is negligible
      const speed = Math.abs(vx) + Math.abs(vy);
      if (speed < 0.1) {
        activeRef.current = false;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    // Set initial position
    const halfSize = size / 2;
    el.style.transform = `translate(${initialX - halfSize}px, ${initialY - halfSize}px) rotate(0deg)`;

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initialX, initialY, size, pushRadius, pushForce, friction, bounceDecay]);

  return (
    <div
      ref={elRef}
      className={`absolute top-0 left-0 will-change-transform ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
