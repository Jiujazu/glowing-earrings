const STORAGE_KEY = "ge-course-progress";

export interface CourseProgress {
  visitedModules: string[];
  completedQuizzes: string[];
  lastVisitedAt: string;
  scrollPosition?: number;
}

type ProgressMap = Record<string, CourseProgress>;

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data: ProgressMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function getCourseProgress(slug: string): CourseProgress | null {
  const all = readAll();
  return all[slug] ?? null;
}

export function markModuleVisited(slug: string, moduleId: string) {
  const all = readAll();
  const progress = all[slug] ?? {
    visitedModules: [],
    completedQuizzes: [],
    lastVisitedAt: new Date().toISOString(),
  };

  if (!progress.visitedModules.includes(moduleId)) {
    progress.visitedModules.push(moduleId);
  }
  progress.lastVisitedAt = new Date().toISOString();
  all[slug] = progress;
  writeAll(all);
}

export function markQuizCompleted(slug: string, quizId: string) {
  const all = readAll();
  const progress = all[slug] ?? {
    visitedModules: [],
    completedQuizzes: [],
    lastVisitedAt: new Date().toISOString(),
  };

  if (!progress.completedQuizzes.includes(quizId)) {
    progress.completedQuizzes.push(quizId);
  }
  progress.lastVisitedAt = new Date().toISOString();
  all[slug] = progress;
  writeAll(all);
}

export function saveScrollPosition(slug: string, position: number) {
  const all = readAll();
  const progress = all[slug];
  if (progress) {
    progress.scrollPosition = position;
    all[slug] = progress;
    writeAll(all);
  }
}

export function getCompletionPercent(slug: string, totalModules: number): number {
  const progress = getCourseProgress(slug);
  if (!progress || totalModules === 0) return 0;
  return Math.round((progress.visitedModules.length / totalModules) * 100);
}

export function getAllProgress(): ProgressMap {
  return readAll();
}
