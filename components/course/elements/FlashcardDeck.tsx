"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import type { FlashcardElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function FlashcardDeck({
  elements,
}: {
  elements: FlashcardElement[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { isEditMode } = useEditMode();

  const card = elements[currentIndex];
  const total = elements.length;

  function handleFlip() {
    if (isEditMode) return;
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

  const frontContent = (
    <div className="text-base sm:text-lg font-medium text-[var(--course-text)]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.front}</ReactMarkdown>
    </div>
  );

  const backContent = (
    <div className="text-sm sm:text-base text-[var(--course-text)] leading-relaxed text-left prose prose-sm max-w-none [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_strong]:text-[var(--course-text)]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.back}</ReactMarkdown>
    </div>
  );

  // Edit mode: show both sides stacked (no flip animation)
  if (isEditMode) {
    return (
      <div className="space-y-4">
        <div className="p-6 border-4" style={{
          backgroundColor: "var(--course-surface)",
          borderColor: "var(--course-border)",
        }}>
          <p className="text-xs text-[var(--course-text-muted)] mb-3 uppercase tracking-wider">
            Flashcard {currentIndex + 1}/{total} — Vorderseite
          </p>
          <EditableText elementId={card.id} content={card.front} fieldPath="front">
            {frontContent}
          </EditableText>
        </div>

        <div className="p-6 border-4" style={{
          backgroundColor: "color-mix(in srgb, var(--course-primary) 15%, var(--course-surface))",
          borderColor: "var(--course-border)",
        }}>
          <p className="text-xs text-[var(--course-text-muted)] mb-3 uppercase tracking-wider">
            Rückseite
          </p>
          <EditableText elementId={card.id} content={card.back} fieldPath="back">
            {backContent}
          </EditableText>
        </div>

        {/* Navigation */}
        {total > 1 && (
          <div className="flex items-center justify-between">
            <button onClick={handlePrev} disabled={currentIndex === 0}
              className="px-4 py-2.5 text-sm font-bold uppercase tracking-wide border-2 border-[var(--course-border-muted)] text-[var(--course-text-muted)] hover:text-[var(--course-text)] hover:border-[var(--course-border)] disabled:opacity-30 transition-all duration-100"
              style={{ borderColor: "var(--course-border-muted)" }}>
              ← Zurück
            </button>
            <span className="text-sm text-[var(--course-text-muted)]">{currentIndex + 1} von {total}</span>
            <button onClick={handleNext} disabled={currentIndex === total - 1}
              className="px-4 py-2.5 text-sm font-bold uppercase tracking-wide border-2 border-[var(--course-border-muted)] text-[var(--course-text-muted)] hover:text-[var(--course-text)] hover:border-[var(--course-border)] disabled:opacity-30 transition-all duration-100"
              style={{ borderColor: "var(--course-border-muted)" }}>
              Weiter →
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Card */}
      <div
        className="relative cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label={flipped ? "Karte zurückdrehen" : "Karte umdrehen"}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          } else if (e.key === "ArrowRight") {
            handleNext();
          } else if (e.key === "ArrowLeft") {
            handlePrev();
          }
        }}
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
            className="absolute inset-0 p-6 flex items-center justify-center text-center border-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: "var(--course-surface)",
              borderColor: "var(--course-border)",
            }}
          >
            <div>
              <p className="text-xs text-[var(--course-text-muted)] mb-3 uppercase tracking-wider">
                Frage
              </p>
              {frontContent}
              <p className="text-xs text-[var(--course-text-muted)] mt-4">
                Klick zum Umdrehen
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 p-6 flex items-center justify-center text-center border-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: "color-mix(in srgb, var(--course-primary) 15%, var(--course-surface))",
              borderColor: "var(--course-border)",
            }}
          >
            <div>
              <p className="text-xs text-[var(--course-text-muted)] mb-3 uppercase tracking-wider">
                Antwort
              </p>
              {backContent}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={handlePrev} disabled={currentIndex === 0}
          className="px-4 py-2.5 text-sm font-bold uppercase tracking-wide border-2 border-[var(--course-border-muted)] text-[var(--course-text-muted)] hover:text-[var(--course-text)] hover:border-[var(--course-border)] disabled:opacity-30 transition-all duration-100"
>
          ← Zurück
        </button>
        <span className="text-sm text-[var(--course-text-muted)]">{currentIndex + 1} von {total}</span>
        <button onClick={handleNext} disabled={currentIndex === total - 1}
          className="px-4 py-2.5 text-sm font-bold uppercase tracking-wide border-2 border-[var(--course-border-muted)] text-[var(--course-text-muted)] hover:text-[var(--course-text)] hover:border-[var(--course-border)] disabled:opacity-30 transition-all duration-100"
>
          Weiter →
        </button>
      </div>
    </div>
  );
}
