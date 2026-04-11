"use client";

import { useEffect, useRef } from "react";

export default function CourseProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        if (barRef.current) {
          barRef.current.style.width = `${percent}%`;
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <div
        ref={barRef}
        className="h-full bg-[var(--course-primary)] transition-[width] duration-150 ease-out"
        style={{ width: "0%" }}
      />
    </div>
  );
}
