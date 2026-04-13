"use client";

import { useState, useEffect } from "react";
import type { CourseDesign } from "@/lib/types";

interface CourseThemeProviderProps {
  design: CourseDesign;
  children: React.ReactNode;
}

export default function CourseThemeProvider({
  design,
  children,
}: CourseThemeProviderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Read initial state from global dark mode
    setIsDark(document.documentElement.classList.contains("dark"));

    // Watch for global toggle changes via MutationObserver
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const hasLightMode = !!design.lightColors;
  const colors =
    !isDark && hasLightMode ? design.lightColors! : design.colors;

  const style = {
    "--course-bg": colors.background,
    "--course-surface": colors.surface,
    "--course-primary": colors.primary,
    "--course-accent": colors.accent,
    "--course-text": colors.text,
    "--course-text-muted": colors.textMuted,
    ...(design.fonts?.heading && {
      "--course-heading-font": design.fonts.heading,
    }),
    ...(design.fonts?.body && {
      "--course-body-font": design.fonts.body,
    }),
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="bg-[var(--course-bg)] text-[var(--course-text)] min-h-screen relative transition-colors duration-300"
      data-theme={design.theme}
      data-mode={isDark ? "dark" : "light"}
    >
      {children}
    </div>
  );
}
