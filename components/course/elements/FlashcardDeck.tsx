"use client";

import { useState } from "react";
import type { FlashcardElement } from "@/lib/types";

export default function FlashcardDeck({
  elements,
}: {
  elements: FlashcardElement[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = elements[currentIndex];
  const total = elements.length;

  function handleFlip() {
    setFlipped((prev) => !prev);
  }

  function handleNext() {
    if (currentIndex < total - 1) {
      setFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <div className="space-y-4">
      {/* Card */}
      <div
        className="relative cursor-pointer select-none"
        onClick={handleFlip}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full min-h-[200px] transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-[var(--course-surface)] border-2 border-[var(--course-primary)]/20 rounded-xl p-6 flex items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div>
              <p className="text-xs text-[var(--course-text-muted)] mb-3 uppercase tracking-wider">
                Frage
              </p>
              <p className="text-lg font-medium text-[var(--course-text)]">
                {card.front}
              </p>
              <p className="text-xs text-[var(--course-text-muted)] mt-4">
                Klick zum Umdrehen
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-[var(--course-primary)]/5 border-2 border-[var(--course-primary)]/30 rounded-xl p-6 flex items-center justify-center text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <p className="text-xs text-[var(--course-text-muted)] mb-3 uppercase tracking-wider">
                Antwort
              </p>
              <p className="text-lg font-medium text-[var(--course-text)]">
                {card.back}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-3 py-1.5 text-sm rounded-lg border border-[var(--course-text)]/15 text-[var(--course-text-muted)] hover:text-[var(--course-text)] disabled:opacity-30 transition-all"
        >
          ← Zurück
        </button>
        <span className="text-sm text-[var(--course-text-muted)]">
          {currentIndex + 1} von {total}
        </span>
        <button
          onClick={handleNext}
          disabled={currentIndex === total - 1}
          className="px-3 py-1.5 text-sm rounded-lg border border-[var(--course-text)]/15 text-[var(--course-text-muted)] hover:text-[var(--course-text)] disabled:opacity-30 transition-all"
        >
          Weiter →
        </button>
      </div>
    </div>
  );
}
