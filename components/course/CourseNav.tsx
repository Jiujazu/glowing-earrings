"use client";

import { useState, useEffect, useCallback } from "react";
import type { Module } from "@/lib/types";

interface CourseNavProps {
  modules: Module[];
}

export default function CourseNav({ modules }: CourseNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const updateActive = useCallback(() => {
    const offset = 120;
    let current: string | null = null;

    for (const mod of modules) {
      const el = document.getElementById(`module-${mod.id}`);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = mod.id;
      }
    }
    setActiveId(current);
  }, [modules]);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  function scrollTo(id: string) {
    const el = document.getElementById(`module-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  }

  return (
    <nav className="sticky top-16 z-50 px-4 py-3 bg-[var(--course-background)]/90 backdrop-blur-sm border-b border-[var(--course-text)]/5">
      <div className="max-w-3xl mx-auto">
        {/* Mobile: compact toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden flex items-center gap-2 text-xs font-heading font-semibold text-[var(--course-text-muted)] w-full"
        >
          <span className="opacity-60">Module</span>
          <span className="text-[var(--course-text)]">
            {activeId
              ? modules.find((m) => m.id === activeId)?.title
              : modules[0]?.title}
          </span>
          <svg
            className={`w-3 h-3 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Desktop: always visible / Mobile: collapsible */}
        <ol
          className={`${
            isOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-0 mt-2 sm:mt-0 sm:bg-transparent bg-[var(--course-background)] rounded-lg p-2 sm:p-0`}
        >
          {modules.map((mod, i) => {
            const isActive = mod.id === activeId;
            return (
              <li key={mod.id} className="flex items-center">
                {i > 0 && (
                  <span className="hidden sm:block text-[var(--course-text-muted)] opacity-30 mx-2 text-xs">
                    /
                  </span>
                )}
                <button
                  onClick={() => scrollTo(mod.id)}
                  className="text-xs font-heading transition-colors duration-200 py-1 px-1.5 rounded text-left"
                  style={{
                    color: isActive
                      ? "var(--course-primary)"
                      : "var(--course-text-muted)",
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {mod.title}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
