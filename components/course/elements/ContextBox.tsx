import type { ContextBoxElement } from "@/lib/types";

export default function ContextBox({ element }: { element: ContextBoxElement }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        backgroundColor: "color-mix(in srgb, var(--course-accent) 5%, var(--course-surface))",
        borderColor: "color-mix(in srgb, var(--course-text) 10%, transparent)",
      }}
    >
      <p className="text-xs font-bold text-[var(--course-text-muted)] uppercase tracking-wider mb-2">
        Kontext
      </p>
      <p className="font-heading font-bold text-base text-[var(--course-text)] mb-2">
        {element.term}
      </p>
      <p className="text-sm text-[var(--course-text-muted)] leading-relaxed">
        {element.explanation}
      </p>
    </div>
  );
}
