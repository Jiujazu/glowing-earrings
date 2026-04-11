import { courses } from "@/content/courses";
import type { Course, CourseMeta } from "./types";

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.meta.slug === slug);
}

export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.meta.slug);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `~${minutes} Min.`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `~${hours} Std.`;
  return `~${hours} Std. ${remaining} Min.`;
}

export function getDifficultyLabel(
  difficulty: "beginner" | "intermediate" | "advanced"
): string {
  const labels = {
    beginner: "Einsteiger",
    intermediate: "Fortgeschritten",
    advanced: "Experte",
  };
  return labels[difficulty];
}

export function getSourceTypeLabel(
  sourceType: CourseMeta["sourceType"]
): string {
  const labels: Record<CourseMeta["sourceType"], string> = {
    tweet: "Tweet",
    video: "Video",
    article: "Artikel",
    document: "Dokument",
    gist: "Gist",
    other: "Quelle",
  };
  return labels[sourceType];
}
