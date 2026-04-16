import { BADGE_TEXT } from "@/lib/typography";

type BadgeVariant = "default" | "accent" | "brand" | "muted" | "pink" | "turquoise" | "course";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--surface-tinted)] text-[var(--text-primary)] border-2 border-[var(--neo-border)]",
  accent:
    "bg-[var(--accent)] text-white border-2 border-[var(--neo-border)]",
  brand:
    "bg-[var(--pop-turquoise)] text-[var(--foreground)] border-2 border-[var(--neo-border)]",
  muted:
    "bg-[var(--surface)] text-[var(--text-primary)] border-2 border-[var(--neo-border)]",
  pink:
    "bg-[var(--pop-pink)] text-white border-2 border-[var(--neo-border)]",
  turquoise:
    "bg-[var(--pop-turquoise)] text-[var(--foreground)] border-2 border-[var(--neo-border)]",
  course:
    "text-[var(--course-text)] border border-[var(--course-text)]/20",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const style = variant === "course"
    ? { backgroundColor: "color-mix(in srgb, var(--course-primary) 15%, var(--course-surface))" }
    : undefined;

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs ${BADGE_TEXT}
        ${variantClasses[variant]}
        ${className}
      `}
      style={style}
    >
      {children}
    </span>
  );
}
