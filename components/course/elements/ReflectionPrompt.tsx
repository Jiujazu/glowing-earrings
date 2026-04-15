"use client";

import dynamic from "next/dynamic";
import type { ReflectionElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function ReflectionPrompt({
  element,
}: {
  element: ReflectionElement;
}) {
  const { isEditMode } = useEditMode();

  const promptContent = (
    <p className="text-base text-[var(--course-text)] leading-relaxed font-medium">
      {element.prompt}
    </p>
  );

  return (
    <div className="bg-[var(--course-surface)] p-6 border-4 border-dashed border-[var(--course-primary)]/30">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🤔</span>
        <div>
          <p className="text-xs font-medium text-[var(--course-text-muted)] uppercase tracking-wider mb-2">
            Kurz nachgedacht
          </p>
          {isEditMode ? (
            <EditableText elementId={element.id} content={element.prompt} fieldPath="prompt">
              {promptContent}
            </EditableText>
          ) : (
            promptContent
          )}
          {element.placeholder && (
            <p className="text-sm text-[var(--course-text-muted)] mt-3 italic">
              {element.placeholder}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
