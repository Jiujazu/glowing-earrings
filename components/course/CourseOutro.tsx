"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { CourseOutro as CourseOutroType } from "@/lib/types";
import { getCourseBySlug, formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Badge from "@/components/ui/Badge";
import IconBox from "@/components/ui/IconBox";
import { getIconForEmoji } from "@/lib/icon-map";
import { HEADING, LABEL } from "@/lib/typography";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

function InlineOutroEdit({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`outline-none focus:ring-1 focus:ring-[var(--course-primary)] rounded px-1 -mx-1 ${className || ""}`}
      onBlur={() => {
        const text = ref.current?.textContent || "";
        if (text !== value) onChange(text);
      }}
    />
  );
}

interface CourseOutroProps {
  outro: CourseOutroType;
  courseSlug: string;
  relatedSlugs?: string[];
}

export default function CourseOutro({ outro, courseSlug, relatedSlugs }: CourseOutroProps) {
  const editMode = useEditMode();
  const isEditMode = editMode.isEditMode;
  const [localSynthesis, setLocalSynthesis] = useState<string[]>(outro.synthesis);

  const updateSynthesis = useCallback(
    (index: number, value: string) => {
      const updated = localSynthesis.map((s, i) => (i === index ? value : s));
      setLocalSynthesis(updated);
      if ("registerChange" in editMode) {
        editMode.registerChange({
          elementId: "outro",
          fieldPath: "synthesis",
          newValue: JSON.stringify(updated),
        });
      }
    },
    [localSynthesis, editMode]
  );

  const relatedCourses = (relatedSlugs || [])
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean);

  const synthesis = isEditMode ? localSynthesis : outro.synthesis;

  const nextStepContent = (
    <p className="text-base leading-relaxed">{outro.nextStep}</p>
  );

  const ctaContent = (
    <p className="text-base leading-relaxed">{outro.newsletterCTA}</p>
  );

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Synthesis */}
        <ScrollReveal>
          <h2
            className={`${HEADING} text-2xl sm:text-3xl mb-6`}
            style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
          >
            Das nimmst du mit
          </h2>
        </ScrollReveal>
        <ul className="space-y-3 mb-8">
          {synthesis.map((point, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <li className="flex items-start gap-3 text-base leading-relaxed">
                <span className="text-[var(--course-primary)] mt-1">✦</span>
                {isEditMode ? (
                  <InlineOutroEdit
                    value={point}
                    onChange={(val) => updateSynthesis(i, val)}
                    className="flex-1"
                  />
                ) : (
                  <span>{point}</span>
                )}
              </li>
            </ScrollReveal>
          ))}
        </ul>

        {/* Takeaway */}
        {outro.takeaway && outro.takeaway.length > 0 && (
          <ScrollReveal>
            <div className="bg-[var(--course-surface)] p-5 mb-8 border-4 border-[var(--course-text)]/80" style={{ boxShadow: "4px 4px 0px 0px color-mix(in srgb, var(--course-text) 50%, transparent)" }}>
              <h3 className="font-heading font-black text-lg mb-4 uppercase tracking-wide">Checkliste</h3>
              <ul className="space-y-3">
                {outro.takeaway.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base">
                    <IconBox icon={getIconForEmoji(item.emoji)} color="var(--course-primary)" size="sm" />
                    <span className="pt-1">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* Next Step */}
        <ScrollReveal>
          <div
            className="p-5 mb-8 border-4"
            style={{
              backgroundColor: "color-mix(in srgb, var(--course-primary) 10%, var(--course-surface))",
              borderColor: "color-mix(in srgb, var(--course-primary) 80%, transparent)",
              boxShadow: "4px 4px 0px 0px color-mix(in srgb, var(--course-primary) 50%, transparent)",
            }}
          >
            <p className="text-sm font-medium text-[var(--course-primary)] mb-1 uppercase tracking-wide">
              Dein nächster Schritt
            </p>
            {isEditMode ? (
              <EditableText elementId="outro" content={outro.nextStep} fieldPath="nextStep">
                {nextStepContent}
              </EditableText>
            ) : (
              nextStepContent
            )}
          </div>
        </ScrollReveal>

        {/* Source Link */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <a
              href={outro.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--course-text-muted)] hover:text-[var(--course-primary)] transition-colors underline underline-offset-4"
            >
              Zur Originalquelle →
            </a>
          </div>
        </ScrollReveal>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <ScrollReveal>
            <div className="mb-12">
              <h3
                className={`${HEADING} text-xl mb-4`}
                style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
              >
                Weiter lernen
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCourses.map((course) => (
                  <Link
                    key={course!.meta.slug}
                    href={`/courses/${course!.meta.slug}`}
                    className="group block overflow-hidden border-4 border-[var(--course-text)]/80 transition-all duration-200 hover:-translate-y-1"
                  >
                    {course!.meta.coverImage ? (
                      <div className="relative h-28 overflow-hidden border-b-4 border-[var(--course-text)]/10">
                        <Image
                          src={course!.meta.coverImage}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    ) : (
                      <div
                        className="h-2 border-b-4 border-[var(--course-text)]/10"
                        style={{ backgroundColor: course!.meta.design.colors.primary }}
                      />
                    )}
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: "var(--course-surface)",
                      }}
                    >
                      <div className="flex gap-2 mb-2">
                        <Badge variant="course">
                          {getDifficultyLabel(course!.meta.difficulty)}
                        </Badge>
                        <Badge variant="course">
                          {formatDuration(course!.meta.estimatedMinutes)}
                        </Badge>
                      </div>
                      <p className="font-heading font-bold text-[var(--course-text)] group-hover:text-[var(--course-primary)] transition-colors text-base mb-1">
                        {course!.meta.title}
                      </p>
                      <p className="text-sm text-[var(--course-text-muted)] line-clamp-2">
                        {course!.meta.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Newsletter CTA */}
        <ScrollReveal>
          {isEditMode ? (
            <div className="mb-4">
              <p className="text-xs text-[var(--course-text-muted)] uppercase tracking-wider mb-1">Newsletter-CTA Text</p>
              <EditableText elementId="outro" content={outro.newsletterCTA} fieldPath="newsletterCTA">
                {ctaContent}
              </EditableText>
            </div>
          ) : null}
          <NewsletterCTA
            variant="featured"
            source={`course-${courseSlug}`}
            customHeadline={outro.newsletterCTA}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
