import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`
          w-full px-4 py-2.5 text-base
          bg-[var(--surface-elevated)] text-[var(--text-primary)]
          border border-[var(--border)]
          rounded-xl
          placeholder:text-[var(--text-muted)]
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent
          transition-all duration-200
          ${error ? "border-red-400 focus:ring-red-400" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
