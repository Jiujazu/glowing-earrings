import Link from "next/link";
import Image from "next/image";
import type { CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import CourseCardProgress from "./CourseCardProgress";

export default function CourseCard({ meta, totalModules }: { meta: CourseMeta; totalModules?: number }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[var(--accent)]/10">
      {/* Cover image or color bar */}
      {meta.coverImage ? (
        <Link href={`/courses/${meta.slug}`} className="block relative h-40 overflow-hidden">
          <Image
            src={meta.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
        </Link>
      ) : (
        <div
          className="h-2"
          style={{ backgroundColor: meta.design.colors.primary }}
        />
      )}

      <div className={`p-6 bg-[var(--surface)] border border-[var(--border)] rounded-b-2xl ${meta.coverImage ? 'border-t-0' : 'border-t-0'}`}>
        <Link
          href={`/courses/${meta.slug}`}
          className="group block mb-4"
        >
          <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
            {meta.title}
          </h3>
          {meta.subheading && (
            <p className="text-base text-[var(--text-secondary)] mt-1 font-medium">
              {meta.subheading}
            </p>
          )}
        </Link>

        <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
          {meta.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="brand">{getDifficultyLabel(meta.difficulty)}</Badge>
          {meta.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/courses?tag=${encodeURIComponent(tag)}`}
              className="hover:scale-105 transition-transform"
            >
              <Badge variant="muted">{tag}</Badge>
            </Link>
          ))}
        </div>

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
            className="text-xs font-medium text-[var(--accent)] sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
          >
            Kurs starten →
          </Link>
        </div>
      </div>
    </div>
  );
}
