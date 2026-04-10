import Link from "next/link";
import type { CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel, getSourceTypeLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";

export default function CourseCard({ meta }: { meta: CourseMeta }) {
  return (
    <Link
      href={`/courses/${meta.slug}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:-translate-y-1"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: meta.design.colors.primary,
      }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant="accent">{getSourceTypeLabel(meta.sourceType)}</Badge>
        <Badge variant="brand">{getDifficultyLabel(meta.difficulty)}</Badge>
        {meta.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="muted">{tag}</Badge>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
        {meta.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
        {meta.subtitle}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span>{formatDuration(meta.estimatedMinutes)}</span>
        <span>·</span>
        <span>{meta.sourceAuthor}</span>
      </div>
    </Link>
  );
}
