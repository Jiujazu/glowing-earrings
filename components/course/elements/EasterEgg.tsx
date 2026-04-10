"use client";

import { useState, useEffect, useCallback } from "react";
import type { EasterEggElement } from "@/lib/types";

export default function EasterEgg({ element }: { element: EasterEggElement }) {
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => setRevealed(true), []);

  // Konami code handler
  useEffect(() => {
    if (element.trigger !== "konami") return;

    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "KeyB", "KeyA",
    ];
    let position = 0;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === konamiCode[position]) {
        position++;
        if (position === konamiCode.length) {
          reveal();
          position = 0;
        }
      } else {
        position = 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [element.trigger, reveal]);

  // Idle handler
  useEffect(() => {
    if (element.trigger !== "idle") return;

    let timer: NodeJS.Timeout;

    function resetTimer() {
      clearTimeout(timer);
      timer = setTimeout(reveal, 30000); // 30 seconds idle
    }

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [element.trigger, reveal]);

  if (element.trigger === "click") {
    return (
      <span
        className="cursor-pointer"
        onClick={reveal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && reveal()}
      >
        {revealed ? (
          <span className="animate-fade-in">{element.content}</span>
        ) : (
          <span className="opacity-50 hover:opacity-100 transition-opacity">
            ✦
          </span>
        )}
      </span>
    );
  }

  if (element.trigger === "hover") {
    return (
      <span
        className="group relative inline-block"
        onMouseEnter={reveal}
      >
        <span className="opacity-50 group-hover:opacity-100 transition-opacity">
          ✦
        </span>
        {revealed && (
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 text-sm bg-[var(--course-text)] text-[var(--course-bg)] rounded-lg whitespace-nowrap animate-fade-in">
            {element.content}
          </span>
        )}
      </span>
    );
  }

  // For scroll, konami, idle — show when revealed
  if (revealed) {
    return (
      <div className="text-center py-4 animate-fade-in">
        <p className="text-sm text-[var(--course-text-muted)]">
          {element.content}
        </p>
      </div>
    );
  }

  return null;
}
