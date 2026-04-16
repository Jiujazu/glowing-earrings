"use client";

import dynamic from "next/dynamic";
import type { ContextBoxElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function ContextBox({ element }: { element: ContextBoxElement }) {
  const { isEditMode } = useEditMode();

  const termContent = (
    <p className="font-heading font-bold text-base text-[var(--course-text)] mb-2">
      {element.term}
    </p>
  );

  const explanationContent = (
    <p className="text-sm text-[var(--course-text-muted)] leading-relaxed">
      {element.explanation}
    </p>
  );

  return (
    <div
      className="p-5 border-4"
      style={{
        backgroundColor: "color-mix(in srgb, var(--course-accent) 10%, var(--course-surface))",
        borderColor: "color-mix(in srgb, var(--course-text) 40%, transparent)",
        boxShadow: "4px 4px 0px 0px color-mix(in srgb, var(--course-text) 20%, transparent)",
      }}
    >
      <p className="text-xs font-bold text-[var(--course-text-muted)] uppercase tracking-wider mb-2">
        Kontext
      </p>
      {isEditMode ? (
        <>
          <EditableText elementId={element.id} content={element.term} fieldPath="term">
            {termContent}
          </EditableText>
          <EditableText elementId={element.id} content={element.explanation} fieldPath="explanation">
            {explanationContent}
          </EditableText>
        </>
      ) : (
        <>
          {termContent}
          {explanationContent}
        </>
      )}
    </div>
  );
}
