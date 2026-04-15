import Link from "next/link";
import Image from "next/image";
import type { CourseMeta } from "@/lib/types";
import { formatDuration, getDifficultyLabel } from "@/lib/course-utils";
import Badge from "@/components/ui/Badge";
import CourseCardProgress from "./CourseCardProgress";

export default function CourseCard({ meta, totalModules }: { meta: CourseMeta; totalModules?: number }) {
  return (
    <div
      className="group relative overflow-hidden bg-[var(--surface)] border-4 border-[var(--neo-border)] transition-all duration-200 hover:-translate-y-2"
      style={{
        boxShadow: '8px 8px 0px 0px var(--neo-shadow-color)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '12px 12px 0px 0px var(--neo-shadow-color)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '8px 8px 0px 0px var(--neo-shadow-color)';
      }}
    >
      {/* Cover image or color bar */}
      {meta.coverImage ? (
        <Link href={`/courses/${meta.slug}`} className="block relative h-40 overflow-hidden border-b-4 border-[var(--neo-border)]">
          <Image
            src={meta.coverImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Link>
      ) : (
        <div
          className="h-3 border-b-4 border-[var(--neo-border)]"
          style={{ backgroundColor: meta.design.colors.primary }}
        />
      )}

      <div className="p-6">
        <Link
          href={`/courses/${meta.slug}`}
          className="group block mb-4"
        >
          <h3 className="font-heading text-2xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-100 leading-tight uppercase">
            {meta.title}
          </h3>
          {meta.subheading && (
            <p className="text-base text-[var(--text-primary)] mt-1 font-bold">
              {meta.subheading}
            </p>
          )}
        </Link>

        <p className="text-sm text-[var(--text-primary)] mb-4 leading-relaxed">
          {meta.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="brand">{getDifficultyLabel(meta.difficulty)}</Badge>
          {meta.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/courses?tag=${encodeURIComponent(tag)}`}
              className="hover:-translate-y-0.5 transition-transform duration-100"
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

        <div className="flex items-center justify-between pt-3 border-t-2 border-[var(--neo-border)]">
          <div className="flex items-center gap-3 text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
            <span>{formatDuration(meta.estimatedMinutes)}</span>
            <span>·</span>
            <span>{meta.sourceAuthor}</span>
          </div>
          <Link
            href={`/courses/${meta.slug}`}
            className="text-xs font-black uppercase tracking-wide text-[var(--accent)] sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
          >
            Starten →
          </Link>
        </div>
      </div>
    </div>
  );
}
