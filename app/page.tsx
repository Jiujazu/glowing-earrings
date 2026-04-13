import { Suspense } from "react";
import { getAllCourses } from "@/lib/course-utils";
import CourseFilters from "@/components/course/CourseFilters";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  const courses = getAllCourses();

  return (
    <>
      {/* Hero with CI Gradient */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(2, 86, 113, 0.12), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(91, 47, 159, 0.08), transparent 50%), radial-gradient(ellipse 50% 40% at 20% 60%, rgba(233, 30, 140, 0.05), transparent 50%)",
          }}
        />
        <Container size="narrow" className="relative">
          <div className="text-center">
            <ScrollReveal delay={0} duration={800}>
              <p className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-6">
                The Creative AI Academy
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100} duration={800}>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-[1.05]">
                AI verstehen.
                <br />
                <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--pop-pink)] to-[var(--pop-turquoise)] bg-clip-text text-transparent">
                  Nicht nur benutzen.
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200} duration={800}>
              <p className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
                Interaktive Kurse zu KI, Tech und Kreativität — kostenlos,
                unabhängig und mit Liebe gemacht.
              </p>
            </ScrollReveal>
            {courses.length > 0 && (
              <ScrollReveal delay={300} duration={800}>
                <a
                  href="#kurse"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-accent hover:bg-accent-hover rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 press-feedback"
                >
                  Kurse entdecken
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </ScrollReveal>
            )}
          </div>
        </Container>
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section id="kurse" className="py-16 sm:py-20">
          <Container>
            <ScrollReveal>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
                  Kurse
                </h2>
                <span className="text-sm text-text-muted">
                  {courses.length} {courses.length === 1 ? "Kurs" : "Kurse"}
                </span>
              </div>
            </ScrollReveal>
            <Suspense>
              <CourseFilters courses={courses} />
            </Suspense>
          </Container>
        </section>
      )}

      {/* What makes this different */}
      <section className="py-16 sm:py-20">
        <Container>
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
              Warum das hier anders ist
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: "🎯", color: "accent", title: "Kuratiert, nicht generiert", desc: "Jeder Kurs basiert auf einer echten Quelle — von Expert:innen, die wissen wovon sie reden." },
              { emoji: "🎮", color: "pop-pink", title: "Interaktiv, nicht passiv", desc: "Quizzes, Flashcards, Easter Eggs — Lernen, das sich anfühlt wie Entdecken." },
              { emoji: "🔓", color: "pop-turquoise", title: "Kostenlos, ohne Haken", desc: "Keine Paywall, kein Tracking, keine Registrierung. Einfach lernen." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 120}>
                <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-surface-tinted hover:shadow-sm">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--${item.color})]/10 text-2xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--${item.color})]/15`}>
                    {item.emoji}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <ScrollReveal>
            <NewsletterCTA variant="featured" source="landing" />
          </ScrollReveal>
        </Container>
      </section>

      {/* Empty state */}
      {courses.length === 0 && (
        <section className="py-20">
          <Container size="narrow">
            <ScrollReveal>
              <div className="text-center">
                <p className="text-5xl mb-6">🚀</p>
                <p className="text-xl text-text-secondary">
                  Die ersten Kurse kommen bald. Trag dich in den Newsletter ein,
                  um nichts zu verpassen.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}
    </>
  );
}
