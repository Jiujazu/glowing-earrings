"use client";

interface MetaEditButtonProps {
  onClick: () => void;
}

export default function MetaEditButton({ onClick }: MetaEditButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2"
      style={{
        backgroundColor: "var(--course-surface)",
        color: "var(--course-primary)",
        border: "2px solid var(--course-primary)",
      }}
      title="Meta bearbeiten (Tags, …)"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
      Meta bearbeiten
    </button>
  );
}
