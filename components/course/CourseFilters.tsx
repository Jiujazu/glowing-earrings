"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
const durationHints: Record<DurationFilter, string> = {
  kurz: "< 10 Min",
  mittel: "10–20 Min",
  lang: "> 20 Min",
};

function getDurationCategory(minutes: number): DurationFilter {
  if (minutes <= 10) return "kurz";
  if (minutes <= 20) return "mittel";
  return "lang";
}

/* -------------------------------------------------- */
/*  FilterDropdown — reusable for Schwierigkeit/Dauer  */
/* -------------------------------------------------- */

interface FilterDropdownProps<T extends string> {
  label: string;
  value: T | null;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T | null) => void;
}

function FilterDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const activeOption = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${
          value
            ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
            : "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--accent)]/50"
        }`}
      >
        <span>{activeOption ? activeOption.label : label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""} ${value ? "text-white/70" : "text-[var(--text-muted)]"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full mt-1 min-w-[180px] bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-20 py-1 animate-fade-in"
        >
          {options.map((option) => (
            <button
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(value === option.value ? null : option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between gap-4 ${
                value === option.value
                  ? "text-[var(--accent)] font-medium bg-[var(--surface-tinted)]"
                  : "text-[var(--text-primary)] hover:bg-[var(--surface-tinted)]"
              }`}
            >
              <span>{option.label}</span>
              {option.hint && (
                <span className="text-xs text-[var(--text-muted)]">
                  {option.hint}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------- */
/*  Main Component                                     */
/* -------------------------------------------------- */

export default function CourseFilters({
  courses,
  showGrid = true,
}: CourseFiltersProps) {
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<DurationFilter | null>(
    null
  );

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
      if (activeDifficulty && c.meta.difficulty !== activeDifficulty)
        return false;
      if (
        activeDuration &&
        getDurationCategory(c.meta.estimatedMinutes) !== activeDuration
      )
        return false;
      return true;
    });
  }, [courses, activeTag, activeDifficulty, activeDuration]);

  const hasFilters = activeTag || activeDifficulty || activeDuration;

  function clearFilters() {
    setActiveTag(null);
    setActiveDifficulty(null);
    setActiveDuration(null);
  }

  const tagButton =
    "px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200";
  const tagInactive =
    "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)]";

  const difficultyOptions = difficulties.map((d) => ({
    value: d as string,
    label: getDifficultyLabel(d),
  }));

  const durationOptions = (
    Object.keys(durationLabels) as DurationFilter[]
  ).map((d) => ({
    value: d,
    label: durationLabels[d],
    hint: durationHints[d],
  }));

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Themen-Tags */}
        <div>
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide mb-2">
            Themen
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`${tagButton} ${
                  activeTag === tag
                    ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
                    : tagInactive
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Schwierigkeit + Dauer Dropdowns */}
        <div className="flex flex-wrap items-start gap-3">
          <FilterDropdown
            label="Schwierigkeit"
            value={activeDifficulty}
            options={difficultyOptions}
            onChange={setActiveDifficulty}
          />
          <FilterDropdown
            label="Dauer"
            value={activeDuration}
            options={durationOptions}
            onChange={setActiveDuration}
          />
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
      {showGrid &&
        (filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((course) => (
              <CourseCard
                key={course.meta.slug}
                meta={course.meta}
                totalModules={course.modules.length}
              />
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
        ))}
    </div>
  );
}
