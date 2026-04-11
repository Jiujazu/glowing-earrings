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
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("course-theme-mode");
    if (stored === "light") setIsLight(true);
  }, []);

  function toggle() {
    setIsLight((prev) => {
      const next = !prev;
      localStorage.setItem("course-theme-mode", next ? "light" : "dark");
      return next;
    });
  }

  const hasLightMode = !!design.lightColors;
  const colors = isLight && hasLightMode ? design.lightColors! : design.colors;

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
    <ThemeModeContext.Provider value={{ isDark: !(isLight && hasLightMode), toggle: hasLightMode ? toggle : () => {} }}>
      <div
        style={style}
        className="bg-[var(--course-bg)] text-[var(--course-text)] min-h-screen relative transition-colors duration-300"
        data-theme={design.theme}
        data-mode={isLight && hasLightMode ? "light" : "dark"}
      >
        {children}
      </div>
    </ThemeModeContext.Provider>
  );
}
