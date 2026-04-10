import type { KeyConceptElement } from "@/lib/types";

export default function KeyConcept({ element }: { element: KeyConceptElement }) {
  return (
    <div className="bg-[var(--course-surface)] border border-[var(--course-primary)]/20 rounded-xl p-5">
      <div className="flex items-start gap-3">
        {element.icon && (
          <span className="text-2xl flex-shrink-0">{element.icon}</span>
        )}
        <div>
          <h3 className="font-heading font-bold text-lg text-[var(--course-text)] mb-1">
            {element.title}
          </h3>
          <p className="text-base text-[var(--course-text)] leading-relaxed">
            {element.description}
          </p>
        </div>
      </div>
    </div>
  );
}
