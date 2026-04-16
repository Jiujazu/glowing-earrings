import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`
          w-full px-4 py-2.5 text-base font-bold
          bg-[var(--surface)] text-[var(--text-primary)]
          border-4 border-[var(--neo-border)]
          placeholder:text-[var(--text-primary)]/40
          focus:outline-none focus:ring-0 focus:bg-[var(--pop-turquoise)]/20
          transition-all duration-100
          ${error ? "border-red-500 bg-red-50" : ""}
          ${className}
        `}
        style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm font-bold text-red-500">{error}</p>
      )}
    </div>
  );
}
