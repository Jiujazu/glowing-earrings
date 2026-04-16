"use client";

import dynamic from "next/dynamic";
import type { ReflectionElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";
import IconBox from "@/components/ui/IconBox";
import { MessageCircleQuestion } from "lucide-react";

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
    <div className="bg-[var(--course-surface)] p-6 border-4 border-dashed border-[var(--course-border)]" style={{ boxShadow: "var(--course-shadow)" }}>
      <div className="flex items-start gap-3">
        <IconBox icon={MessageCircleQuestion} color="var(--course-primary)" size="md" />
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
