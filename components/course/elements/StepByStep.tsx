"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import type { StepByStepElement } from "@/lib/types";

export default function StepByStep({ element }: { element: StepByStepElement }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="rounded-xl overflow-hidden bg-[var(--course-surface)] border border-[var(--course-text)]/10">
      {element.title && (
        <div className="px-5 pt-5 pb-2">
          <h3
            className="font-heading text-lg font-bold text-[var(--course-text)]"
            style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
          >
            {element.title}
          </h3>
        </div>
      )}

      <ol className="divide-y divide-[var(--course-text)]/5">
        {element.steps.map((step, i) => {
          const isExpanded = expandedStep === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setExpandedStep(isExpanded ? null : i)}
                className="flex items-center gap-4 w-full px-5 py-4 text-left hover:bg-[var(--course-text)]/3 transition-colors"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--course-primary)]/15 text-[var(--course-primary)] text-sm font-bold font-heading flex-shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 font-medium text-[var(--course-text)] text-sm sm:text-base">
                  {step.label}
                </span>
                <svg
                  className={`w-4 h-4 text-[var(--course-text-muted)] transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pl-[4.25rem] animate-slide-up">
                  <div className="prose prose-sm max-w-none text-[var(--course-text)] [&_a]:text-[var(--course-primary)] [&_strong]:text-[var(--course-text)]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {step.content}
                    </ReactMarkdown>
                  </div>
                  {step.image && (
                    <div className="mt-3 rounded-lg overflow-hidden">
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
