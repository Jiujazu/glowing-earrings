"use client";

import { useMemo, useRef, useState } from "react";

const MAX_TAG_LENGTH = 40;

interface TagChipInputProps {
  value: string[];
  suggestions: string[];
  onChange: (tags: string[]) => void;
}

export default function TagChipInput({
  value,
  suggestions,
  onChange,
}: TagChipInputProps) {
  const [query, setQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return suggestions
      .filter(
        (s) =>
          s.toLowerCase().includes(q) &&
          !value.some((v) => v.toLowerCase() === s.toLowerCase())
      )
      .slice(0, 6);
  }, [query, suggestions, value]);

  function addTag(raw: string) {
    const trimmed = raw.trim().slice(0, MAX_TAG_LENGTH);
    if (!trimmed) return;
    if (value.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      setQuery("");
      return;
    }
    onChange([...value, trimmed]);
    setQuery("");
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function renameTag(index: number, newRaw: string) {
    const trimmed = newRaw.trim().slice(0, MAX_TAG_LENGTH);
    if (!trimmed) {
      removeTag(index);
      return;
    }
    const clashIdx = value.findIndex(
      (v, i) => i !== index && v.toLowerCase() === trimmed.toLowerCase()
    );
    const next = [...value];
    next[index] = trimmed;
    if (clashIdx !== -1) {
      // merge: drop current index, keep earlier one
      onChange(next.filter((_, i) => i !== index));
    } else {
      onChange(next);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(query);
    } else if (e.key === "Backspace" && query === "" && value.length > 0) {
      removeTag(value.length - 1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div className="relative">
      <div
        className="flex flex-wrap items-center gap-2 p-2 min-h-[48px] border-2 rounded"
        style={{
          borderColor: "var(--course-text-muted)",
          backgroundColor: "var(--course-background)",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, index) =>
          editingIndex === index ? (
            <InlineChipEdit
              key={`${tag}-${index}`}
              initial={tag}
              onCommit={(next) => {
                renameTag(index, next);
                setEditingIndex(null);
              }}
              onCancel={() => setEditingIndex(null)}
            />
          ) : (
            <span
              key={`${tag}-${index}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-semibold rounded"
              style={{
                backgroundColor: "var(--course-primary)",
                color: "#fff",
              }}
            >
              <button
                type="button"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/60 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingIndex(index);
                }}
                title="Tag umbenennen"
              >
                {tag}
              </button>
              <button
                type="button"
                className="ml-0.5 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/60 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                aria-label={`Tag "${tag}" entfernen`}
              >
                ×
              </button>
            </span>
          )
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          placeholder={value.length === 0 ? "Tag eingeben…" : ""}
          maxLength={MAX_TAG_LENGTH}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1"
          style={{ color: "var(--course-text)" }}
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 top-full mt-1 z-10 rounded border-2 max-h-48 overflow-auto"
          style={{
            backgroundColor: "var(--course-surface)",
            borderColor: "var(--course-text-muted)",
          }}
        >
          {filteredSuggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(s);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--course-primary)]/20 transition-colors"
                style={{ color: "var(--course-text)" }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p
        className="text-xs mt-2"
        style={{ color: "var(--course-text-muted)" }}
      >
        Enter oder Komma = hinzufügen · Click auf Tag = umbenennen · × = entfernen
      </p>
    </div>
  );
}

function InlineChipEdit({
  initial,
  onCommit,
  onCancel,
}: {
  initial: string;
  onCommit: (value: string) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={ref}
      autoFocus
      type="text"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      maxLength={MAX_TAG_LENGTH}
      onBlur={() => onCommit(draft)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit(draft);
        } else if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      className="px-2.5 py-1 text-sm font-semibold rounded outline-none ring-2"
      style={{
        backgroundColor: "var(--course-primary)",
        color: "#fff",
      }}
    />
  );
}
