"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Course } from "@/lib/types";
import { getDifficultyLabel } from "@/lib/course-utils";
import CourseCard from "./CourseCard";

interface CourseFiltersProps {
  courses: Course[];
  showGrid?: boolean;
}

const difficulties = ["beginner", "intermediate", "advanced"] as const;

type DurationFilter = "kurz" | "mittel" | "lang";
const durationLabels: Record<DurationFilter, string> = {
  kurz: "Kurz",
  mittel: "Mittel",
  lang: "Lang",
};

function getDurationCategory(minutes: number): DurationFilter {
  if (minutes <= 10) return "kurz";
  if (minutes <= 20) return "mittel";
  return "lang";
}

function getDurationHint(filter: DurationFilter): string {
  if (filter === "kurz") return "< 10 Min";
  if (filter === "mittel") return "10–20 Min";
  return "> 20 Min";
}

export default function CourseFilters({ courses, showGrid = true }: CourseFiltersProps) {
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<DurationFilter | null>(null);

  useEffect(() => {
    const tagFromUrl = searchParams.get("tag");
    if (tagFromUrl) setActiveTag(tagFromUrl);
  }, [searchParams]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const course of courses) {
      for (const tag of course.meta.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (activeTag && !c.meta.tags.includes(activeTag)) return false;
      if (activeDifficulty && c.meta.difficulty !== activeDifficulty) return false;
      if (activeDuration && getDurationCategory(c.meta.estimatedMinutes) !== activeDuration) return false;
      return true;
    });
  }, [courses, activeTag, activeDifficulty, activeDuration]);

  const hasFilters = activeTag || activeDifficulty || activeDuration;

  function clearFilters() {
    setActiveTag(null);
    setActiveDifficulty(null);
    setActiveDuration(null);
  }

  const buttonBase = "px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200";
  const buttonInactive = "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)]";

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-3">
        {/* Row 1: Thema */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`${buttonBase} ${
                activeTag === tag
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
                  : `${buttonInactive} hover:border-[var(--accent)] hover:text-[var(--accent)]`
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Row 2: Schwierigkeit + Länge */}
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
              className={`${buttonBase} ${
                activeDifficulty === diff
                  ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-sm"
                  : `${buttonInactive} hover:border-[var(--brand)] hover:text-[var(--brand)]`
              }`}
            >
              {getDifficultyLabel(diff)}
            </button>
          ))}

          <span className="w-px h-8 bg-[var(--border)] self-center mx-1 hidden sm:block" />

          {(Object.keys(durationLabels) as DurationFilter[]).map((dur) => (
            <button
              key={dur}
              onClick={() => setActiveDuration(activeDuration === dur ? null : dur)}
              className={`${buttonBase} ${
                activeDuration === dur
                  ? "bg-[var(--pop-turquoise)] text-white border-[var(--pop-turquoise)] shadow-sm"
                  : `${buttonInactive} hover:border-[var(--pop-turquoise)] hover:text-[var(--pop-turquoise)]`
              }`}
            >
              {durationLabels[dur]}
              <span className="text-xs ml-1 opacity-60">{getDurationHint(dur)}</span>
            </button>
          ))}
        </div>

        {/* Active filter summary */}
        {hasFilters && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span>
              {filtered.length} {filtered.length === 1 ? "Kurs" : "Kurse"}
            </span>
            <button
              onClick={clearFilters}
              className="text-[var(--accent)] hover:underline"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>

      {/* Course grid */}
      {showGrid && (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.meta.slug} meta={course.meta} totalModules={course.modules.length} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-[var(--text-secondary)] mb-3">
              Keine Kurse für diese Filter.
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              Alle Kurse anzeigen
            </button>
          </div>
        )
      )}
    </div>
  );
}
