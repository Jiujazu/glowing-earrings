"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { QuizElement } from "@/lib/types";
import QuizConfetti from "./QuizConfetti";
import { useProgressTracker } from "../CourseProgressTracker";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function QuizCard({ element }: { element: QuizElement }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const tracker = useProgressTracker();
  const { isEditMode } = useEditMode();

  function handleSelect(index: number) {
    if (revealed || isEditMode) return;
    setSelected(index);
    setRevealed(true);
    if (element.options[index].correct) {
      tracker?.onQuizComplete(element.id);
    }
  }

  function handleRetry() {
    setSelected(null);
    setRevealed(false);
  }

  const isCorrect = selected !== null && element.options[selected].correct;

  const questionContent = (
    <p className="font-heading font-bold text-lg text-[var(--course-text)] mb-1">
      {element.question}
    </p>
  );

  const explanationContent = (
    <p className="text-sm text-[var(--course-text-muted)] leading-relaxed">
      {element.explanation}
    </p>
  );

  return (
    <div
      className="rounded-xl p-5 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--course-surface)" }}
    >
      {revealed && isCorrect && <QuizConfetti />}

      {/* Question */}
      {isEditMode ? (
        <EditableText elementId={element.id} content={element.question} fieldPath="question">
          {questionContent}
        </EditableText>
      ) : (
        questionContent
      )}

      {!revealed && !isEditMode && (
        <p className="text-xs text-[var(--course-text-muted)] mb-4">Wähle eine Antwort</p>
      )}
      {(revealed || isEditMode) && <div className="mb-4" />}

      {/* Options */}
      <div className="space-y-2">
        {element.options.map((option, i) => {
          const isSelected = selected === i;
          const isOptionCorrect = option.correct;

          let borderColor = "color-mix(in srgb, var(--course-text) 15%, transparent)";
          let bgColor = "transparent";

          if (revealed) {
            if (isOptionCorrect) {
              borderColor = "#22C55E";
              bgColor = "color-mix(in srgb, #22C55E 10%, var(--course-surface))";
            } else if (isSelected && !isOptionCorrect) {
              borderColor = "#E55B5B";
              bgColor = "color-mix(in srgb, #E55B5B 10%, var(--course-surface))";
            } else {
              borderColor = "color-mix(in srgb, var(--course-text) 8%, transparent)";
            }
          }

          if (isEditMode && isOptionCorrect) {
            borderColor = "#22C55E";
            bgColor = "color-mix(in srgb, #22C55E 5%, var(--course-surface))";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed || isEditMode}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${!revealed && !isEditMode ? "cursor-pointer hover:border-[var(--course-primary)]" : "cursor-default"}
                ${revealed && !isOptionCorrect && !isSelected ? "opacity-50" : ""}
                ${isSelected && isOptionCorrect ? "animate-celebrate" : ""}
                ${isSelected && !isOptionCorrect ? "animate-wiggle" : ""}
              `}
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <span className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  {isEditMode && isOptionCorrect && (
                    <span className="block w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs">✓</span>
                  )}
                  {isEditMode && !isOptionCorrect && (
                    <span className="block w-5 h-5 rounded-full border-2 border-[var(--course-text-muted)]/40" />
                  )}
                  {!isEditMode && !revealed && (
                    <span className="block w-5 h-5 rounded-full border-2 border-[var(--course-text-muted)]/40" />
                  )}
                  {!isEditMode && revealed && isOptionCorrect && (
                    <span className="block w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs">✓</span>
                  )}
                  {!isEditMode && revealed && !isOptionCorrect && isSelected && (
                    <span className="block w-5 h-5 rounded-full bg-[#E55B5B] flex items-center justify-center text-white text-xs">✗</span>
                  )}
                  {!isEditMode && revealed && !isOptionCorrect && !isSelected && (
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

      {/* Explanation — always visible in edit mode */}
      {(revealed || isEditMode) && (
        <div
          className="mt-4 pt-4 animate-fade-in"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--course-text) 10%, transparent)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{isEditMode ? "💡" : isCorrect ? "🎯" : "💡"}</span>
            <span className="font-heading font-bold text-sm text-[var(--course-text)]">
              {isEditMode ? "Erklärung" : isCorrect ? "Richtig!" : "Nicht ganz — aber gut zu wissen:"}
            </span>
          </div>
          {isEditMode ? (
            <EditableText elementId={element.id} content={element.explanation} fieldPath="explanation">
              {explanationContent}
            </EditableText>
          ) : (
            explanationContent
          )}
          {!isEditMode && (
            <button
              onClick={handleRetry}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 text-[var(--course-primary)] border-[var(--course-primary)]/30 hover:bg-[var(--course-primary)]/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Nochmal versuchen
            </button>
          )}
        </div>
      )}
    </div>
  );
}
