import type { CourseDesign } from "@/lib/types";

interface CourseThemeProviderProps {
  design: CourseDesign;
  children: React.ReactNode;
}

export default function CourseThemeProvider({
  design,
  children,
}: CourseThemeProviderProps) {
  const style = {
    "--course-bg": design.colors.background,
    "--course-surface": design.colors.surface,
    "--course-primary": design.colors.primary,
    "--course-accent": design.colors.accent,
    "--course-text": design.colors.text,
    "--course-text-muted": design.colors.textMuted,
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
      className="bg-[var(--course-bg)] text-[var(--course-text)] min-h-screen relative overflow-hidden"
      data-theme={design.theme}
    >
      {children}
    </div>
  );
}
