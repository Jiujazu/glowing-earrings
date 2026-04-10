import type { CourseOutro as CourseOutroType } from "@/lib/types";
import NewsletterCTA from "@/components/layout/NewsletterCTA";

interface CourseOutroProps {
  outro: CourseOutroType;
  courseSlug: string;
}

export default function CourseOutro({ outro, courseSlug }: CourseOutroProps) {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Synthesis */}
        <h2
          className="font-heading text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
        >
          Das nimmst du mit
        </h2>
        <ul className="space-y-3 mb-8">
          {outro.synthesis.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-base leading-relaxed">
              <span className="text-[var(--course-primary)] mt-1">✦</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Takeaway */}
        {outro.takeaway && outro.takeaway.length > 0 && (
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
        )}

        {/* Next Step */}
        <div className="bg-[var(--course-primary)]/5 border border-[var(--course-primary)]/20 rounded-xl p-5 mb-8">
          <p className="text-sm font-medium text-[var(--course-primary)] mb-1 uppercase tracking-wide">
            Dein nächster Schritt
          </p>
          <p className="text-base leading-relaxed">{outro.nextStep}</p>
        </div>

        {/* Source Link */}
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

        {/* Newsletter CTA — highest priority placement */}
        <NewsletterCTA
          variant="featured"
          source={`course-${courseSlug}`}
          customHeadline={outro.newsletterCTA}
        />
      </div>
    </section>
  );
}
