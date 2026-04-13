import type { Course } from "@/lib/types";
import CourseThemeProvider from "./CourseThemeProvider";
import CourseIntro from "./CourseIntro";
import ModuleRenderer from "./ModuleRenderer";
import CourseOutro from "./CourseOutro";
import CourseProgress from "./CourseProgress";
import CourseParallax from "./CourseParallax";
import CourseErrorBoundary from "./CourseErrorBoundary";
import CourseProgressTracker from "./CourseProgressTracker";
import ScrollToTop from "./ScrollToTop";

interface CoursePlayerProps {
  course: Course;
}

export default function CoursePlayer({ course }: CoursePlayerProps) {
  return (
    <CourseThemeProvider design={course.meta.design}>
      <CourseProgressTracker slug={course.meta.slug}>
      <CourseProgress />
      <CourseParallax />

      <article className="relative z-10">
        <CourseIntro intro={course.intro} meta={course.meta} />

        <CourseErrorBoundary>
          <div>
            {course.modules.map((module, index) => (
              <ModuleRenderer key={module.id} module={module} index={index} allModules={course.modules} />
            ))}
          </div>

          <div className="border-t border-[var(--course-text)]/10">
            <CourseOutro outro={course.outro} courseSlug={course.meta.slug} relatedSlugs={course.meta.relatedCourses} />
          </div>
        </CourseErrorBoundary>
      </article>
      <ScrollToTop modules={course.modules} />
      </CourseProgressTracker>
    </CourseThemeProvider>
  );
}
