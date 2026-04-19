"use client";

import { useEffect, useState } from "react";
import type { CourseMeta } from "@/lib/types";
import { useEditMode } from "./EditModeProvider";
import { useFocusTrap } from "@/lib/use-focus-trap";
import TagChipInput from "./TagChipInput";

interface MetaEditPanelProps {
  meta: CourseMeta;
  allTags: string[];
  open: boolean;
  onClose: () => void;
}

export default function MetaEditPanel({
  meta,
  allTags,
  open,
  onClose,
}: MetaEditPanelProps) {
  const editMode = useEditMode();
  const [localTags, setLocalTags] = useState<string[]>(meta.tags);
  const containerRef = useFocusTrap(open);

  // Reset local state when panel reopens with a different meta
  useEffect(() => {
    if (open) setLocalTags(meta.tags);
  }, [open, meta.tags]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function updateTags(next: string[]) {
    setLocalTags(next);
    if ("registerChange" in editMode) {
      editMode.registerChange({
        elementId: "meta:tags",
        fieldPath: "tags",
        newValue: JSON.stringify(next),
      });
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Meta bearbeiten"
        className="fixed top-0 right-0 bottom-0 z-[91] w-full sm:w-[400px] shadow-2xl overflow-y-auto"
        style={{
          backgroundColor: "var(--course-surface)",
          color: "var(--course-text)",
          borderLeft: "4px solid var(--course-primary)",
        }}
      >
        <header
          className="sticky top-0 flex items-center justify-between px-6 py-4 border-b-2"
          style={{
            backgroundColor: "var(--course-surface)",
            borderColor: "var(--course-text-muted)",
          }}
        >
          <h2 className="text-lg font-bold">Meta bearbeiten</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[var(--course-text)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--course-primary)]"
            aria-label="Panel schließen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="px-6 py-6 space-y-6">
          <section>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">
              Tags
            </label>
            <p
              className="text-xs mb-3"
              style={{ color: "var(--course-text-muted)" }}
            >
              Tags strukturieren den Kurs-Katalog und steuern die Filter. Änderungen werden erst beim Speichern committed.
            </p>
            <TagChipInput
              value={localTags}
              suggestions={allTags}
              onChange={updateTags}
            />
          </section>
        </div>
      </aside>
    </>
  );
}
