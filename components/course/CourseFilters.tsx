"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Course, CourseCategory } from "@/lib/types";
import { getDifficultyLabel, categoryLabels } from "@/lib/course-utils";
import CourseCard from "./CourseCard";

interface CourseFiltersProps {
  courses: Course[];
}

const difficulties = ["beginner", "intermediate", "advanced"] as const;

export default function CourseFilters({ courses }: CourseFiltersProps) {
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Read tag from URL on mount (e.g. /courses?tag=Claude)
  useEffect(() => {
    const tagFromUrl = searchParams.get("tag");
    if (tagFromUrl) setActiveTag(tagFromUrl);
  }, [searchParams]);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CourseCategory | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const course of courses) {
      for (const tag of course.meta.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }, [courses]);

  const usedCategories = useMemo(() => {
    const cats = new Set<CourseCategory>();
    for (const course of courses) {
      cats.add(course.meta.category);
    }
    return Array.from(cats);
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (activeTag && !c.meta.tags.includes(activeTag)) return false;
      if (activeDifficulty && c.meta.difficulty !== activeDifficulty) return false;
      if (activeCategory && c.meta.category !== activeCategory) return false;
      return true;
    });
  }, [courses, activeTag, activeDifficulty, activeCategory]);

  const hasFilters = activeTag || activeDifficulty || activeCategory;

  function clearFilters() {
    setActiveTag(null);
    setActiveDifficulty(null);
    setActiveCategory(null);
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 mb-8 space-y-4">
        {/* Row 1: Category + Difficulty inline */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {usedCategories.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide whitespace-nowrap">Kategorie</span>
              <div className="flex gap-1.5">
                {usedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-[var(--accent)] text-white shadow-sm"
                        : "text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5"
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide whitespace-nowrap">Level</span>
            <div className="flex gap-1">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                    activeDifficulty === diff
                      ? "bg-[var(--brand)] text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--brand)] hover:bg-[var(--brand)]/5"
                  }`}
                >
                  {getDifficultyLabel(diff)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Tags as small pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide mr-1">Themen</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full transition-all duration-200 ${
                activeTag === tag
                  ? "bg-[var(--pop-turquoise)] text-white"
                  : "text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--pop-turquoise)]/40 hover:text-[var(--pop-turquoise)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Active filter summary */}
        {hasFilters && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border)]">
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
      {filtered.length > 0 ? (
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
      )}
    </div>
  );
}
