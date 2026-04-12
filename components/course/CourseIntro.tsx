import type { CourseIntro as CourseIntroType, CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CourseIntroProps {
  intro: CourseIntroType;
  meta: CourseMeta;
}

export default function CourseIntro({ intro, meta }: CourseIntroProps) {
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

        {/* Title */}
        <ScrollReveal delay={100} duration={700}>
          <h1
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
          >
            {meta.title}
          </h1>
          {meta.subheading && (
            <p className="text-lg sm:text-xl text-[var(--course-text-muted)] mt-2">
              {meta.subheading}
            </p>
          )}
          <p className="text-base sm:text-lg text-[var(--course-text-muted)]/70 mt-3 mb-8 leading-relaxed">
            {meta.subtitle}
          </p>
        </ScrollReveal>

        {/* Hook */}
        <ScrollReveal delay={200} duration={700}>
          <div className="text-lg leading-relaxed mb-8 border-l-4 border-[var(--course-primary)] pl-4">
            {intro.hook}
          </div>
        </ScrollReveal>

        {/* Source Context */}
        <ScrollReveal delay={250}>
          <div className="bg-[var(--course-surface)] rounded-xl p-5">
            <p className="text-sm text-[var(--course-text-muted)] mb-2">Quelle</p>
            <p className="text-base">{intro.sourceContext}</p>
            <a
              href={meta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[var(--course-primary)] hover:underline mt-2"
            >
              Zum Original →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
