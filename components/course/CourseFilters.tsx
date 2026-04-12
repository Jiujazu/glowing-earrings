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
      <div className="space-y-3 mb-8">
        {/* Category filter */}
        {usedCategories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {usedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        )}

        {/* Difficulty tabs */}
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeDifficulty === diff
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
              }`}
            >
              {getDifficultyLabel(diff)}
            </button>
          ))}

          <span className="w-px h-6 bg-[var(--border)] self-center mx-1" />

          {/* Tag pills */}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeTag === tag
                  ? "bg-[var(--pop-turquoise)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--pop-turquoise)]/40 hover:text-[var(--pop-turquoise)]"
              }`}
            >
              {tag}
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
