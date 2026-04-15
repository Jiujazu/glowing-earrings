"use client";

import { useRef, useCallback } from "react";
import { Star } from "lucide-react";

interface StarShapeProps {
  className?: string;
}

export default function StarShape({ className = "" }: StarShapeProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    const outer = outerRef.current;
    const spin = spinRef.current;
    if (!outer || cooldownRef.current) return;

    // Dispatch grid wave
    const rect = outer.getBoundingClientRect();
    const section = outer.closest("section");
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

    // Big bouncy scale + fill pearl interior
    outer.style.transition = "transform 0.5s cubic-bezier(0.34, 2.2, 0.64, 1)";
    outer.style.transform = "scale(1.8)";

    // Fill star interior with turquoise (keep stroke as-is)
    const paths = outer.querySelectorAll("svg polygon, svg path");
    paths.forEach(p => (p as SVGElement).setAttribute("fill", "var(--pop-turquoise, #00C9A7)"));

    // Spin
    if (spin) {
      spin.style.transition = "rotate 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      spin.style.rotate = "360deg";
    }

    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const outer = outerRef.current;
    const spin = spinRef.current;
    if (!outer) return;
    outer.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    outer.style.transform = "";

    // Reset star fill
    const paths = outer.querySelectorAll("svg polygon, svg path");
    paths.forEach(p => (p as SVGElement).setAttribute("fill", "none"));

    if (spin) {
      spin.style.transition = "rotate 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      spin.style.rotate = "0deg";
    }
  }, []);

  return (
    <div
      ref={outerRef}
      className={`cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={spinRef}>
        <Star className="w-8 h-8" strokeWidth={3} />
      </div>
    </div>
  );
}
