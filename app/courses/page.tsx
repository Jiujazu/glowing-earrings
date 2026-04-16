import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllCourses } from "@/lib/course-utils";
import CourseFilters from "@/components/course/CourseFilters";
import Container from "@/components/ui/Container";
import { HEADING } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Kurse",
  description:
    "Alle interaktiven Kurse zu KI, Tech und Kreativität auf Glowing Earrings.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <h1 className={`${HEADING} text-4xl sm:text-5xl text-[var(--text-primary)] mb-2`}>
          Kurse
        </h1>
        <p className="text-lg font-medium text-[var(--text-primary)] mb-8">
          Interaktive Kurse auf Basis von echten Quellen — Tweets, Talks, Artikeln.
        </p>

        {courses.length > 0 ? (
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
              <div className="h-64 border-4 border-[var(--neo-border)] bg-[var(--surface)]" />
              <div className="h-64 border-4 border-[var(--neo-border)] bg-[var(--surface)]" />
            </div>
          }>
            <CourseFilters courses={courses} />
          </Suspense>
        ) : (
          <div className="text-center py-16 border-4 border-[var(--neo-border)] bg-[var(--surface)]"
            style={{ boxShadow: '8px 8px 0px 0px var(--neo-shadow-color)' }}
          >
            <p className="text-4xl mb-4">📚</p>
            <p className="text-lg font-bold text-[var(--text-primary)] uppercase">
              Die ersten Kurse werden gerade erstellt. Schau bald wieder vorbei!
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
