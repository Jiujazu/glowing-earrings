"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { CodeBlockElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function CodeBlock({ element }: { element: CodeBlockElement }) {
  const [copied, setCopied] = useState(false);
  const editMode = useEditMode();
  const isEditMode = editMode.isEditMode;

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(element.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [element.code]);

  const lines = element.code.split("\n");

  const codeContent = (
    <div className="overflow-x-auto">
      <pre className="p-4 text-sm leading-relaxed font-mono">
        {lines.map((line, i) => {
          const lineNum = i + 1;
          const isHighlighted = element.highlightLines?.includes(lineNum);
          return (
            <div
              key={i}
              className={`flex ${isHighlighted ? "bg-[var(--course-primary)]/10 -mx-4 px-4 border-l-2 border-[var(--course-primary)]" : ""}`}
            >
              <span className="inline-block w-8 text-right mr-4 text-[var(--course-text-muted)]/50 select-none flex-shrink-0 text-xs leading-relaxed">
                {lineNum}
              </span>
              <code className="text-[var(--course-text)] whitespace-pre">{line}</code>
            </div>
          );
        })}
      </pre>
    </div>
  );

  return (
    <div className="overflow-hidden bg-[var(--course-surface)] border-4 border-[var(--course-text)]/80" style={{ boxShadow: "4px 4px 0px 0px color-mix(in srgb, var(--course-text) 50%, transparent)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[var(--course-text)]/25">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--course-text)]/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--course-text)]/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--course-text)]/15" />
          </div>
          {isEditMode ? (
            <span className="flex items-center gap-1 ml-2">
              <input
                type="text"
                defaultValue={element.language || ""}
                placeholder="Sprache"
                className="text-xs text-[var(--course-text-muted)] font-mono bg-transparent border-b border-[var(--course-text-muted)]/30 focus:border-[var(--course-primary)] outline-none w-20 px-1"
                onBlur={(e) => {
                  if ("registerChange" in editMode) {
                    editMode.registerChange({ elementId: element.id, fieldPath: "language", newValue: e.target.value });
                  }
                }}
              />
              <input
                type="text"
                defaultValue={element.filename || ""}
                placeholder="Dateiname"
                className="text-xs text-[var(--course-text-muted)] font-mono bg-transparent border-b border-[var(--course-text-muted)]/30 focus:border-[var(--course-primary)] outline-none w-28 px-1"
                onBlur={(e) => {
                  if ("registerChange" in editMode) {
                    editMode.registerChange({ elementId: element.id, fieldPath: "filename", newValue: e.target.value });
                  }
                }}
              />
            </span>
          ) : (
            <>
              {element.filename && (
                <span className="text-xs text-[var(--course-text-muted)] font-mono ml-2">
                  {element.filename}
                </span>
              )}
              {!element.filename && element.language && (
                <span className="text-xs text-[var(--course-text-muted)] font-mono ml-2">
                  {element.language}
                </span>
              )}
            </>
          )}
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-1.5 text-xs font-bold uppercase text-[var(--course-text-muted)] hover:text-[var(--course-text)] transition-colors duration-100 px-2 py-1 hover:bg-[var(--course-text)]/5"
          aria-label="Code kopieren"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[var(--course-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[var(--course-accent)]">Kopiert</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Kopieren
            </>
          )}
        </button>
      </div>

      {/* Code */}
      {isEditMode ? (
        <EditableText elementId={element.id} content={element.code} fieldPath="code">
          {codeContent}
        </EditableText>
      ) : (
        codeContent
      )}
    </div>
  );
}
