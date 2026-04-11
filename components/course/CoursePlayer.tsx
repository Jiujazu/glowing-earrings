import type { Course } from "@/lib/types";
import CourseThemeProvider from "./CourseThemeProvider";
import CourseIntro from "./CourseIntro";
import ModuleRenderer from "./ModuleRenderer";
import CourseOutro from "./CourseOutro";
import CourseProgress from "./CourseProgress";
import CourseNav from "./CourseNav";

interface CoursePlayerProps {
  course: Course;
}

export default function CoursePlayer({ course }: CoursePlayerProps) {
  return (
    <CourseThemeProvider design={course.meta.design}>
      <CourseProgress />

      <article>
        <CourseIntro intro={course.intro} meta={course.meta} />

        <CourseNav modules={course.modules} />

        <div className="border-t border-[var(--course-text)]/10">
          {course.modules.map((module) => (
            <ModuleRenderer key={module.id} module={module} />
          ))}
        </div>

        <div className="border-t border-[var(--course-text)]/10">
          <CourseOutro outro={course.outro} courseSlug={course.meta.slug} />
        </div>
      </article>
    </CourseThemeProvider>
  );
}
