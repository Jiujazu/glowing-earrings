import { courses } from "@/content/courses";
import type { Course, CourseCategory, CourseSourceType } from "./types";

export function getAllCourses(): Course[] {
  return courses.filter((c) => !c.meta.draft);
}

export function getAllCoursesIncludingDrafts(): Course[] {
  return courses;
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const course of courses) {
    if (course.meta.draft) continue;
    for (const tag of course.meta.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export const categoryLabels: Record<CourseCategory, string> = {
  "ai-tech": "KI-Technologie & Tools",
  "ai-creativity": "KI + Kreativität",
  "ai-society": "KI + Gesellschaft",
  "ai-workflows": "KI-Workflows & Productivity",
};

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

export function getSourceTypeLabel(sourceType: CourseSourceType): string {
  const labels: Record<CourseSourceType, string> = {
    tweet: "Tweet",
    video: "Video",
    article: "Artikel",
    document: "Dokument",
    gist: "Gist",
    tool: "Tool",
    other: "Quelle",
  };
  return labels[sourceType];
}

export function getSourceLinkLabel(
  sourceType: CourseSourceType,
  sourceUrl: string
): string {
  switch (sourceType) {
    case "gist":
      return "Zum GitHub-Gist";
    case "video":
      if (/youtu\.?be/i.test(sourceUrl)) return "Zum YouTube-Video";
      if (/vimeo/i.test(sourceUrl)) return "Zum Vimeo-Video";
      return "Zum Video";
    case "article":
      return "Zum Artikel";
    case "document":
      return "Zum Dokument";
    case "tool":
      return "Zur Website";
    case "tweet":
      return "Zum Tweet";
    default:
      return "Zum Original";
  }
}
