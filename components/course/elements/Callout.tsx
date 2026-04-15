"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import type { CalloutElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

const variantConfig: Record<
  CalloutElement["variant"],
  { icon: string; color: string }
> = {
  quote: { icon: "\u201C", color: "var(--course-primary)" },
  stat: { icon: "\u{1F4CA}", color: "var(--course-accent)" },
  example: { icon: "\u{1F4A1}", color: "#E6A817" },
  warning: { icon: "\u26A0\uFE0F", color: "#E05252" },
  tip: { icon: "\u2728", color: "#22C55E" },
  "fun-fact": { icon: "\u{1F3B2}", color: "#A855F7" },
};

export default function Callout({ element }: { element: CalloutElement }) {
  const config = variantConfig[element.variant];
  const { isEditMode } = useEditMode();

  const textContent = (
    <div className="text-base text-[var(--course-text)] leading-relaxed prose prose-sm max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-[var(--course-primary)] [&_a]:decoration-2 [&_strong]:text-[var(--course-text)] [&_strong]:font-black [&_ul]:mt-1 [&_li]:mb-0.5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {element.text}
      </ReactMarkdown>
    </div>
  );

  return (
    <div
      className="border-l-[6px] border-4 p-5"
      style={{
        borderColor: "color-mix(in srgb, var(--course-text) 12%, transparent)",
        borderLeftColor: config.color,
        backgroundColor: "var(--course-surface)",
      }}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center border-2 text-lg"
          style={{ borderColor: "color-mix(in srgb, var(--course-text) 12%, transparent)" }}
          aria-hidden="true"
        >
          {config.icon}
        </span>
        <div>
          {element.title && (
            isEditMode ? (
              <EditableText elementId={element.id} content={element.title} fieldPath="title">
                <p className="font-heading font-black text-sm mb-1 uppercase tracking-wide" style={{ color: config.color }}>
                  {element.title}
                </p>
              </EditableText>
            ) : (
              <p className="font-heading font-black text-sm mb-1 uppercase tracking-wide" style={{ color: config.color }}>
                {element.title}
              </p>
            )
          )}
          {isEditMode ? (
            <EditableText elementId={element.id} content={element.text} fieldPath="text">
              {textContent}
            </EditableText>
          ) : (
            textContent
          )}
        </div>
      </div>
    </div>
  );
}
