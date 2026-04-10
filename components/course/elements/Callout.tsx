import type { CalloutElement } from "@/lib/types";

const variantConfig: Record<
  CalloutElement["variant"],
  { icon: string }
> = {
  quote: { icon: "\u201C" },
  stat: { icon: "📊" },
  example: { icon: "💡" },
  warning: { icon: "⚠️" },
  tip: { icon: "✨" },
  "fun-fact": { icon: "🎲" },
};

export default function Callout({ element }: { element: CalloutElement }) {
  const config = variantConfig[element.variant];

  return (
    <div
      className="border-l-4 rounded-r-xl p-5"
      style={{
        borderLeftColor: "var(--course-primary)",
        backgroundColor: "color-mix(in srgb, var(--course-primary) 8%, var(--course-surface))",
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{config.icon}</span>
        <div>
          {element.title && (
            <p className="font-heading font-bold text-sm text-[var(--course-text)] mb-1">
              {element.title}
            </p>
          )}
          <p className="text-base text-[var(--course-text)] leading-relaxed opacity-90">
            {element.text}
          </p>
        </div>
      </div>
    </div>
  );
}
