"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { StepByStepElement, StepItem } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

function InlineStepEdit({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

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

export default function StepByStep({ element }: { element: StepByStepElement }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [localSteps, setLocalSteps] = useState<StepItem[]>(element.steps);
  const editMode = useEditMode();
  const isEditMode = editMode.isEditMode;

  const updateStep = useCallback(
    (index: number, field: "label" | "content", value: string) => {
      const updated = localSteps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      );
      setLocalSteps(updated);
      if ("registerChange" in editMode) {
        editMode.registerChange({
          elementId: element.id,
          fieldPath: "steps",
          newValue: JSON.stringify(updated),
        });
      }
    },
    [localSteps, editMode, element.id]
  );

  const steps = isEditMode ? localSteps : element.steps;

  return (
    <div className="overflow-hidden bg-[var(--course-surface)] border-4 border-[var(--course-text)]/40" style={{ boxShadow: "4px 4px 0px 0px color-mix(in srgb, var(--course-text) 25%, transparent)" }}>
      {element.title && (
        <div className="px-5 pt-5 pb-2">
          {isEditMode ? (
            <EditableText elementId={element.id} content={element.title} fieldPath="title">
              <h3
                className="font-heading text-lg font-bold text-[var(--course-text)]"
                style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
              >
                {element.title}
              </h3>
            </EditableText>
          ) : (
            <h3
              className="font-heading text-lg font-bold text-[var(--course-text)]"
              style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
            >
              {element.title}
            </h3>
          )}
        </div>
      )}

      <ol className="divide-y divide-[var(--course-text)]/20">
        {steps.map((step, i) => {
          const isExpanded = expandedStep === i || isEditMode;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => !isEditMode && setExpandedStep(isExpanded ? null : i)}
                aria-expanded={isExpanded}
                className={`flex items-center gap-4 w-full px-5 py-4 text-left transition-colors ${
                  isEditMode ? "cursor-default" : "hover:bg-[var(--course-text)]/3"
                }`}
              >
                <span className="flex items-center justify-center w-8 h-8 border-[3px] border-[var(--course-text)]/40 bg-[var(--course-primary)]/20 text-[var(--course-primary)] text-sm font-black font-heading flex-shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 font-medium text-[var(--course-text)] text-sm sm:text-base">
                  {isEditMode ? (
                    <InlineStepEdit
                      value={step.label}
                      onChange={(val) => updateStep(i, "label", val)}
                      className="block"
                    />
                  ) : (
                    step.label
                  )}
                </span>
                {!isEditMode && (
                  <svg
                    className={`w-4 h-4 text-[var(--course-text-muted)] transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pl-[4.25rem] animate-slide-up">
                  {isEditMode ? (
                    <div className="prose prose-sm max-w-none text-[var(--course-text)]">
                      <InlineStepEdit
                        value={step.content}
                        onChange={(val) => updateStep(i, "content", val)}
                        className="block text-sm leading-relaxed min-h-[2em]"
                      />
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-[var(--course-text)] [&_a]:text-[var(--course-primary)] [&_strong]:text-[var(--course-text)]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {step.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  {step.image && (
                    <div className="mt-3 overflow-hidden border-4 border-[var(--course-text)]/30">
                      <Image
                        src={step.image}
                        alt={`Schritt ${i + 1}: ${step.label}`}
                        width={600}
                        height={340}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
