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

    const mobileMq = window.matchMedia("(max-width: 767px)");
    let activeSpeed = mobileMq.matches && mobileSpeed !== undefined ? mobileSpeed : speed;

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
    function onMediaChange() {
      activeSpeed = mobileMq.matches && mobileSpeed !== undefined ? mobileSpeed : speed;
      update();
    }

    update(); // set initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    mobileMq.addEventListener("change", onMediaChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mobileMq.removeEventListener("change", onMediaChange);
    };
  }, [speed, mobileSpeed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
