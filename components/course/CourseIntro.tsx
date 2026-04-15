"use client";

import type { CourseIntro as CourseIntroType, CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import dynamic from "next/dynamic";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

interface CourseIntroProps {
  intro: CourseIntroType;
  meta: CourseMeta;
}

export default function CourseIntro({ intro, meta }: CourseIntroProps) {
  const { isEditMode } = useEditMode();

  const titleContent = (
    <h1
      className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase"
      style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
    >
      {meta.title}
    </h1>
  );

  const subheadingContent = meta.subheading ? (
    <p className="text-lg sm:text-xl text-[var(--course-text-muted)] mt-2 font-bold">
      {meta.subheading}
    </p>
  ) : null;

  const subtitleContent = (
    <p className="text-base sm:text-lg text-[var(--course-text-muted)] mt-3 mb-8 leading-relaxed">
      {meta.subtitle}
    </p>
  );

  const hookContent = (
    <div className="text-lg leading-relaxed mb-8 border-l-4 border-[var(--course-primary)] pl-4 font-medium">
      {intro.hook}
    </div>
  );

  const sourceContent = (
    <p className="text-base">{intro.sourceContext}</p>
  );

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Badges */}
        <ScrollReveal delay={0} duration={600}>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="course">{getDifficultyLabel(meta.difficulty)}</Badge>
            <Badge variant="course">{formatDuration(meta.estimatedMinutes)}</Badge>
          </div>
        </ScrollReveal>

        {/* Title + Subtitle */}
        <ScrollReveal delay={100} duration={700}>
          {isEditMode ? (
            <EditableText elementId="meta:title" content={meta.title} fieldPath="title">
              {titleContent}
            </EditableText>
          ) : (
            titleContent
          )}

          {isEditMode && meta.subheading ? (
            <EditableText elementId="meta:subheading" content={meta.subheading} fieldPath="subheading">
              {subheadingContent}
            </EditableText>
          ) : (
            subheadingContent
          )}

          {isEditMode ? (
            <EditableText elementId="meta:subtitle" content={meta.subtitle} fieldPath="subtitle">
              {subtitleContent}
            </EditableText>
          ) : (
            subtitleContent
          )}
        </ScrollReveal>

        {/* Hook */}
        <ScrollReveal delay={200} duration={700}>
          {isEditMode ? (
            <EditableText elementId="intro-hook" content={intro.hook} fieldPath="hook">
              {hookContent}
            </EditableText>
          ) : (
            hookContent
          )}
        </ScrollReveal>

        {/* Source Context */}
        <ScrollReveal delay={250}>
          <div
            className="p-5 border-4 border-[var(--course-text)]/20"
            style={{ backgroundColor: "var(--course-surface)" }}
          >
            <p className="text-xs font-black text-[var(--course-text-muted)] uppercase tracking-widest mb-2">Quelle</p>
            {isEditMode ? (
              <EditableText elementId="intro-source" content={intro.sourceContext} fieldPath="sourceContext">
                {sourceContent}
              </EditableText>
            ) : (
              sourceContent
            )}
            <a
              href={meta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-[var(--course-primary)] hover:underline decoration-2 mt-2 uppercase tracking-wide"
            >
              Zum Original →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
