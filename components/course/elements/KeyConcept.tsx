"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { KeyConceptElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

export default function KeyConcept({ element }: { element: KeyConceptElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const { isEditMode } = useEditMode();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("aha-revealed");
          setTimeout(() => el.classList.add("aha-settled"), 1200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleContent = (
    <h3 className="font-heading font-bold text-lg text-[var(--course-text)] mb-1">
      {element.title}
    </h3>
  );

  const descContent = (
    <p className="text-base text-[var(--course-text)] leading-relaxed opacity-85">
      {element.description}
    </p>
  );

  return (
    <div
      ref={ref}
      className="aha-glow p-5 border-4"
      style={{
        backgroundColor: "color-mix(in srgb, var(--course-primary) 6%, var(--course-surface))",
        borderColor: "color-mix(in srgb, var(--course-primary) 20%, transparent)",
      }}
    >
      <div className="flex items-start gap-3">
        {element.icon && (
          <span className="text-2xl flex-shrink-0">{element.icon}</span>
        )}
        <div>
          {isEditMode ? (
            <>
              <EditableText elementId={element.id} content={element.title} fieldPath="title">
                {titleContent}
              </EditableText>
              <EditableText elementId={element.id} content={element.description} fieldPath="description">
                {descContent}
              </EditableText>
            </>
          ) : (
            <>
              {titleContent}
              {descContent}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
