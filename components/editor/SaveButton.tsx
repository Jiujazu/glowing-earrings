"use client";

import { useState, useEffect, useCallback } from "react";
import { useEditMode } from "./EditModeProvider";

type SaveState = "idle" | "saving" | "success" | "error";

export default function SaveButton() {
  const editMode = useEditMode();
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Type guard: full context available
  if (!("pendingChanges" in editMode)) return null;

  const { pendingChanges, clearChanges, courseSlug } = editMode;
  const changeCount = pendingChanges.size;

  const handleSave = useCallback(async () => {
    if (changeCount === 0 || saveState === "saving") return;

    setSaveState("saving");
    setErrorMessage("");

    try {
      const response = await fetch("/api/editor/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: courseSlug,
          changes: Array.from(pendingChanges.values()),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSaveState("success");
        clearChanges();
        setTimeout(() => setSaveState("idle"), 2000);
      } else {
        setSaveState("error");
        setErrorMessage(data.message || "Speichern fehlgeschlagen.");
      }
    } catch {
      setSaveState("error");
      setErrorMessage("Netzwerkfehler. Bitte erneut versuchen.");
    }
  }, [changeCount, saveState, courseSlug, pendingChanges, clearChanges]);

  // Keyboard shortcut: Cmd+S / Ctrl+S
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (changeCount > 0) {
          handleSave();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, changeCount]);

  // Don't render if no changes and not showing success
  if (changeCount === 0 && saveState !== "success") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Error message */}
      {saveState === "error" && errorMessage && (
        <div
          className="px-4 py-2 rounded-lg text-sm max-w-xs shadow-lg"
          style={{
            backgroundColor: "#dc2626",
            color: "#fff",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saveState === "saving"}
        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
        style={{
          backgroundColor:
            saveState === "success" ? "#16a34a" : "var(--course-primary)",
          color: "#fff",
        }}
      >
        {saveState === "saving" && (
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        )}

        {saveState === "success" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}

        {saveState === "idle" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        )}

        {saveState === "error" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )}

        {saveState === "saving" && "Speichere..."}
        {saveState === "success" && "Gespeichert!"}
        {saveState === "error" && "Erneut versuchen"}
        {saveState === "idle" && (
          <>
            Speichern
            <span
              className="px-1.5 py-0.5 rounded-md text-xs"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {changeCount}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
