"use client";

import { useState } from "react";
import { useEditMode } from "./EditModeProvider";

const shortcuts = [
  { keys: "⌘E", desc: "Edit-Modus an/aus" },
  { keys: "⌘S", desc: "Speichern" },
  { keys: "⌘Z", desc: "Rückgängig" },
  { keys: "⌘⇧Z", desc: "Wiederholen" },
  { keys: "⌘B", desc: "Fett" },
  { keys: "⌘I", desc: "Kursiv" },
  { keys: "Esc", desc: "Editor schließen" },
];

export default function ShortcutHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const { isEditMode } = useEditMode();

  if (!isEditMode) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: "var(--course-surface)",
          color: "var(--course-text-muted)",
          border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
        }}
        title="Tastenkürzel anzeigen"
      >
        ?
      </button>

      {isOpen && (
        <div
          className="fixed bottom-16 left-6 z-50 rounded-xl p-4 shadow-2xl min-w-[200px]"
          style={{
            backgroundColor: "var(--course-surface)",
            border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
          }}
        >
          <p className="text-xs font-bold text-[var(--course-text-muted)] uppercase tracking-wider mb-3">
            Tastenkürzel
          </p>
          <div className="space-y-2">
            {shortcuts.map(({ keys, desc }) => (
              <div key={keys} className="flex items-center justify-between gap-4">
                <span className="text-sm text-[var(--course-text)]">{desc}</span>
                <kbd
                  className="px-1.5 py-0.5 rounded text-xs font-mono"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--course-text) 10%, transparent)",
                    color: "var(--course-text-muted)",
                  }}
                >
                  {keys}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
