import { getAllCourses } from "@/lib/course-utils";
import CourseCard from "@/components/course/CourseCard";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Container from "@/components/ui/Container";

export default function Home() {
  const courses = getAllCourses();

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(199, 91, 57, 0.08), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(26, 83, 92, 0.06), transparent 60%)",
          }}
        />
        <Container size="narrow" className="relative">
          <div className="text-center">
            <p className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-6">
              The Creative AI Academy
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-[1.05]">
              AI verstehen.
              <br />
              <span className="text-accent">Nicht nur benutzen.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
              Interaktive Kurse zu KI, Tech und Kreativität — kostenlos,
              unabhängig und mit Liebe gemacht.
            </p>
            {courses.length > 0 && (
              <a
                href="#kurse"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-accent hover:bg-accent-hover rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
              >
                Kurse entdecken
                <span className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section id="kurse" className="py-16 sm:py-20">
          <Container>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
                Kurse
              </h2>
              <span className="text-sm text-text-muted">
                {courses.length} {courses.length === 1 ? "Kurs" : "Kurse"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.meta.slug} meta={course.meta} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* What makes this different */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
            Warum das hier anders ist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-surface hover:shadow-sm">
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                🎯
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">
                Kuratiert, nicht generiert
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Jeder Kurs basiert auf einer echten Quelle — von Expert:innen, die
                wissen wovon sie reden.
              </p>
            </div>
            <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-surface hover:shadow-sm">
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                🎮
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">
                Interaktiv, nicht passiv
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Quizzes, Flashcards, Easter Eggs — Lernen, das sich anfühlt wie
                Entdecken.
              </p>
            </div>
            <div className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-surface hover:shadow-sm">
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                🔓
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">
                Kostenlos, ohne Haken
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Keine Paywall, kein Tracking, keine Registrierung. Einfach
                lernen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <NewsletterCTA variant="featured" source="landing" />
        </Container>
      </section>

      {/* Empty state */}
      {courses.length === 0 && (
        <section className="py-20">
          <Container size="narrow">
            <div className="text-center">
              <p className="text-5xl mb-6">🚀</p>
              <p className="text-xl text-text-secondary">
                Die ersten Kurse kommen bald. Trag dich in den Newsletter ein,
                um nichts zu verpassen.
              </p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
