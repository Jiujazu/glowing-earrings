"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0;
    let visible = false;

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      cursor!.style.left = `${x}px`;
      cursor!.style.top = `${y}px`;

      if (!visible) {
        visible = true;
        cursor!.classList.add("cursor-visible");
      }
    }

    function onLeave() {
      visible = false;
      cursor!.classList.remove("cursor-visible");
    }

    function updateHover(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
      cursor!.classList.toggle("cursor-hover", !!isInteractive);
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", updateHover, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", updateHover);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
