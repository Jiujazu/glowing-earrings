"use client";

import { useState, useEffect } from "react";
import { getCompletionPercent } from "@/lib/progress";

export default function CourseCardProgress({
  slug,
  totalModules,
}: {
  slug: string;
  totalModules: number;
}) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(getCompletionPercent(slug, totalModules));
  }, [slug, totalModules]);

  if (percent === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 border-2 border-[var(--neo-border)] bg-[var(--surface)] overflow-hidden">
        <div
          className="h-full bg-[var(--pop-turquoise)] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-bold text-[var(--text-primary)] tabular-nums uppercase">
        {percent}%
      </span>
    </div>
  );
}
