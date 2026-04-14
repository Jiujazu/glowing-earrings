import type { Course } from "@/lib/types";
import CourseThemeProvider from "./CourseThemeProvider";
import CourseIntro from "./CourseIntro";
import CourseTOC from "./CourseTOC";
import ModuleRenderer from "./ModuleRenderer";
import CourseOutro from "./CourseOutro";
import CourseProgress from "./CourseProgress";
import CourseParallax from "./CourseParallax";
import CourseErrorBoundary from "./CourseErrorBoundary";
import CourseProgressTracker from "./CourseProgressTracker";
import ScrollToTop from "./ScrollToTop";
import EditModeWrapper from "@/components/editor/EditModeWrapper";
import ModuleManager from "@/components/editor/ModuleManager";

interface CoursePlayerProps {
  course: Course;
}

export default function CoursePlayer({ course }: CoursePlayerProps) {
  return (
    <CourseThemeProvider design={course.meta.design}>
      <CourseProgressTracker slug={course.meta.slug}>
      <EditModeWrapper courseSlug={course.meta.slug}>
      <CourseProgress />
      <CourseParallax />

      <article className="relative z-10">
        <CourseIntro intro={course.intro} meta={course.meta} />
        <CourseTOC modules={course.modules} />

        <CourseErrorBoundary>
          <div>
            <ModuleManager modules={course.modules}>
              {(modules, index, allModules) => (
                <ModuleRenderer module={modules[index]} index={index} allModules={allModules} />
              )}
            </ModuleManager>
          </div>

          <div className="border-t border-[var(--course-text)]/10">
            <CourseOutro outro={course.outro} courseSlug={course.meta.slug} relatedSlugs={course.meta.relatedCourses} />
          </div>
        </CourseErrorBoundary>
      </article>
      <ScrollToTop modules={course.modules} />
      </EditModeWrapper>
      </CourseProgressTracker>
    </CourseThemeProvider>
  );
}
