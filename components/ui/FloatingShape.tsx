"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface FloatingShapeProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Initial X position as fraction of container width (0-1) */
  startX: number;
  /** Initial Y position as fraction of container height (0-1) */
  startY: number;
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
  startX,
  startY,
  size,
  pushRadius = 130,
  pushForce = 5,
  friction = 0.97,
  bounceDecay = 0.6,
}: FloatingShapeProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    x: 0, y: 0,
    vx: 0, vy: 0,
    rot: 0,
    initialized: false,
  });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const half = size / 2;

    function clamp(val: number, min: number, max: number) {
      return Math.max(min, Math.min(max, val));
    }

    function initPosition() {
      const rect = parent!.getBoundingClientRect();
      const s = stateRef.current;
      s.x = clamp(startX * rect.width, half + 4, rect.width - half - 4);
      s.y = clamp(startY * rect.height, half + 4, rect.height - half - 4);
      s.initialized = true;
      applyTransform();
    }

    function applyTransform() {
      const s = stateRef.current;
      el!.style.transform = `translate(${s.x - half}px, ${s.y - half}px) rotate(${s.rot}deg)`;
    }

    function tick() {
      if (!runningRef.current) return;

      const s = stateRef.current;
      const rect = parent!.getBoundingClientRect();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Apply cursor push force
      const dx = s.x - mx;
      const dy = s.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < pushRadius && dist > 1) {
        const factor = 1 - dist / pushRadius;
        const force = factor * factor * pushForce;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
      }

      // Apply friction
      s.vx *= friction;
      s.vy *= friction;

      // Cap max velocity
      const maxVel = 15;
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      if (speed > maxVel) {
        s.vx = (s.vx / speed) * maxVel;
        s.vy = (s.vy / speed) * maxVel;
      }

      // Move
      s.x += s.vx;
      s.y += s.vy;

      // Bounce off edges
      const minX = half + 2;
      const maxX = rect.width - half - 2;
      const minY = half + 2;
      const maxY = rect.height - half - 2;

      if (s.x < minX) { s.x = minX; s.vx = Math.abs(s.vx) * bounceDecay; }
      if (s.x > maxX) { s.x = maxX; s.vx = -Math.abs(s.vx) * bounceDecay; }
      if (s.y < minY) { s.y = minY; s.vy = Math.abs(s.vy) * bounceDecay; }
      if (s.y > maxY) { s.y = maxY; s.vy = -Math.abs(s.vy) * bounceDecay; }

      // Rotate gently based on velocity
      s.rot += s.vx * 0.15;

      applyTransform();

      // Stop if barely moving and no cursor nearby
      if (speed < 0.08 && dist > pushRadius) {
        s.vx = 0;
        s.vy = 0;
        runningRef.current = false;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (runningRef.current) return;
      runningRef.current = true;
      tick();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (!stateRef.current.initialized) return;

      // Check if mouse is close enough to start physics
      const s = stateRef.current;
      const dx = s.x - mouseRef.current.x;
      const dy = s.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < pushRadius * 1.2) {
        startLoop();
      }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    // Initialize
    initPosition();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Reposition on resize
    const resizeObserver = new ResizeObserver(() => {
      if (!stateRef.current.initialized) return;
      const rect = parent!.getBoundingClientRect();
      const s = stateRef.current;
      s.x = clamp(s.x, half + 4, rect.width - half - 4);
      s.y = clamp(s.y, half + 4, rect.height - half - 4);
      applyTransform();
    });
    resizeObserver.observe(parent);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
    };
  }, [startX, startY, size, pushRadius, pushForce, friction, bounceDecay]);

  return (
    <div
      ref={elRef}
      className={`absolute top-0 left-0 will-change-transform pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      {children}
    </div>
  );
}
