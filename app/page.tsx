import { getAllCourses } from "@/lib/course-utils";
import CourseCard from "@/components/course/CourseCard";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Container from "@/components/ui/Container";

export default function Home() {
  const courses = getAllCourses();

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <div className="text-center">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              The Creative AI Academy
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
              AI verstehen.{" "}
              <span className="text-accent">Nicht nur benutzen.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-8">
              Interaktive Kurse zu KI, Tech und Kreativität — kostenlos,
              unabhängig und mit Liebe gemacht. Kuratiert von Julian van Dieken.
            </p>
            {courses.length > 0 && (
              <a
                href="#kurse"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
              >
                Kurse entdecken ↓
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section id="kurse" className="py-12 sm:py-16">
          <Container>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-8">
              Kurse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.meta.slug} meta={course.meta} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* What makes this different */}
      <section className="py-12 sm:py-16 bg-surface">
        <Container size="narrow">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-6 text-center">
            Warum das hier anders ist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl mb-2">🎯</p>
              <h3 className="font-heading font-bold text-base mb-1">Kuratiert, nicht generiert</h3>
              <p className="text-sm text-text-secondary">
                Jeder Kurs basiert auf einer echten Quelle — von Experten, die wissen wovon sie reden.
              </p>
            </div>
            <div>
              <p className="text-3xl mb-2">🎮</p>
              <h3 className="font-heading font-bold text-base mb-1">Interaktiv, nicht passiv</h3>
              <p className="text-sm text-text-secondary">
                Quizzes, Flashcards, Easter Eggs — Lernen, das sich anfühlt wie Entdecken.
              </p>
            </div>
            <div>
              <p className="text-3xl mb-2">🔓</p>
              <h3 className="font-heading font-bold text-base mb-1">Kostenlos, ohne Haken</h3>
              <p className="text-sm text-text-secondary">
                Keine Paywall, kein Tracking, keine Registrierung. Einfach lernen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <NewsletterCTA variant="featured" source="landing" />
        </Container>
      </section>

      {/* Empty state */}
      {courses.length === 0 && (
        <section className="py-16">
          <Container size="narrow">
            <div className="text-center">
              <p className="text-4xl mb-4">🚀</p>
              <p className="text-lg text-text-secondary">
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
