"use client";

import { useRef, useCallback } from "react";
import { Star } from "lucide-react";

interface StarShapeProps {
  className?: string;
}

export default function StarShape({ className = "" }: StarShapeProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    const el = elRef.current;
    if (!el || cooldownRef.current) return;

    // Dispatch grid wave
    const rect = el.getBoundingClientRect();
    const section = el.closest("section");
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      document.dispatchEvent(new CustomEvent("grid-wave", {
        detail: {
          x: rect.left + rect.width / 2 - sectionRect.left,
          y: rect.top + rect.height / 2 - sectionRect.top,
          intensity: 1.5,
        },
      }));
    }

    // Color fill + bouncy scale
    el.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease-out";
    el.style.transform = "scale(1.4)";
    el.style.color = "var(--pop-turquoise, #00C9A7)";

    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease-out";
    el.style.transform = "";
    el.style.color = "";
  }, []);

  return (
    <div
      ref={elRef}
      className={`cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Star className="w-8 h-8" strokeWidth={3} fill="currentColor" />
    </div>
  );
}
