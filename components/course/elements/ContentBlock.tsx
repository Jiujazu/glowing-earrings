"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import type { ContentElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";
import { COURSE_PROSE_CLASSES } from "@/lib/prose-classes";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function ContentBlock({ element }: { element: ContentElement }) {
  const { isEditMode } = useEditMode();

  const rendered = (
    <div className={COURSE_PROSE_CLASSES}>
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
