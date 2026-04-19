import { Suspense } from "react";
import Image from "next/image";
import { getAllCourses } from "@/lib/course-utils";
import CourseFilters from "@/components/course/CourseFilters";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import InteractiveGrid from "@/components/ui/InteractiveGrid";
import Parallax from "@/components/ui/Parallax";
import WaveShape from "@/components/ui/WaveShape";
import StarShape from "@/components/ui/StarShape";
import HeroImageSpotlight from "@/components/ui/HeroImageSpotlight";
import { Star, Sparkles, Zap } from "lucide-react";
import { HEADING, HEADING_DISPLAY, LABEL } from "@/lib/typography";

export default function Home() {
  const courses = getAllCourses();

  return (
    <>
      {/* Hero — Neo-Brutal, asymmetric */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Interactive grid — dots inflate around cursor */}
        <InteractiveGrid />

        {/* Decorative shapes layer — drifts up slightly = feels closer */}
        <Parallax speed={-0.18} mobileSpeed={-0.05} className="absolute inset-0 pointer-events-none z-10">
          <WaveShape className="absolute top-12 right-8 sm:right-16 w-16 h-16 hidden sm:block rotate-12 pointer-events-auto">
            <div className="w-full h-full bg-[var(--pop-turquoise)] border-4 border-[var(--neo-border)]"
              style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }} />
          </WaveShape>
          <WaveShape className="absolute bottom-16 left-8 sm:left-12 w-12 h-12 hidden sm:block -rotate-6 pointer-events-auto">
            <div className="w-full h-full bg-[var(--accent)] border-4 border-[var(--neo-border)]"
              style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }} />
          </WaveShape>
          <StarShape className="absolute top-1/3 right-[18%] hidden lg:block pointer-events-auto" />
        </Parallax>

        {/* Content layers — image and text at different parallax speeds */}
        <Container size="wide" className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Hero image — heavy, drifts slower */}
            <Parallax speed={0.2} mobileSpeed={0.05}>
            <ScrollReveal delay={0} duration={700} direction="left">
              <div
                className="border-4 border-[var(--neo-border)] -rotate-2 overflow-hidden max-w-sm mx-auto md:max-w-none"
                style={{ boxShadow: '8px 8px 0px 0px var(--neo-shadow-color)' }}
              >
                <HeroImageSpotlight neonSrc="/hero-glowing-earrings-neon.webp">
                  <Image
                    src="/hero-glowing-earrings.jpg"
                    alt="A Girl with Glowing Earrings — KI-Kunstwerk"
                    width={600}
                    height={750}
                    className="w-full h-auto block"
                    priority
                  />
                </HeroImageSpotlight>
              </div>
            </ScrollReveal>
            </Parallax>

            {/* Right: Text content — lighter, drifts faster */}
            <Parallax speed={0.45} mobileSpeed={0.08}>
            <div>
              <ScrollReveal delay={100} duration={600}>
                <div className={`inline-block px-4 py-2 bg-[var(--pop-turquoise)] border-4 border-[var(--neo-border)] text-black text-sm ${LABEL} mb-8 -rotate-2`}
                  style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
                >
                  The Creative AI Academy
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} duration={600}>
                <h1 className={`${HEADING_DISPLAY} text-[var(--text-primary)] leading-[0.9]`}>
                  <span className="block text-4xl sm:text-5xl lg:text-7xl">
                    Lern KI
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-7xl mt-2">
                    <span className="inline-block bg-[var(--accent)] text-white px-3 py-1 border-4 border-[var(--neo-border)] rotate-1"
                      style={{ boxShadow: '6px 6px 0px 0px var(--neo-shadow-color)' }}
                    >
                      Spielerisch.
                    </span>
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={300} duration={600}>
                <p className="text-base sm:text-lg text-[var(--text-primary)] max-w-md mt-6 mb-8 leading-relaxed font-medium">
                  Kurse zu generativer KI von Julian van Dieken. Für Normalsterbliche, Enthusiasten und Voll-Profis. Kostenlos.
                </p>
              </ScrollReveal>

              {courses.length > 0 && (
                <ScrollReveal delay={400} duration={600}>
                  <a
                    href="#kurse"
                    className="group inline-flex items-center gap-3 px-7 py-3.5 text-base font-black uppercase tracking-wide text-white bg-[var(--accent)] border-4 border-[var(--neo-border)] transition-all duration-100 hover:-translate-y-1 press-feedback"
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
            </Parallax>
          </div>
        </Container>
        {/* Subtle Konami hint — only hoverable on desktop since it requires a keyboard */}
        <div
          className="hidden sm:block absolute bottom-3 right-4 sm:right-6 text-[10px] font-mono tracking-[0.3em] text-[var(--text-primary)] opacity-10 hover:opacity-60 transition-opacity duration-300 select-none pointer-events-auto z-20"
          aria-hidden="true"
          title="Wenn du wüsstest..."
        >
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[var(--neo-border)]" />
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section id="kurse" className="py-16 sm:py-20">
          <Container size="wide">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <h2 className={`${HEADING} text-4xl sm:text-5xl text-[var(--text-primary)]`}>
                  Kurse
                </h2>
                <span className={`text-sm ${LABEL} text-[var(--text-primary)] px-3 py-1 border-2 border-[var(--neo-border)] bg-[var(--surface)]`}>
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
            <h2 className={`${HEADING} text-4xl sm:text-5xl text-black mb-12`}>
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
