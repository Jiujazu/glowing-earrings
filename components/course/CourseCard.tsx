import Link from "next/link";
import type { CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import CourseCardProgress from "./CourseCardProgress";

export default function CourseCard({ meta, totalModules }: { meta: CourseMeta; totalModules?: number }) {
  return (
    <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[var(--accent)]/10">
      {/* Color bar top */}
      <div
        className="h-2"
        style={{ backgroundColor: meta.design.colors.primary }}
      />

      <div className="p-6 bg-[var(--surface)] border border-[var(--border)] border-t-0 rounded-b-2xl">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="brand">{getDifficultyLabel(meta.difficulty)}</Badge>
          {meta.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/courses?tag=${encodeURIComponent(tag)}`}
              className="hover:scale-105 transition-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <Badge variant="muted">{tag}</Badge>
            </Link>
          ))}
        </div>

        <Link
          href={`/courses/${meta.slug}`}
          className="group block"
        >
          <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
            {meta.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
            {meta.subtitle}
          </p>
        </Link>

        {totalModules && (
          <div className="mb-3">
            <CourseCardProgress slug={meta.slug} totalModules={totalModules} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>{formatDuration(meta.estimatedMinutes)}</span>
            <span>·</span>
            <span>{meta.sourceAuthor}</span>
          </div>
          <Link
            href={`/courses/${meta.slug}`}
            className="text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Kurs starten →
          </Link>
        </div>
      </div>
    </div>
  );
}
