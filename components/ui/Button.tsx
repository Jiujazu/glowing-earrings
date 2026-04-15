import { ButtonHTMLAttributes } from "react";
import { BUTTON_TEXT } from "@/lib/typography";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white border-4 border-[var(--neo-border)] hover:brightness-110",
  secondary:
    "bg-[var(--surface)] text-[var(--text-primary)] border-4 border-[var(--neo-border)] hover:bg-[var(--pop-turquoise)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] border-2 border-transparent hover:border-[var(--neo-border)] hover:bg-[var(--surface-tinted)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const shadowStyles: Record<ButtonSize, string> = {
  sm: "3px 3px 0px 0px var(--neo-shadow-color)",
  md: "4px 4px 0px 0px var(--neo-shadow-color)",
  lg: "5px 5px 0px 0px var(--neo-shadow-color)",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isGhost = variant === "ghost";

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        ${BUTTON_TEXT}
        transition-all duration-100 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        press-feedback
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        boxShadow: isGhost ? undefined : shadowStyles[size],
        ...style,
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
}
