"use client";

import { useState, useEffect, useCallback } from "react";
import type { Module } from "@/lib/types";

interface ScrollToTopProps {
  modules?: Module[];
}

export default function ScrollToTop({ modules }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateState = useCallback(() => {
    setVisible(window.scrollY > 600);

    if (!modules || modules.length === 0) return;
    const offset = 200;
    let current = 0;
    for (let i = 0; i < modules.length; i++) {
      const el = document.getElementById(`module-${modules[i].id}`);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = i;
      }
    }
    setActiveIndex(current);
  }, [modules]);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateState();
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateState]);

  function scrollToModule(index: number) {
    if (!modules) return;
    const mod = modules[index];
    if (!mod) return;
    const el = document.getElementById(`module-${mod.id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  if (!visible) return null;

  const hasPrev = modules && activeIndex > 0;
  const hasNext = modules && activeIndex < (modules?.length ?? 0) - 1;

  const btnClass =
    "w-10 h-10 rounded-full bg-[var(--course-surface)] border border-[var(--course-text)]/15 text-[var(--course-text-muted)] hover:text-[var(--course-text)] hover:border-[var(--course-primary)]/40 shadow-lg backdrop-blur-sm transition-all duration-200 flex items-center justify-center";

  return (
    <div
      className="fixed z-[60] flex flex-col gap-2 animate-fade-in bottom-6 right-6 lg:bottom-auto lg:right-auto lg:top-32 lg:left-[calc(50%+25rem)]"
    >
      {hasPrev && (
        <button
          onClick={() => scrollToModule(activeIndex - 1)}
          className={btnClass}
          aria-label="Vorheriges Kapitel"
          title={`← ${modules![activeIndex - 1].title}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => scrollToModule(activeIndex + 1)}
          className={btnClass}
          aria-label="Nächstes Kapitel"
          title={`→ ${modules![activeIndex + 1].title}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={btnClass}
        aria-label="Nach oben scrollen"
        title="Nach oben"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </div>
  );
}
