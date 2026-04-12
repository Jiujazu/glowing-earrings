import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CalloutElement } from "@/lib/types";

const variantConfig: Record<
  CalloutElement["variant"],
  { icon: string; color: string }
> = {
  quote: { icon: "\u201C", color: "var(--course-primary)" },
  stat: { icon: "📊", color: "var(--course-accent)" },
  example: { icon: "💡", color: "#E6A817" },
  warning: { icon: "⚠️", color: "#E05252" },
  tip: { icon: "✨", color: "#22C55E" },
  "fun-fact": { icon: "🎲", color: "#A855F7" },
};

export default function Callout({ element }: { element: CalloutElement }) {
  const config = variantConfig[element.variant];

  return (
    <div
      className="border-l-4 rounded-r-xl p-5"
      style={{
        borderLeftColor: config.color,
        backgroundColor: `color-mix(in srgb, ${config.color} 8%, var(--course-surface))`,
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{config.icon}</span>
        <div>
          {element.title && (
            <p
              className="font-heading font-bold text-sm mb-1"
              style={{ color: config.color }}
            >
              {element.title}
            </p>
          )}
          <div className="text-base text-[var(--course-text)] leading-relaxed opacity-90 prose prose-sm max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-[var(--course-primary)] [&_strong]:text-[var(--course-text)] [&_ul]:mt-1 [&_li]:mb-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {element.text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
