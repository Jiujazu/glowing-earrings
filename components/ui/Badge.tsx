type BadgeVariant = "default" | "accent" | "brand" | "muted" | "course";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--sand)] text-[var(--text-primary)]",
  accent:
    "bg-[var(--accent)]/10 text-[var(--accent)]",
  brand:
    "bg-[var(--brand)]/10 text-[var(--brand)]",
  muted:
    "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]",
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
        text-xs font-medium rounded-full
        ${variantClasses[variant]}
        ${className}
      `}
      style={style}
    >
      {children}
    </span>
  );
}
