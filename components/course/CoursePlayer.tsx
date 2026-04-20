import type { Course } from "@/lib/types";
import CourseThemeProvider from "./CourseThemeProvider";
import CourseIntro from "./CourseIntro";
import CourseTOC from "./CourseTOC";
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
  allTags?: string[];
}

export default function CoursePlayer({ course, allTags = [] }: CoursePlayerProps) {
  return (
    <CourseThemeProvider design={course.meta.design}>
      <CourseProgressTracker slug={course.meta.slug}>
      <EditModeWrapper courseSlug={course.meta.slug}>
      <CourseProgress />
      <CourseParallax />

      <article className="relative z-10">
        <CourseIntro intro={course.intro} meta={course.meta} allTags={allTags} />
        <CourseTOC modules={course.modules} />

        <CourseErrorBoundary>
          <div>
            <ModuleManager modules={course.modules} />
          </div>

          <div className="border-t-4 border-[var(--course-text)]/10">
            <CourseOutro outro={course.outro} courseSlug={course.meta.slug} sources={course.meta.sources} relatedSlugs={course.meta.relatedCourses} />
          </div>
        </CourseErrorBoundary>
      </article>
      <ScrollToTop modules={course.modules} />
      </EditModeWrapper>
      </CourseProgressTracker>
    </CourseThemeProvider>
  );
}
