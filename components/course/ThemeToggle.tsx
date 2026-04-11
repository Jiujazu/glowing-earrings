"use client";

import { useThemeMode } from "./CourseThemeProvider";

export default function ThemeToggle() {
  const { isDark, toggle } = useThemeMode();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-colors duration-200 border"
      style={{
        backgroundColor: isDark
          ? "color-mix(in srgb, var(--course-text) 10%, var(--course-surface))"
          : "var(--surface-tinted)",
        borderColor: isDark
          ? "color-mix(in srgb, var(--course-text) 15%, transparent)"
          : "var(--border)",
        color: isDark ? "var(--course-text)" : "var(--text-primary)",
      }}
      aria-label={isDark ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}
    >
      <span className="text-sm">{isDark ? "☀️" : "🌙"}</span>
      <span>{isDark ? "Hell" : "Dunkel"}</span>
    </button>
  );
}
