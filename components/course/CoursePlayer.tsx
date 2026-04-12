import type { Course } from "@/lib/types";
import CourseThemeProvider from "./CourseThemeProvider";
import CourseIntro from "./CourseIntro";
import ModuleRenderer from "./ModuleRenderer";
import CourseOutro from "./CourseOutro";
import CourseProgress from "./CourseProgress";
import CourseNav from "./CourseNav";
import CourseParallax from "./CourseParallax";
import CourseErrorBoundary from "./CourseErrorBoundary";

interface CoursePlayerProps {
  course: Course;
}

export default function CoursePlayer({ course }: CoursePlayerProps) {
  return (
    <CourseThemeProvider design={course.meta.design}>
      <CourseProgress />
      <CourseParallax />

      <article className="relative z-10">
        <CourseIntro intro={course.intro} meta={course.meta} />

        <div className="max-w-3xl mx-auto px-4 pt-8 pb-2">
          <p className="text-sm font-medium text-[var(--course-text-muted)] uppercase tracking-wide">
            Kapitel
          </p>
        </div>

        <CourseNav modules={course.modules} />

        <CourseErrorBoundary>
          <div className="border-t border-[var(--course-text)]/10">
            {course.modules.map((module) => (
              <ModuleRenderer key={module.id} module={module} />
            ))}
          </div>

          <div className="border-t border-[var(--course-text)]/10">
            <CourseOutro outro={course.outro} courseSlug={course.meta.slug} />
          </div>
        </CourseErrorBoundary>
      </article>
    </CourseThemeProvider>
  );
}
