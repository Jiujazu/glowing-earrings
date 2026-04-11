import type { CourseIntro as CourseIntroType, CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel, getSourceTypeLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CourseIntroProps {
  intro: CourseIntroType;
  meta: CourseMeta;
}

export default function CourseIntro({ intro, meta }: CourseIntroProps) {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Badges */}
        <ScrollReveal delay={0} duration={600}>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="course">{getSourceTypeLabel(meta.sourceType)}</Badge>
            <Badge variant="course">{getDifficultyLabel(meta.difficulty)}</Badge>
            <Badge variant="course">{formatDuration(meta.estimatedMinutes)}</Badge>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={100} duration={700}>
          <h1
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
          >
            {meta.title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--course-text-muted)] mb-8">
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
          <div className="bg-[var(--course-surface)] rounded-xl p-5 mb-8">
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

        {/* Overview */}
        <ScrollReveal delay={300}>
          <div>
            <p className="text-sm font-medium text-[var(--course-text-muted)] mb-3 uppercase tracking-wide">
              Was dich erwartet
            </p>
            <ol className="space-y-2">
              {intro.overview.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--course-primary)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
