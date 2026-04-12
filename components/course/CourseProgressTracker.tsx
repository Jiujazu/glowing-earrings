"use client";

import { createContext, useContext, useEffect, useCallback, useRef, useState } from "react";
import { markModuleVisited, markQuizCompleted, getCourseProgress, saveScrollPosition } from "@/lib/progress";

interface ProgressContextValue {
  slug: string;
  visitedModules: Set<string>;
  completedQuizzes: Set<string>;
  onModuleVisible: (moduleId: string) => void;
  onQuizComplete: (quizId: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgressTracker() {
  return useContext(ProgressContext);
}

export default function CourseProgressTracker({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const [visitedModules, setVisitedModules] = useState<Set<string>>(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Restore progress from localStorage
  useEffect(() => {
    const progress = getCourseProgress(slug);
    if (progress) {
      setVisitedModules(new Set(progress.visitedModules));
      setCompletedQuizzes(new Set(progress.completedQuizzes));

      // Restore scroll position on first visit
      if (progress.scrollPosition && progress.scrollPosition > 200) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: progress.scrollPosition, behavior: "instant" });
        });
      }
    }
  }, [slug]);

  // Save scroll position periodically
  useEffect(() => {
    function onScroll() {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        saveScrollPosition(slug, window.scrollY);
      }, 500);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimerRef.current);
    };
  }, [slug]);

  const onModuleVisible = useCallback(
    (moduleId: string) => {
      markModuleVisited(slug, moduleId);
      setVisitedModules((prev) => {
        if (prev.has(moduleId)) return prev;
        const next = new Set(prev);
        next.add(moduleId);
        return next;
      });
    },
    [slug]
  );

  const onQuizComplete = useCallback(
    (quizId: string) => {
      markQuizCompleted(slug, quizId);
      setCompletedQuizzes((prev) => {
        if (prev.has(quizId)) return prev;
        const next = new Set(prev);
        next.add(quizId);
        return next;
      });
    },
    [slug]
  );

  return (
    <ProgressContext.Provider
      value={{ slug, visitedModules, completedQuizzes, onModuleVisible, onQuizComplete }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
