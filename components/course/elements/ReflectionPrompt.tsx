import type { ReflectionElement } from "@/lib/types";

export default function ReflectionPrompt({
  element,
}: {
  element: ReflectionElement;
}) {
  return (
    <div className="bg-[var(--course-surface)] rounded-xl p-6 border border-dashed border-[var(--course-primary)]/30">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🤔</span>
        <div>
          <p className="text-xs font-medium text-[var(--course-text-muted)] uppercase tracking-wider mb-2">
            Kurz nachgedacht
          </p>
          <p className="text-base text-[var(--course-text)] leading-relaxed font-medium">
            {element.prompt}
          </p>
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
