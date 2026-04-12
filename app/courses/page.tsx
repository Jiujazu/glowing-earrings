import type { Metadata } from "next";
import { getAllCourses } from "@/lib/course-utils";
import CourseFilters from "@/components/course/CourseFilters";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Kurse",
  description:
    "Alle interaktiven Kurse zu KI, Tech und Kreativität auf Glowing Earrings.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Kurse
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          Interaktive Kurse auf Basis von echten Quellen — Tweets, Talks, Artikeln.
        </p>

        {courses.length > 0 ? (
          <CourseFilters courses={courses} />
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-lg text-text-secondary">
              Die ersten Kurse werden gerade erstellt. Schau bald wieder vorbei!
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
