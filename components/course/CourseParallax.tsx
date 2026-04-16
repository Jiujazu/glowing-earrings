"use client";

import { useEffect, useRef } from "react";

export default function CourseParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY * 0.3;
        el!.style.transform = `translateY(${y}px)`;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="parallax-bg overflow-hidden" aria-hidden="true">
      <div ref={containerRef}>
        {/* Geometric shapes instead of blurry circles */}
        <div
          className="absolute opacity-[0.04] border-4 border-[var(--course-primary)]"
          style={{
            width: 300,
            height: 300,
            top: "8%",
            left: "-8%",
            transform: "rotate(12deg)",
          }}
        />
        <div
          className="absolute opacity-[0.04] border-4 border-[var(--course-accent)]"
          style={{
            width: 200,
            height: 200,
            top: "45%",
            right: "-3%",
            transform: "rotate(-8deg)",
          }}
        />
        <div
          className="absolute opacity-[0.03] border-4 border-[var(--course-primary)]"
          style={{
            width: 250,
            height: 250,
            top: "75%",
            left: "15%",
            transform: "rotate(6deg)",
          }}
        />
      </div>
    </div>
  );
}
