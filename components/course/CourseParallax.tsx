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
    <div className="parallax-bg" aria-hidden="true">
      <div ref={containerRef}>
        <div
          className="absolute rounded-full blur-[100px] opacity-20"
          style={{
            width: 400,
            height: 400,
            top: "10%",
            left: "-10%",
            background: "var(--course-primary)",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px] opacity-15"
          style={{
            width: 300,
            height: 300,
            top: "40%",
            right: "-5%",
            background: "var(--course-accent)",
          }}
        />
        <div
          className="absolute rounded-full blur-[80px] opacity-10"
          style={{
            width: 250,
            height: 250,
            top: "70%",
            left: "20%",
            background: "var(--course-primary)",
          }}
        />
      </div>
    </div>
  );
}
