"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useEditMode } from "./EditModeProvider";
import { useToast } from "./EditorToast";

type SaveState = "idle" | "saving" | "success" | "error";

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export default function SaveButton() {
  const editMode = useEditMode();
  const toast = useToast();
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const hasContext = "pendingChanges" in editMode;
  const pendingChanges = hasContext ? editMode.pendingChanges : null;
  const clearChanges = hasContext ? editMode.clearChanges : null;
  const courseSlug = hasContext ? editMode.courseSlug : "";
  const editorToken = hasContext ? editMode.editorToken : "";
  const canUndo = hasContext ? editMode.canUndo : false;
  const canRedo = hasContext ? editMode.canRedo : false;
  const undo = hasContext ? editMode.undo : undefined;
  const redo = hasContext ? editMode.redo : undefined;
  const changeCount = pendingChanges?.size ?? 0;

  const handleSave = useCallback(async (isAutosave = false) => {
    if (!pendingChanges || !clearChanges || pendingChanges.size === 0) return;

    setSaveState("saving");
    setErrorMessage("");

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch("/api/editor/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(editorToken && { Authorization: `Bearer ${editorToken}` }),
        },
        body: JSON.stringify({
          slug: courseSlug,
          changes: Array.from(pendingChanges.values()),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      let data: { success?: boolean; message?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response (e.g. Vercel error page) — fall through
      }

      if (response.ok && data?.success) {
        setSaveState("success");
        clearChanges();
        setLastSaved(new Date());
        toast?.showToast(
          isAutosave ? "Automatisch gespeichert" : "Änderungen gespeichert",
          "success"
        );
        setTimeout(() => setSaveState("idle"), 2000);
      } else {
        const message =
          data?.message || `Speichern fehlgeschlagen (HTTP ${response.status}).`;
        setSaveState("error");
        setErrorMessage(message);
        if (!isAutosave) toast?.showToast(message, "error");
      }
    } catch {
      setSaveState("error");
      setErrorMessage("Netzwerkfehler. Bitte erneut versuchen.");
      if (!isAutosave) {
        toast?.showToast("Netzwerkfehler", "error");
      }
    }
  }, [courseSlug, pendingChanges, clearChanges, editorToken, toast]);

  // Track latest handleSave in ref to avoid resetting interval
  const handleSaveRef = useRef(handleSave);
  handleSaveRef.current = handleSave;
  const pendingChangesRef = useRef(pendingChanges);
  pendingChangesRef.current = pendingChanges;

  // Autosave: every 30 seconds if there are pending changes
  useEffect(() => {
    if (!hasContext) return;

    autosaveTimerRef.current = setInterval(() => {
      if (pendingChangesRef.current && pendingChangesRef.current.size > 0) {
        handleSaveRef.current(true);
      }
    }, AUTOSAVE_INTERVAL);

    return () => clearInterval(autosaveTimerRef.current);
  }, [hasContext]);

  // Keyboard shortcut: Cmd+S / Ctrl+S
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  // Don't render if no context, or if not in edit mode with nothing to show
  if (!hasContext || (changeCount === 0 && saveState !== "success" && !canUndo && !canRedo && !lastSaved)) return null;

  // Format "last saved" time
  const lastSavedText = lastSaved
    ? `Gespeichert ${lastSaved.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}`
    : null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Last saved indicator */}
      {lastSavedText && changeCount === 0 && saveState === "idle" && (
        <span className="text-xs text-[var(--course-text-muted)] px-2">
          {lastSavedText}
        </span>
      )}

      {/* Undo/Redo buttons */}
      {(canUndo || canRedo) && (
        <div className="flex gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 rounded-lg text-sm shadow-md transition-all duration-200 disabled:opacity-30"
            style={{
              backgroundColor: "var(--course-surface)",
              color: "var(--course-text)",
              border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
            }}
            title="Rückgängig (⌘Z)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 rounded-lg text-sm shadow-md transition-all duration-200 disabled:opacity-30"
            style={{
              backgroundColor: "var(--course-surface)",
              color: "var(--course-text)",
              border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
            }}
            title="Wiederholen (⌘⇧Z)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        </div>
      )}

      {/* Error message */}
      {saveState === "error" && errorMessage && (
        <div className="px-4 py-2 rounded-lg text-sm max-w-xs shadow-lg" style={{ backgroundColor: "#dc2626", color: "#fff" }}>
          {errorMessage}
        </div>
      )}

      {/* Save button */}
      {changeCount > 0 && (
        <button
          onClick={() => handleSave(false)}
          disabled={saveState === "saving"}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
          style={{
            backgroundColor: saveState === "success" ? "#16a34a" : "var(--course-primary)",
            color: "#fff",
          }}
        >
          {saveState === "saving" ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Speichere...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Speichern
              <span className="px-1.5 py-0.5 rounded-md text-xs" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                {changeCount}
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
