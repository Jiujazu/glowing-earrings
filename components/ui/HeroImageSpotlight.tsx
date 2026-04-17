"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface HeroImageSpotlightProps {
  children: ReactNode;
  className?: string;
}

// Fine paper grain, ~1.3 KB base64. Tiles seamlessly via SVG fractalNoise.
const PAPER_GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0.6 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

export default function HeroImageSpotlight({ children, className = "" }: HeroImageSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

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
          "--paper-grain": `url("${PAPER_GRAIN_SVG}")`,
        } as React.CSSProperties
      }
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--spotlight-opacity)",
          background:
            "radial-gradient(circle 220px at var(--mx) var(--my), rgba(255,255,255,0.55), rgba(255,255,255,0.15) 35%, transparent 65%)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: "calc(var(--spotlight-opacity) * 0.7)",
          backgroundImage: "var(--paper-grain)",
          backgroundSize: "220px 220px",
          WebkitMaskImage:
            "radial-gradient(circle 260px at var(--mx) var(--my), rgba(0,0,0,1), rgba(0,0,0,0.3) 50%, transparent 75%)",
          maskImage:
            "radial-gradient(circle 260px at var(--mx) var(--my), rgba(0,0,0,1), rgba(0,0,0,0.3) 50%, transparent 75%)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
