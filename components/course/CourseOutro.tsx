import type { CourseOutro as CourseOutroType } from "@/lib/types";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CourseOutroProps {
  outro: CourseOutroType;
  courseSlug: string;
}

export default function CourseOutro({ outro, courseSlug }: CourseOutroProps) {
  return (
    <section className="py-12 sm:py-16 px-4">
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
