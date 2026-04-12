"use client";

import { useState } from "react";
import type { QuizElement } from "@/lib/types";
import QuizConfetti from "./QuizConfetti";
import { useProgressTracker } from "../CourseProgressTracker";

export default function QuizCard({ element }: { element: QuizElement }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const tracker = useProgressTracker();

  function handleSelect(index: number) {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    tracker?.onQuizComplete(element.id);
  }

  const isCorrect = selected !== null && element.options[selected].correct;

  return (
    <div
      className="rounded-xl p-5 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--course-surface)" }}
    >
      {revealed && isCorrect && <QuizConfetti />}
      {/* Question */}
      <p className="font-heading font-bold text-lg text-[var(--course-text)] mb-1">
        {element.question}
      </p>
      {!revealed && (
        <p className="text-xs text-[var(--course-text-muted)] mb-4">Wähle eine Antwort</p>
      )}
      {revealed && <div className="mb-4" />}

      {/* Options */}
      <div className="space-y-2">
        {element.options.map((option, i) => {
          const isSelected = selected === i;
          const isOptionCorrect = option.correct;

          let borderColor = "color-mix(in srgb, var(--course-text) 15%, transparent)";
          let bgColor = "transparent";

          if (revealed) {
            if (isOptionCorrect) {
              borderColor = "var(--course-accent)";
              bgColor = "color-mix(in srgb, var(--course-accent) 10%, var(--course-surface))";
            } else if (isSelected && !isOptionCorrect) {
              borderColor = "#E55B5B";
              bgColor = "color-mix(in srgb, #E55B5B 10%, var(--course-surface))";
            } else {
              borderColor = "color-mix(in srgb, var(--course-text) 8%, transparent)";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${!revealed ? "cursor-pointer hover:border-[var(--course-primary)]" : ""}
                ${revealed && !isOptionCorrect && !isSelected ? "opacity-50" : ""}
                ${isSelected && isOptionCorrect ? "animate-celebrate" : ""}
                ${isSelected && !isOptionCorrect ? "animate-wiggle" : ""}
              `}
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <span className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  {!revealed && (
                    <span className="block w-5 h-5 rounded-full border-2 border-[var(--course-text-muted)]/40" />
                  )}
                  {revealed && isOptionCorrect && (
                    <span className="block w-5 h-5 rounded-full bg-[var(--course-accent)] flex items-center justify-center text-white text-xs">✓</span>
                  )}
                  {revealed && !isOptionCorrect && isSelected && (
                    <span className="block w-5 h-5 rounded-full bg-[#E55B5B] flex items-center justify-center text-white text-xs">✗</span>
                  )}
                  {revealed && !isOptionCorrect && !isSelected && (
                    <span className="block w-5 h-5 rounded-full border-2 border-[var(--course-text-muted)]/20" />
                  )}
                </span>
                <span className="text-base text-[var(--course-text)]">
                  {option.text}
                </span>
              </span>
              {revealed && isSelected && (
                <p className="mt-2 ml-8 text-sm text-[var(--course-text-muted)] animate-fade-in">
                  {option.feedback}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation after reveal */}
      {revealed && (
        <div
          className="mt-4 pt-4 animate-fade-in"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--course-text) 10%, transparent)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{isCorrect ? "🎯" : "💡"}</span>
            <span className="font-heading font-bold text-sm text-[var(--course-text)]">
              {isCorrect ? "Richtig!" : "Nicht ganz — aber gut zu wissen:"}
            </span>
          </div>
          <p className="text-sm text-[var(--course-text-muted)] leading-relaxed">
            {element.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
