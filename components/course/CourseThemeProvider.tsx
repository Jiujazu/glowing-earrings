"use client";

import { useState, useEffect, createContext, useContext } from "react";
import type { CourseDesign } from "@/lib/types";

const ThemeModeContext = createContext<{
  isDark: boolean;
  toggle: () => void;
}>({ isDark: false, toggle: () => {} });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

interface CourseThemeProviderProps {
  design: CourseDesign;
  children: React.ReactNode;
}

export default function CourseThemeProvider({
  design,
  children,
}: CourseThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("course-theme-mode");
    if (stored === "dark") setIsDark(true);
  }, []);

  function toggle() {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("course-theme-mode", next ? "dark" : "light");
      return next;
    });
  }

  const hasDarkMode = !!design.darkColors;
  const colors = isDark && hasDarkMode ? design.darkColors! : design.colors;

  const style = {
    "--course-bg": colors.background,
    "--course-background": colors.background,
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
    <ThemeModeContext.Provider value={{ isDark: isDark && hasDarkMode, toggle: hasDarkMode ? toggle : () => {} }}>
      <div
        style={style}
        className="bg-[var(--course-bg)] text-[var(--course-text)] min-h-screen relative transition-colors duration-300"
        data-theme={design.theme}
        data-mode={isDark && hasDarkMode ? "dark" : "light"}
      >
        {children}
      </div>
    </ThemeModeContext.Provider>
  );
}
