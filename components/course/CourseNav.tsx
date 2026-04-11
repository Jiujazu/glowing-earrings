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
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  }

  const activeModule = activeId
    ? modules.find((m) => m.id === activeId)
    : modules[0];

  const activeIndex = activeModule
    ? modules.indexOf(activeModule) + 1
    : 1;

  return (
    <nav className="sticky top-16 z-50 px-4 py-2 bg-[var(--background)]/90 backdrop-blur-lg border-b border-[var(--border)]/50">
      <div className="max-w-3xl mx-auto relative">
        {/* Mobile: toggle bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden flex items-center gap-3 w-full py-1"
        >
          <span className="text-xs font-bold font-heading rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 bg-[var(--accent)] text-white">
            {activeIndex}
          </span>
          <span className="text-sm font-heading font-semibold truncate text-left text-[var(--text-primary)]">
            {activeModule?.title}
          </span>
          <svg
            className={`w-4 h-4 ml-auto flex-shrink-0 transition-transform text-[var(--text-secondary)] ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Mobile: dropdown list */}
        {isOpen && (
          <ol className="sm:hidden absolute left-0 right-0 top-full flex flex-col gap-1 px-4 py-3 rounded-b-xl shadow-lg bg-[var(--background)] border border-[var(--border)]/50 border-t-0">
            {modules.map((mod, i) => {
              const isActive = mod.id === activeId;
              return (
                <li key={mod.id}>
                  <button
                    onClick={() => scrollTo(mod.id)}
                    className={`flex items-center gap-3 w-full py-2.5 px-2 rounded-lg text-left transition-colors ${
                      isActive ? "bg-[var(--surface-tinted)]" : "hover:bg-[var(--surface-tinted)]"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold font-heading rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                        isActive
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--border)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-sm font-heading ${
                        isActive
                          ? "font-semibold text-[var(--accent)]"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {mod.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}

        {/* Desktop: horizontal inline */}
        <ol className="hidden sm:flex flex-row flex-wrap gap-0">
          {modules.map((mod, i) => {
            const isActive = mod.id === activeId;
            return (
              <li key={mod.id} className="flex items-center">
                {i > 0 && (
                  <span className="text-[var(--text-secondary)] opacity-30 mx-2 text-xs">
                    /
                  </span>
                )}
                <button
                  onClick={() => scrollTo(mod.id)}
                  className={`text-xs font-heading transition-colors duration-200 py-1 px-1.5 rounded text-left ${
                    isActive
                      ? "font-bold text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
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
