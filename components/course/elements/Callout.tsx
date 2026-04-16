"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import type { CalloutElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";
import IconBox from "@/components/ui/IconBox";
import { Quote, BarChart3, Lightbulb, AlertTriangle, Sparkles, Dices } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

const variantConfig: Record<
  CalloutElement["variant"],
  { icon: LucideIcon; color: string }
> = {
  quote: { icon: Quote, color: "var(--course-primary)" },
  stat: { icon: BarChart3, color: "var(--course-accent)" },
  example: { icon: Lightbulb, color: "#E6A817" },
  warning: { icon: AlertTriangle, color: "#E05252" },
  tip: { icon: Sparkles, color: "#22C55E" },
  "fun-fact": { icon: Dices, color: "#A855F7" },
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
        <IconBox icon={config.icon} color={config.color} size="md" />
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
