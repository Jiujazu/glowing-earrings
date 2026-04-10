type BadgeVariant = "default" | "accent" | "brand" | "muted";

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
    "bg-[var(--surface)] text-[var(--text-muted)]",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-medium rounded-full
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
