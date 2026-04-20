"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface HeroImageSpotlightProps {
  children: ReactNode;
  /** Pre-rendered neon-edge overlay (transparent WebP/PNG). */
  neonSrc: string;
  className?: string;
}

type XRayState =
  | { phase: "idle" }
  | { phase: "charging" }
  | { phase: "releasing"; x: number; y: number };

export default function HeroImageSpotlight({
  children,
  neonSrc,
  className = "",
}: HeroImageSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const [xray, setXray] = useState<XRayState>({ phase: "idle" });
  const xrayActiveRef = useRef(false);
  const xrayReleaseTimerRef = useRef<number | null>(null);
  const lastPointerRef = useRef({ x: 50, y: 50 });
  const longPressTimerRef = useRef<number | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const xrayFromTouchRef = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function flush() {
      rafRef.current = 0;
      const p = pendingRef.current;
      if (!p || !el) return;
      el.style.setProperty("--mx", `${p.x}%`);
      el.style.setProperty("--my", `${p.y}%`);
    }

    function updatePointer(clientX: number, clientY: number) {
      const rect = el!.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      pendingRef.current = { x, y };
      lastPointerRef.current = { x, y };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(flush);
    }

    function onMove(e: MouseEvent) {
      updatePointer(e.clientX, e.clientY);
    }

    function onEnter() {
      el!.style.setProperty("--spotlight-opacity", "1");
    }

    function onLeave() {
      el!.style.setProperty("--spotlight-opacity", "0");
    }

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      el!.style.setProperty("--spotlight-opacity", "1");
      updatePointer(t.clientX, t.clientY);

      // Long-press → Xray-Charge (~400ms; bricht ab, sobald der Finger > 10px wandert = Scroll)
      touchStartPosRef.current = { x: t.clientX, y: t.clientY };
      if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = window.setTimeout(() => {
        longPressTimerRef.current = null;
        if (xrayReleaseTimerRef.current) {
          window.clearTimeout(xrayReleaseTimerRef.current);
          xrayReleaseTimerRef.current = null;
        }
        xrayFromTouchRef.current = true;
        xrayActiveRef.current = true;
        setXray({ phase: "charging" });
      }, 400);
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      updatePointer(t.clientX, t.clientY);

      const start = touchStartPosRef.current;
      if (start && longPressTimerRef.current) {
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (dx * dx + dy * dy > 100) {
          window.clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
      }
    }

    function onTouchEnd() {
      el!.style.setProperty("--spotlight-opacity", "0");
      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      touchStartPosRef.current = null;
      if (xrayFromTouchRef.current) {
        xrayFromTouchRef.current = false;
        const { x, y } = lastPointerRef.current;
        endXray(x, y);
      }
    }

    if (isFinePointer) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    } else {
      // Passive-Listener → Scroll bleibt frei, Spotlight folgt dem Finger
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchmove", onTouchMove, { passive: true });
      el.addEventListener("touchend", onTouchEnd);
      el.addEventListener("touchcancel", onTouchEnd);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (isFinePointer) {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      } else {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("touchcancel", onTouchEnd);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (xrayReleaseTimerRef.current) {
        window.clearTimeout(xrayReleaseTimerRef.current);
      }
    };
  }, []);

  function isFinePointer() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function getLocalCoords(e: React.MouseEvent) {
    const rect = wrapperRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    if (!isFinePointer()) return;
    if (xrayReleaseTimerRef.current) {
      window.clearTimeout(xrayReleaseTimerRef.current);
      xrayReleaseTimerRef.current = null;
    }
    xrayActiveRef.current = true;
    setXray({ phase: "charging" });
  }

  function endXray(x: number, y: number) {
    if (!xrayActiveRef.current) return;
    xrayActiveRef.current = false;
    setXray({ phase: "releasing", x, y });
    xrayReleaseTimerRef.current = window.setTimeout(() => {
      setXray({ phase: "idle" });
      xrayReleaseTimerRef.current = null;
    }, 650);
  }

  function handleMouseUp(e: React.MouseEvent) {
    if (e.button !== 0) return;
    const { x, y } = getLocalCoords(e);
    endXray(x, y);
  }

  function handleMouseLeave() {
    if (xrayActiveRef.current) {
      const { x, y } = lastPointerRef.current;
      endXray(x, y);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`hero-spotlight relative ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--spotlight-opacity": "0",
          // Verhindert iOS-„Bild speichern"-Callout und Android-Drag-to-Save
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        } as React.CSSProperties
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--spotlight-opacity)",
          WebkitMaskImage:
            "radial-gradient(circle 200px at var(--mx) var(--my), rgba(0,0,0,1), rgba(0,0,0,0.6) 45%, transparent 78%)",
          maskImage:
            "radial-gradient(circle 200px at var(--mx) var(--my), rgba(0,0,0,1), rgba(0,0,0,0.6) 45%, transparent 78%)",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={neonSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block w-full h-full"
          style={{ objectFit: "cover" }}
        />
      </div>

      {xray.phase !== "idle" && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            xray.phase === "charging" ? "hero-xray-charging" : "hero-xray-releasing"
          }`}
          style={
            {
              "--xray-ox": xray.phase === "releasing" ? `${xray.x}%` : "50%",
              "--xray-oy": xray.phase === "releasing" ? `${xray.y}%` : "50%",
              mixBlendMode: "screen",
            } as React.CSSProperties
          }
        >
          <img
            src={neonSrc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}
