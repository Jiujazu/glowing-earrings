"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { Course } from "@/lib/types";
import { getDifficultyLabel } from "@/lib/course-utils";
import CourseCard from "./CourseCard";
import { LABEL } from "@/lib/typography";

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
/*  FilterDropdown — compact select for meta filters   */
/* -------------------------------------------------- */

interface FilterDropdownProps<T extends string> {
  label: string;
  icon: React.ReactNode;
  value: T | null;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T | null) => void;
}

function FilterDropdown<T extends string>({
  label,
  icon,
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
        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wide border-4 transition-all duration-100 press-feedback ${
          value
            ? "text-white bg-[var(--accent)] border-[var(--neo-border)]"
            : "text-[var(--text-primary)] bg-[var(--surface)] border-[var(--neo-border)] hover:bg-[var(--pop-turquoise)]"
        }`}
        style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }}
      >
        {icon}
        <span>{activeOption ? activeOption.label : label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-100 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full mt-2 min-w-[180px] bg-[var(--surface)] border-4 border-[var(--neo-border)] z-20 py-1 animate-fade-in"
          style={{ boxShadow: '6px 6px 0px 0px var(--neo-shadow-color)' }}
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
              className={`w-full text-left px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-100 flex items-center justify-between gap-4 ${
                value === option.value
                  ? "text-white bg-[var(--accent)]"
                  : "text-[var(--text-primary)] hover:bg-[var(--pop-turquoise)]"
              }`}
            >
              <span>{option.label}</span>
              {option.hint && (
                <span className="text-xs font-bold opacity-60">
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
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<DurationFilter | null>(
    null
  );

  useEffect(() => {
    const tagFromUrl = searchParams.get("tag");
    if (tagFromUrl) setActiveTags(new Set([tagFromUrl]));
  }, [searchParams]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

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
      // Tags: AND logic — course must have ALL selected tags
      if (activeTags.size > 0 && ![...activeTags].every((t) => c.meta.tags.includes(t)))
        return false;
      if (activeDifficulty && c.meta.difficulty !== activeDifficulty)
        return false;
      if (
        activeDuration &&
        getDurationCategory(c.meta.estimatedMinutes) !== activeDuration
      )
        return false;
      return true;
    });
  }, [courses, activeTags, activeDifficulty, activeDuration]);

  const hasFilters = activeTags.size > 0 || activeDifficulty || activeDuration;

  function clearFilters() {
    setActiveTags(new Set());
    setActiveDifficulty(null);
    setActiveDuration(null);
  }

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
          <p className={`text-xs ${LABEL} text-[var(--text-primary)] mb-2`}>
            Themen
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-4 border-[var(--neo-border)] transition-all duration-100 press-feedback ${
                  activeTags.has(tag)
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--pop-turquoise)]"
                }`}
                style={{ boxShadow: '3px 3px 0px 0px var(--neo-shadow-color)' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Schwierigkeit + Dauer Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown
            label="Schwierigkeit"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
            value={activeDifficulty}
            options={difficultyOptions}
            onChange={setActiveDifficulty}
          />
          <FilterDropdown
            label="Dauer"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            value={activeDuration}
            options={durationOptions}
            onChange={setActiveDuration}
          />
        </div>

        {/* Active filter summary */}
        {hasFilters && (
          <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-primary)]">
            <span>
              {filtered.length} {filtered.length === 1 ? "Kurs" : "Kurse"}
            </span>
            <button
              onClick={clearFilters}
              className="text-[var(--accent)] uppercase tracking-wide text-xs font-black hover:underline decoration-4"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Course grid */}
      {showGrid &&
        (filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((course) => (
              <CourseCard
                key={course.meta.slug}
                meta={course.meta}
                totalModules={course.modules.length}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-4 border-[var(--neo-border)] bg-[var(--surface)]"
            style={{ boxShadow: '8px 8px 0px 0px var(--neo-shadow-color)' }}
          >
            <p className="text-lg font-bold text-[var(--text-primary)] mb-3 uppercase">
              Keine Kurse für diese Filter.
            </p>
            <button
              onClick={clearFilters}
              className="text-sm font-black text-[var(--accent)] uppercase tracking-wide hover:underline decoration-4"
            >
              Alle Kurse anzeigen
            </button>
          </div>
        ))}
    </div>
  );
}
