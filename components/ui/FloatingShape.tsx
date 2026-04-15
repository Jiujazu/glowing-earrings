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

/** Height of the sticky navigation bar */
const NAV_HEIGHT = 64;

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

    /**
     * Get the valid movement bounds in the parent's coordinate space.
     * Top boundary respects the nav bar, sides respect the viewport,
     * bottom respects the parent's height.
     */
    function getBounds() {
      const parentRect = parent!.getBoundingClientRect();

      // How much of the parent is hidden behind the nav?
      const navOverlap = Math.max(0, NAV_HEIGHT - parentRect.top);

      // Left/right: constrain to viewport edges relative to parent
      const leftInParent = Math.max(0, -parentRect.left);
      const rightInParent = Math.min(parentRect.width, window.innerWidth - parentRect.left);

      return {
        minX: leftInParent + half + 2,
        maxX: rightInParent - half - 2,
        minY: navOverlap + half + 2,
        maxY: parentRect.height - half - 2,
      };
    }

    function initPosition() {
      const parentRect = parent!.getBoundingClientRect();
      const bounds = getBounds();
      const s = stateRef.current;
      s.x = clamp(startX * parentRect.width, bounds.minX, bounds.maxX);
      s.y = clamp(startY * parentRect.height, bounds.minY, bounds.maxY);
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

      // Bounce off bounds (viewport-aware)
      const bounds = getBounds();

      if (s.x < bounds.minX) { s.x = bounds.minX; s.vx = Math.abs(s.vx) * bounceDecay; }
      if (s.x > bounds.maxX) { s.x = bounds.maxX; s.vx = -Math.abs(s.vx) * bounceDecay; }
      if (s.y < bounds.minY) { s.y = bounds.minY; s.vy = Math.abs(s.vy) * bounceDecay; }
      if (s.y > bounds.maxY) { s.y = bounds.maxY; s.vy = -Math.abs(s.vy) * bounceDecay; }

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
      const parentRect = parent!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - parentRect.left,
        y: e.clientY - parentRect.top,
      };

      if (!stateRef.current.initialized) return;

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

    // On resize: clamp shapes into new bounds
    const resizeObserver = new ResizeObserver(() => {
      if (!stateRef.current.initialized) return;
      const bounds = getBounds();
      const s = stateRef.current;
      s.x = clamp(s.x, bounds.minX, bounds.maxX);
      s.y = clamp(s.y, bounds.minY, bounds.maxY);
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
