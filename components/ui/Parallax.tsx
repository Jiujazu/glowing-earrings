"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  mobileSpeed?: number;
  className?: string;
}

export default function Parallax({ children, speed = 0.05, mobileSpeed, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let activeSpeed = window.innerWidth < 768 && mobileSpeed !== undefined ? mobileSpeed : speed;

    let ticking = false;
    function update() {
      el!.style.transform = `translateY(${window.scrollY * activeSpeed}px)`;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }
    function onResize() {
      activeSpeed = window.innerWidth < 768 && mobileSpeed !== undefined ? mobileSpeed : speed;
      update();
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [speed, mobileSpeed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
