"use client";

import { useState, useEffect, useRef } from "react";
import type { Module } from "@/lib/types";

interface ChapterBannerProps {
  modules: Module[];
  currentIndex: number;
}

export default function ChapterBanner({
  modules,
  currentIndex,
}: ChapterBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen]);

  function scrollTo(id: string) {
    const el = document.getElementById(`module-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  }

  const currentModule = modules[currentIndex];

  return (
    <div
      ref={ref}
      className="sticky top-16 z-[55] py-5 sm:py-6 px-4 backdrop-blur-lg border-b border-[var(--course-text)]/10"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--course-primary) 10%, var(--course-bg) 97%)",
      }}
    >
      <div className="max-w-3xl mx-auto relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Kapitel-Navigation"
          className="flex items-center gap-4 w-full text-left group"
        >
          <span
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-heading font-bold text-sm sm:text-base text-white flex-shrink-0"
            style={{ backgroundColor: "var(--course-primary)" }}
          >
            {currentIndex + 1}
          </span>
          <h2
            className="font-heading text-lg sm:text-xl font-bold text-[var(--course-text)] flex-1 min-w-0 truncate"
            style={{
              fontFamily: "var(--course-heading-font, var(--font-heading))",
            }}
          >
            {currentModule.title}
          </h2>
          <svg
            className={`w-5 h-5 flex-shrink-0 transition-transform text-[var(--course-text-muted)] group-hover:text-[var(--course-text)] ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <ol
            className="absolute left-0 right-0 top-full mt-1 flex flex-col gap-1 px-4 py-3 rounded-xl shadow-lg border border-[var(--course-text)]/10 z-50 animate-fade-in"
            style={{ backgroundColor: "var(--course-bg)" }}
          >
            {modules.map((mod, i) => {
              const isCurrent = i === currentIndex;
              return (
                <li key={mod.id}>
                  <button
                    onClick={() => scrollTo(mod.id)}
                    className={`flex items-center gap-3 w-full py-2.5 px-2 rounded-lg text-left transition-colors ${
                      isCurrent
                        ? ""
                        : "hover:bg-[var(--course-primary)]/5"
                    }`}
                    style={
                      isCurrent
                        ? {
                            backgroundColor:
                              "color-mix(in srgb, var(--course-primary) 12%, transparent)",
                          }
                        : undefined
                    }
                  >
                    <span
                      className={`text-xs font-bold font-heading rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                        isCurrent
                          ? "text-white"
                          : "text-[var(--course-text-muted)] border border-[var(--course-text)]/20"
                      }`}
                      style={
                        isCurrent
                          ? { backgroundColor: "var(--course-primary)" }
                          : undefined
                      }
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-sm font-heading ${
                        isCurrent
                          ? "font-semibold text-[var(--course-text)]"
                          : "text-[var(--course-text-muted)]"
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
      </div>
    </div>
  );
}
