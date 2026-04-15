import { Suspense } from "react";
import { getAllCourses } from "@/lib/course-utils";
import CourseFilters from "@/components/course/CourseFilters";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import InteractiveGrid from "@/components/ui/InteractiveGrid";
import { Star, Sparkles, Zap } from "lucide-react";

export default function Home() {
  const courses = getAllCourses();

  return (
    <>
      {/* Hero — Neo-Brutal, asymmetric */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Interactive grid — dots inflate around cursor */}
        <InteractiveGrid />

        {/* Decorative floating shapes */}
        <div className="absolute top-12 right-8 sm:right-16 w-16 h-16 bg-[var(--pop-turquoise)] border-4 border-[var(--neo-border)] rotate-12 hidden sm:block"
          style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }} />
        <div className="absolute bottom-16 left-8 sm:left-12 w-12 h-12 bg-[var(--accent)] border-4 border-[var(--neo-border)] -rotate-6 hidden sm:block"
          style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }} />
        <div className="absolute top-32 left-[15%] hidden lg:block">
          <Star className="w-8 h-8 text-[var(--neo-border)] animate-spin-slow" strokeWidth={3} />
        </div>

        <Container size="wide" className="relative">
          <div className="max-w-4xl">
            <ScrollReveal delay={0} duration={600}>
              <div className="inline-block px-4 py-2 bg-[var(--pop-turquoise)] border-4 border-[var(--neo-border)] text-black font-heading font-black text-sm uppercase tracking-widest mb-8 -rotate-2"
                style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
              >
                The Creative AI Academy
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} duration={600}>
              <h1 className="font-heading font-black tracking-tighter text-[var(--text-primary)] leading-[0.9]">
                <span className="block text-5xl sm:text-7xl lg:text-8xl">
                  AI verstehen.
                </span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl mt-2">
                  <span className="inline-block bg-[var(--accent)] text-white px-4 py-1 border-4 border-[var(--neo-border)] rotate-1"
                    style={{ boxShadow: '6px 6px 0px 0px var(--neo-shadow-color)' }}
                  >
                    Nicht nur
                  </span>
                </span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl mt-2">
                  benutzen.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200} duration={600}>
              <p className="text-lg sm:text-xl text-[var(--text-primary)] max-w-lg mt-8 mb-10 leading-relaxed font-medium">
                Interaktive Kurse zu KI, Tech und Kreativität — kostenlos,
                unabhängig und mit Liebe gemacht.
              </p>
            </ScrollReveal>

            {courses.length > 0 && (
              <ScrollReveal delay={300} duration={600}>
                <a
                  href="#kurse"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-black uppercase tracking-wide text-white bg-[var(--accent)] border-4 border-[var(--neo-border)] transition-all duration-100 hover:-translate-y-1 press-feedback"
                  style={{ boxShadow: '6px 6px 0px 0px var(--neo-shadow-color)' }}
                >
                  Kurse entdecken
                  <span className="inline-block transition-transform duration-100 group-hover:translate-y-0.5 text-xl">
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
          <Container size="wide">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-heading text-4xl sm:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tight">
                  Kurse
                </h2>
                <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest px-3 py-1 border-2 border-[var(--neo-border)] bg-[var(--surface)]">
                  {courses.length} {courses.length === 1 ? "Kurs" : "Kurse"}
                </span>
              </div>
            </ScrollReveal>
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                <div className="h-64 border-4 border-[var(--neo-border)] bg-[var(--surface)]" />
                <div className="h-64 border-4 border-[var(--neo-border)] bg-[var(--surface)]" />
              </div>
            }>
              <CourseFilters courses={courses} />
            </Suspense>
          </Container>
        </section>
      )}

      {/* What makes this different — Neo-Brutal Feature Cards */}
      <section className="py-16 sm:py-20 bg-[var(--pop-turquoise)]">
        <Container size="wide">
          <ScrollReveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-black mb-12 uppercase tracking-tight">
              Warum das hier
              <br />
              <span className="inline-block bg-black text-white px-3 py-1 -rotate-1 mt-2"
                style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}
              >
                anders ist
              </span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Kuratiert, nicht generiert", desc: "Jeder Kurs basiert auf einer echten Quelle — von Expert:innen, die wissen wovon sie reden.", rotate: "-rotate-1" },
              { icon: Zap, title: "Interaktiv, nicht passiv", desc: "Quizzes, Flashcards, Easter Eggs — Lernen, das sich anfühlt wie Entdecken.", rotate: "rotate-1" },
              { icon: Star, title: "Kostenlos, ohne Haken", desc: "Keine Paywall, kein Tracking, keine Registrierung. Einfach lernen.", rotate: "-rotate-1" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 120}>
                <div className={`group bg-white border-4 border-black p-6 transition-all duration-200 hover:-translate-y-2 ${item.rotate}`}
                  style={{ boxShadow: '8px 8px 0px 0px #000' }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 border-4 border-black bg-[#E91E8C] text-white mb-4 transition-transform duration-200 group-hover:rotate-12">
                    <item.icon className="w-7 h-7" strokeWidth={3} />
                  </div>
                  <h3 className="font-heading font-black text-lg mb-2 text-black uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black leading-relaxed font-medium">
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
              <div className="text-center border-4 border-[var(--neo-border)] bg-[var(--surface)] p-12"
                style={{ boxShadow: '8px 8px 0px 0px var(--neo-shadow-color)' }}
              >
                <p className="text-5xl mb-6">🚀</p>
                <p className="text-xl font-bold text-[var(--text-primary)] uppercase">
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
