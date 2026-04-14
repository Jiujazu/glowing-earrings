"use client";

import { useState } from "react";
import { useEditMode } from "./EditModeProvider";

interface Revision {
  sha: string;
  message: string;
  date: string;
  author: string;
  url: string;
}

export default function RevisionHistory() {
  const editMode = useEditMode();
  const [isOpen, setIsOpen] = useState(false);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(false);

  if (!editMode.isEditMode) return null;

  const courseSlug = "courseSlug" in editMode ? editMode.courseSlug : "";
  const editorToken = "editorToken" in editMode ? editMode.editorToken : "";

  const loadHistory = async () => {
    if (revisions.length > 0) {
      setIsOpen(!isOpen);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    try {
      const response = await fetch(
        `/api/editor/history?slug=${courseSlug}`,
        {
          headers: {
            ...(editorToken && { Authorization: `Bearer ${editorToken}` }),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setRevisions(data.history);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <>
      <button
        onClick={loadHistory}
        className="fixed bottom-6 left-16 z-50 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: "var(--course-surface)",
          color: "var(--course-text-muted)",
          border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
        }}
        title="Versionshistorie"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed bottom-16 left-16 z-50 rounded-xl p-4 shadow-2xl w-80 max-h-96 overflow-y-auto"
          style={{
            backgroundColor: "var(--course-surface)",
            border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-[var(--course-text-muted)] uppercase tracking-wider">
              Versionshistorie
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--course-text-muted)] hover:text-[var(--course-text)] text-sm"
            >
              ✕
            </button>
          </div>

          {loading && (
            <p className="text-sm text-[var(--course-text-muted)] py-4 text-center">
              Lade...
            </p>
          )}

          <div className="space-y-2">
            {revisions.map((rev) => (
              <a
                key={rev.sha}
                href={rev.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-lg transition-colors hover:bg-[var(--course-text)]/5"
              >
                <div className="flex items-center justify-between mb-1">
                  <code className="text-xs text-[var(--course-primary)] font-mono">
                    {rev.sha}
                  </code>
                  <span className="text-xs text-[var(--course-text-muted)]">
                    {formatDate(rev.date)}
                  </span>
                </div>
                <p className="text-sm text-[var(--course-text)] line-clamp-2">
                  {rev.message}
                </p>
                <p className="text-xs text-[var(--course-text-muted)] mt-0.5">
                  {rev.author}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
