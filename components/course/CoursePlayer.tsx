import type { Course } from "@/lib/types";
import CourseThemeProvider from "./CourseThemeProvider";
import CourseIntro from "./CourseIntro";
import ModuleRenderer from "./ModuleRenderer";
import CourseOutro from "./CourseOutro";
import CourseProgress from "./CourseProgress";
import CourseNav from "./CourseNav";
import CourseParallax from "./CourseParallax";

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

        <CourseNav modules={course.modules} />

        <div className="border-t border-[var(--course-text)]/10">
          {course.modules.map((module, i) => (
            <ModuleRenderer key={module.id} module={module} moduleIndex={i} />
          ))}
        </div>

        <div className="border-t border-[var(--course-text)]/10">
          <CourseOutro outro={course.outro} courseSlug={course.meta.slug} />
        </div>
      </article>
    </CourseThemeProvider>
  );
}
