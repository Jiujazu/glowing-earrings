import type { CalloutElement } from "@/lib/types";

const variantStyles: Record<
  CalloutElement["variant"],
  { icon: string; borderClass: string; bgClass: string }
> = {
  quote: {
    icon: "\u201C",
    borderClass: "border-l-[var(--course-primary)]",
    bgClass: "bg-[var(--course-primary)]/5",
  },
  stat: {
    icon: "📊",
    borderClass: "border-l-[var(--course-accent)]",
    bgClass: "bg-[var(--course-accent)]/5",
  },
  example: {
    icon: "💡",
    borderClass: "border-l-amber-400",
    bgClass: "bg-amber-50",
  },
  warning: {
    icon: "⚠️",
    borderClass: "border-l-red-400",
    bgClass: "bg-red-50",
  },
  tip: {
    icon: "✨",
    borderClass: "border-l-emerald-400",
    bgClass: "bg-emerald-50",
  },
  "fun-fact": {
    icon: "🎲",
    borderClass: "border-l-purple-400",
    bgClass: "bg-purple-50",
  },
};

export default function Callout({ element }: { element: CalloutElement }) {
  const style = variantStyles[element.variant];

  return (
    <div
      className={`border-l-4 rounded-r-xl p-5 ${style.bgClass}`}
      style={{ borderLeftColor: `var(--course-primary)` }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{style.icon}</span>
        <div>
          {element.title && (
            <p className="font-heading font-bold text-sm text-[var(--course-text)] mb-1">
              {element.title}
            </p>
          )}
          <p className="text-base text-[var(--course-text)] leading-relaxed">
            {element.text}
          </p>
        </div>
      </div>
    </div>
  );
}
