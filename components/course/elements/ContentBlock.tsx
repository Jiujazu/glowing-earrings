"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import type { ContentElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

const proseClasses =
  "prose prose-base sm:prose-lg max-w-none prose-headings:font-heading prose-headings:text-[var(--course-text)] prose-h3:text-lg prose-h3:sm:text-xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-[var(--course-primary)] prose-p:text-[var(--course-text)] prose-p:leading-[1.8] prose-p:mb-6 prose-a:text-[var(--course-primary)] prose-a:underline-offset-2 prose-strong:text-[var(--course-text)] prose-code:text-[var(--course-primary)] prose-code:bg-[var(--course-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:text-[var(--course-text)] prose-ul:my-5 prose-ol:my-5 prose-li:mb-2 prose-li:leading-[1.7]";

export default function ContentBlock({ element }: { element: ContentElement }) {
  const { isEditMode } = useEditMode();

  const rendered = (
    <div className={proseClasses}>
      <Markdown remarkPlugins={[remarkGfm]}>{element.text}</Markdown>
    </div>
  );

  if (isEditMode) {
    return (
      <EditableText
        elementId={element.id}
        content={element.text}
        fieldPath="text"
      >
        {rendered}
      </EditableText>
    );
  }

  return rendered;
}
