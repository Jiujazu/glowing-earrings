import Link from "next/link";
import type { CourseOutro as CourseOutroType } from "@/lib/types";
import { getCourseBySlug, formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CourseOutroProps {
  outro: CourseOutroType;
  courseSlug: string;
  relatedSlugs?: string[];
}

export default function CourseOutro({ outro, courseSlug, relatedSlugs }: CourseOutroProps) {
  const relatedCourses = (relatedSlugs || [])
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean);
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Synthesis */}
        <ScrollReveal>
          <h2
            className="font-heading text-2xl sm:text-3xl font-bold mb-6"
            style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
          >
            Das nimmst du mit
          </h2>
        </ScrollReveal>
        <ul className="space-y-3 mb-8">
          {outro.synthesis.map((point, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <li className="flex items-start gap-3 text-base leading-relaxed">
                <span className="text-[var(--course-primary)] mt-1">✦</span>
                <span>{point}</span>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        {/* Takeaway */}
        {outro.takeaway && outro.takeaway.length > 0 && (
          <ScrollReveal>
            <div className="bg-[var(--course-surface)] rounded-xl p-5 mb-8">
              <h3 className="font-heading font-bold text-lg mb-3">Checkliste</h3>
              <ul className="space-y-2">
                {outro.takeaway.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-base">
                    <span>{item.emoji}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* Next Step */}
        <ScrollReveal>
          <div
            className="rounded-xl p-5 mb-8 border"
            style={{
              backgroundColor: "color-mix(in srgb, var(--course-primary) 5%, var(--course-surface))",
              borderColor: "color-mix(in srgb, var(--course-primary) 20%, transparent)",
            }}
          >
            <p className="text-sm font-medium text-[var(--course-primary)] mb-1 uppercase tracking-wide">
              Dein nächster Schritt
            </p>
            <p className="text-base leading-relaxed">{outro.nextStep}</p>
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
                className="font-heading text-xl font-bold mb-4"
                style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
              >
                Weiter lernen
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCourses.map((course) => (
                  <Link
                    key={course!.meta.slug}
                    href={`/courses/${course!.meta.slug}`}
                    className="group block rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className="h-1.5"
                      style={{ backgroundColor: course!.meta.design.colors.primary }}
                    />
                    <div
                      className="p-4 border border-t-0 rounded-b-xl"
                      style={{
                        backgroundColor: "var(--course-surface)",
                        borderColor: "color-mix(in srgb, var(--course-text) 10%, transparent)",
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
