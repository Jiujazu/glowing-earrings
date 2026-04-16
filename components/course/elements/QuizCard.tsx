"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { QuizElement, QuizOption } from "@/lib/types";
import QuizConfetti from "./QuizConfetti";
import { useProgressTracker } from "../CourseProgressTracker";
import { useEditMode } from "@/components/editor/EditModeProvider";
import IconBox from "@/components/ui/IconBox";
import { Lightbulb, Target } from "lucide-react";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

function InlineEdit({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // Set initial text content safely (no HTML injection)
  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`outline-none focus:ring-1 focus:ring-[var(--course-primary)] rounded px-1 -mx-1 ${className || ""}`}
      onBlur={() => {
        const text = ref.current?.textContent || "";
        if (text !== value) onChange(text);
      }}
    />
  );
}

export default function QuizCard({ element }: { element: QuizElement }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [localOptions, setLocalOptions] = useState<QuizOption[]>(element.options);
  const tracker = useProgressTracker();
  const editMode = useEditMode();
  const isEditMode = editMode.isEditMode;

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

  const updateOption = useCallback(
    (index: number, field: "text" | "feedback" | "correct", value: string | boolean) => {
      const updated = localOptions.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      );
      setLocalOptions(updated);
      if ("registerChange" in editMode) {
        editMode.registerChange({
          elementId: element.id,
          fieldPath: "options",
          newValue: JSON.stringify(updated),
        });
      }
    },
    [localOptions, editMode, element.id]
  );

  const isCorrect = selected !== null && element.options[selected].correct;
  const options = isEditMode ? localOptions : element.options;

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
      className="p-5 sm:p-6 relative overflow-hidden border-4 border-[var(--course-text)]/40"
      style={{ backgroundColor: "var(--course-surface)", boxShadow: "4px 4px 0px 0px color-mix(in srgb, var(--course-text) 25%, transparent)" }}
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
        {options.map((option, i) => {
          const isSelected = selected === i;
          const isOptionCorrect = option.correct;

          let borderColor = "color-mix(in srgb, var(--course-text) 35%, transparent)";
          let bgColor = "transparent";

          if (revealed) {
            if (isOptionCorrect) {
              borderColor = "#22C55E";
              bgColor = "color-mix(in srgb, #22C55E 10%, var(--course-surface))";
            } else if (isSelected && !isOptionCorrect) {
              borderColor = "#E55B5B";
              bgColor = "color-mix(in srgb, #E55B5B 10%, var(--course-surface))";
            } else {
              borderColor = "color-mix(in srgb, var(--course-text) 20%, transparent)";
            }
          }

          if (isEditMode && isOptionCorrect) {
            borderColor = "#22C55E";
            bgColor = "color-mix(in srgb, #22C55E 5%, var(--course-surface))";
          }

          return (
            <button
              type="button"
              key={i}
              disabled={revealed || isEditMode}
              className={`
                w-full text-left p-4 border-4 transition-all duration-100
                ${!revealed && !isEditMode ? "cursor-pointer hover:border-[var(--course-primary)]" : "cursor-default"}
                ${revealed && !isOptionCorrect && !isSelected ? "opacity-50" : ""}
                ${isSelected && isOptionCorrect ? "animate-celebrate" : ""}
                ${isSelected && !isOptionCorrect ? "animate-wiggle" : ""}
              `}
              style={{ borderColor, backgroundColor: bgColor }}
              onClick={() => handleSelect(i)}
            >
              <span className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5">
                  {isEditMode ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOption(i, "correct", !isOptionCorrect);
                      }}
                      className={`block w-5 h-5 rounded-full flex items-center justify-center text-white text-xs transition-all ${
                        isOptionCorrect ? "bg-[#22C55E]" : "border-2 border-[var(--course-text-muted)]/40 hover:border-[#22C55E]"
                      }`}
                      title={isOptionCorrect ? "Klick: als falsch markieren" : "Klick: als richtig markieren"}
                    >
                      {isOptionCorrect && "✓"}
                    </button>
                  ) : revealed && isOptionCorrect ? (
                    <span className="block w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs">✓</span>
                  ) : revealed && !isOptionCorrect && isSelected ? (
                    <span className="block w-5 h-5 rounded-full bg-[#E55B5B] flex items-center justify-center text-white text-xs">✗</span>
                  ) : (
                    <span className="block w-5 h-5 rounded-full border-2 border-[var(--course-text-muted)]/40" />
                  )}
                </span>
                <span className="flex-1">
                  {isEditMode ? (
                    <InlineEdit
                      value={option.text}
                      onChange={(val) => updateOption(i, "text", val)}
                      className="text-base text-[var(--course-text)] block"
                    />
                  ) : (
                    <span className="text-base text-[var(--course-text)]">{option.text}</span>
                  )}
                </span>
              </span>

              {/* Feedback */}
              {isEditMode ? (
                <div className="mt-2 ml-8">
                  <span className="text-xs text-[var(--course-text-muted)] mr-1">Feedback:</span>
                  <InlineEdit
                    value={option.feedback}
                    onChange={(val) => updateOption(i, "feedback", val)}
                    className="text-sm text-[var(--course-text-muted)] italic"
                  />
                </div>
              ) : (
                revealed && isSelected && (
                  <p className="mt-2 ml-8 text-sm text-[var(--course-text-muted)] animate-fade-in">
                    {option.feedback}
                  </p>
                )
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {(revealed || isEditMode) && (
        <div
          className="mt-4 pt-4 animate-fade-in"
          style={{ borderTop: "2px solid color-mix(in srgb, var(--course-text) 30%, transparent)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <IconBox icon={isEditMode ? Lightbulb : isCorrect ? Target : Lightbulb} color={isCorrect ? "#22C55E" : "var(--course-primary)"} size="sm" />
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
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wide border-4 border-[var(--course-text)]/40 transition-all duration-100 text-[var(--course-primary)] hover:bg-[var(--course-primary)]/10 press-feedback"
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
