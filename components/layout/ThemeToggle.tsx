"use client";

import { useState, useEffect, useCallback } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("ge-theme", next);
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    // Sync across tabs
    function onStorage(e: StorageEvent) {
      if (
        e.key === "ge-theme" &&
        (e.newValue === "dark" || e.newValue === "light")
      ) {
        setTheme(e.newValue);
        document.documentElement.classList.toggle(
          "dark",
          e.newValue === "dark"
        );
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    // Listen for OS theme changes only when no explicit preference is stored
    const mq = matchMedia("(prefers-color-scheme: dark)");
    function onChange(e: MediaQueryListEvent) {
      try {
        if (localStorage.getItem("ge-theme")) return;
      } catch {
        return;
      }
      const next = e.matches ? "dark" : "light";
      setTheme(next);
      document.documentElement.classList.toggle("dark", e.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isDark = theme === "dark";

  // Render placeholder during SSR/hydration to avoid mismatch
  if (!mounted) {
    return (
      <button
        className="p-2.5 border-2 border-transparent"
        aria-hidden="true"
      >
        <span className="block w-[18px] h-[18px]" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 text-[var(--text-primary)] hover:text-[var(--accent)] hover:bg-[var(--surface-tinted)] border-2 border-transparent hover:border-[var(--neo-border)] transition-all duration-100"
      aria-label={
        isDark
          ? "Zum hellen Modus wechseln"
          : "Zum dunklen Modus wechseln"
      }
      title={isDark ? "Hell" : "Dunkel"}
    >
      {isDark ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
