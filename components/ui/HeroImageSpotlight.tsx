"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

interface HeroImageSpotlightProps {
  children: ReactNode;
  /** Image path — needed for the edge-detect overlay layer. */
  imageSrc: string;
  className?: string;
}

interface Wave {
  id: number;
  x: number;
  y: number;
  maxRadius: number;
  duration: number;
}

type XRayState =
  | { phase: "idle" }
  | { phase: "charging" }
  | { phase: "releasing"; x: number; y: number };

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

  const [waves, setWaves] = useState<Wave[]>([]);
  const nextWaveIdRef = useRef(0);
  const [xray, setXray] = useState<XRayState>({ phase: "idle" });
  const xrayActiveRef = useRef(false);
  const xrayReleaseTimerRef = useRef<number | null>(null);
  const lastPointerRef = useRef({ x: 50, y: 50 });

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
      lastPointerRef.current = { x, y };
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

  useEffect(() => {
    return () => {
      if (xrayReleaseTimerRef.current) {
        window.clearTimeout(xrayReleaseTimerRef.current);
      }
    };
  }, []);

  function prefersReducedMotion() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function getLocalCoords(e: React.MouseEvent) {
    const rect = wrapperRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  }

  function spawnWave(x: number, y: number, maxRadius: number, duration: number) {
    const id = nextWaveIdRef.current++;
    setWaves((prev) => [...prev, { id, x, y, maxRadius, duration }]);
    window.setTimeout(() => {
      setWaves((prev) => prev.filter((w) => w.id !== id));
    }, duration + 50);
  }

  function handleClick(e: React.MouseEvent) {
    if (prefersReducedMotion()) return;
    const { x, y } = getLocalCoords(e);
    spawnWave(x, y, 340, 700);
  }

  function handleDoubleClick(e: React.MouseEvent) {
    if (prefersReducedMotion()) return;
    const { x, y } = getLocalCoords(e);
    spawnWave(x, y, 480, 900);
    window.setTimeout(() => spawnWave(x, y, 520, 950), 100);
    window.setTimeout(() => spawnWave(x, y, 460, 900), 200);
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 2) return;
    if (prefersReducedMotion()) return;
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
    if (e.button !== 2) return;
    const { x, y } = getLocalCoords(e);
    endXray(x, y);
  }

  function handleMouseLeave() {
    if (xrayActiveRef.current) {
      const { x, y } = lastPointerRef.current;
      endXray(x, y);
    }
  }

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
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
        } as React.CSSProperties
      }
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
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

      {waves.map((w) => (
        <div
          key={w.id}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hero-shockwave"
          style={
            {
              "--ring-ox": `${w.x}%`,
              "--ring-oy": `${w.y}%`,
              "--ring-max": `${w.maxRadius}px`,
              animationDuration: `${w.duration}ms`,
              mixBlendMode: "screen",
            } as React.CSSProperties
          }
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
      ))}

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
      )}
    </div>
  );
}
