"use client";

import { useState } from "react";
import Image from "next/image";
import type { CourseIntro as CourseIntroType, CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import { HEADING, LABEL } from "@/lib/typography";
import ScrollReveal from "@/components/ui/ScrollReveal";
import dynamic from "next/dynamic";
import { useEditMode } from "@/components/editor/EditModeProvider";
import MetaEditButton from "@/components/editor/MetaEditButton";

const EditableText = dynamic(() => import("@/components/editor/EditableText"), {
  ssr: false,
});

const MetaEditPanel = dynamic(
  () => import("@/components/editor/MetaEditPanel"),
  { ssr: false }
);

interface CourseIntroProps {
  intro: CourseIntroType;
  meta: CourseMeta;
  allTags?: string[];
}

export default function CourseIntro({ intro, meta, allTags = [] }: CourseIntroProps) {
  const { isEditMode } = useEditMode();
  const [isMetaPanelOpen, setIsMetaPanelOpen] = useState(false);

  const titleContent = (
    <h1
      className={`${HEADING} text-3xl sm:text-4xl lg:text-5xl`}
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

  const tldrContent = (
    <p className="text-base leading-relaxed">{intro.tldr}</p>
  );

  return (
    <section className="pt-0 pb-16 sm:pb-24 px-4">
      {/* Cover Image as Hero Banner */}
      {meta.coverImage && (
        <ScrollReveal delay={0} duration={600}>
          <div className="max-w-3xl mx-auto mb-10 mt-8 sm:mt-12 overflow-hidden border-4 border-[var(--course-border)]">
            <Image
              src={meta.coverImage}
              alt={meta.title}
              width={800}
              height={400}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </ScrollReveal>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Badges */}
        <ScrollReveal delay={meta.coverImage ? 50 : 0} duration={600}>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="course">{getDifficultyLabel(meta.difficulty)}</Badge>
            <Badge variant="course">{formatDuration(meta.estimatedMinutes)}</Badge>
            {isEditMode && (
              <MetaEditButton onClick={() => setIsMetaPanelOpen(true)} />
            )}
          </div>
        </ScrollReveal>

        {/* Title + Subtitle */}
        <ScrollReveal delay={meta.coverImage ? 100 : 100} duration={700}>
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

        {/* TLDR */}
        <ScrollReveal delay={200} duration={700}>
          <div
            className="p-5 border-4 border-[var(--course-border)]"
            style={{ backgroundColor: "var(--course-surface)" }}
          >
            <p className={`text-xs ${LABEL} text-[var(--course-primary)] mb-2`}>TLDR</p>
            {isEditMode ? (
              <EditableText elementId="intro-tldr" content={intro.tldr} fieldPath="tldr">
                {tldrContent}
              </EditableText>
            ) : (
              tldrContent
            )}
          </div>
        </ScrollReveal>
      </div>

      {isEditMode && (
        <MetaEditPanel
          meta={meta}
          allTags={allTags}
          open={isMetaPanelOpen}
          onClose={() => setIsMetaPanelOpen(false)}
        />
      )}
    </section>
  );
}
