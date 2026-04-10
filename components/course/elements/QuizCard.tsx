"use client";

import { useState } from "react";
import type { QuizElement } from "@/lib/types";

export default function QuizCard({ element }: { element: QuizElement }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(index: number) {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  }

  const isCorrect = selected !== null && element.options[selected].correct;

  return (
    <div className="bg-[var(--course-surface)] rounded-xl p-5 sm:p-6">
      {/* Question */}
      <p className="font-heading font-bold text-lg text-[var(--course-text)] mb-4">
        {element.question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {element.options.map((option, i) => {
          const isSelected = selected === i;
          const isOptionCorrect = option.correct;

          let optionStyle = "border-[var(--course-text)]/15 hover:border-[var(--course-primary)]/50 cursor-pointer";
          if (revealed) {
            if (isOptionCorrect) {
              optionStyle = "border-emerald-400 bg-emerald-50";
            } else if (isSelected && !isOptionCorrect) {
              optionStyle = "border-red-400 bg-red-50";
            } else {
              optionStyle = "border-[var(--course-text)]/10 opacity-50";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${optionStyle}
                ${isSelected && isOptionCorrect ? "animate-celebrate" : ""}
                ${isSelected && !isOptionCorrect ? "animate-wiggle" : ""}
              `}
            >
              <span className="text-base text-[var(--course-text)]">
                {option.text}
              </span>
              {revealed && isSelected && (
                <p className="mt-2 text-sm text-[var(--course-text-muted)] animate-fade-in">
                  {option.feedback}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation after reveal */}
      {revealed && (
        <div className="mt-4 pt-4 border-t border-[var(--course-text)]/10 animate-fade-in">
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
