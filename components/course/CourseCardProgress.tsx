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
      <div className="flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--pop-turquoise)] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-[var(--text-muted)] tabular-nums">
        {percent}%
      </span>
    </div>
  );
}
