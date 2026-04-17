"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

interface HeroImageSpotlightProps {
  children: ReactNode;
  /** Image path — needed for the edge-detect overlay layer. */
  imageSrc: string;
  className?: string;
}

export default function HeroImageSpotlight({
  children,
  imageSrc,
  className = "",
}: HeroImageSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const rawId = useId();
  const filterId = `neon-edges-${rawId.replace(/:/g, "_")}`;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function flush() {
      rafRef.current = 0;
      const p = pendingRef.current;
      if (!p || !el) return;
      el.style.setProperty("--mx", `${p.x}%`);
      el.style.setProperty("--my", `${p.y}%`);
    }

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      pendingRef.current = { x, y };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(flush);
    }

    function onEnter() {
      el!.style.setProperty("--spotlight-opacity", "1");
    }

    function onLeave() {
      el!.style.setProperty("--spotlight-opacity", "0");
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`hero-spotlight relative ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--spotlight-opacity": "0",
        } as React.CSSProperties
      }
    >
      {children}

      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feColorMatrix
              type="matrix"
              values="0.3 0.59 0.11 0 0
                      0.3 0.59 0.11 0 0
                      0.3 0.59 0.11 0 0
                      0   0    0    1 0"
              result="gray"
            />
            <feConvolveMatrix
              in="gray"
              order="3"
              preserveAlpha="true"
              kernelMatrix="-1 -1 -1
                            -1  8 -1
                            -1 -1 -1"
              result="edges"
            />
            <feColorMatrix
              in="edges"
              type="matrix"
              values="0 0 0 0 0.75
                      0 0 0 0 0.97
                      0 0 0 0 1.0
                      2.5 2.5 2.5 0 -0.15"
              result="neon"
            />
            <feGaussianBlur in="neon" stdDeviation="6" result="halo" />
            <feGaussianBlur in="neon" stdDeviation="1.2" result="core" />
            <feMerge>
              <feMergeNode in="halo" />
              <feMergeNode in="halo" />
              <feMergeNode in="core" />
              <feMergeNode in="neon" />
            </feMerge>
          </filter>
        </defs>
      </svg>

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
          src={imageSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block w-full h-full"
          style={{
            filter: `url(#${filterId})`,
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
