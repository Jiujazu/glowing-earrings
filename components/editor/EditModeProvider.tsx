"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useSearchParams } from "next/navigation";

export interface EditorChange {
  elementId: string;
  fieldPath: string;
  newValue: string;
}

interface EditModeContextValue {
  isEditMode: boolean;
  toggleEditMode: () => void;
  pendingChanges: Map<string, EditorChange>;
  registerChange: (change: EditorChange) => void;
  clearChanges: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  courseSlug: string;
  editorToken: string;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) return { isEditMode: false } as const;
  return ctx;
}

function serializeMap(map: Map<string, EditorChange>): string {
  return JSON.stringify(Array.from(map.entries()));
}

function deserializeMap(str: string): Map<string, EditorChange> {
  return new Map(JSON.parse(str));
}

export default function EditModeProvider({
  courseSlug,
  children,
}: {
  courseSlug: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const editorToken = searchParams.get("edit") || "";
  const [sessionAuth, setSessionAuth] = useState(false);

  // Check for OAuth session
  useEffect(() => {
    if (editorToken) return; // Token auth takes priority
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data?.user) setSessionAuth(true);
      })
      .catch(() => {});
  }, [editorToken]);

  const canEdit = editorToken.length > 0 || sessionAuth;

  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, EditorChange>>(
    () => new Map()
  );

  // Undo/Redo history
  const historyRef = useRef<string[]>([serializeMap(new Map())]);
  const historyIndexRef = useRef(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateHistoryState = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  const toggleEditMode = useCallback(() => {
    if (!canEdit) return;
    setIsEditMode((prev) => !prev);
  }, [canEdit]);

  const registerChange = useCallback((change: EditorChange) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(`${change.elementId}:${change.fieldPath}`, change);

      // Push to history (discard any redo states)
      const serialized = serializeMap(next);
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(serialized);
      // Keep max 50 history entries
      if (historyRef.current.length > 50) {
        historyRef.current = historyRef.current.slice(-50);
      }
      historyIndexRef.current = historyRef.current.length - 1;

      return next;
    });
    updateHistoryState();
  }, [updateHistoryState]);

  const clearChanges = useCallback(() => {
    setPendingChanges(new Map());
    historyRef.current = [serializeMap(new Map())];
    historyIndexRef.current = 0;
    updateHistoryState();
  }, [updateHistoryState]);

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    const restored = deserializeMap(historyRef.current[historyIndexRef.current]);
    setPendingChanges(restored);
    updateHistoryState();
  }, [updateHistoryState]);

  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current++;
    const restored = deserializeMap(historyRef.current[historyIndexRef.current]);
    setPendingChanges(restored);
    updateHistoryState();
  }, [updateHistoryState]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (pendingChanges.size > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pendingChanges]);

  // Keyboard shortcuts: Cmd+E, Cmd+Z, Cmd+Shift+Z
  useEffect(() => {
    if (!canEdit) return;

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault();
        setIsEditMode((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canEdit, undo, redo]);

  // If can't edit, just render children without context
  if (!canEdit) {
    return <>{children}</>;
  }

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        pendingChanges,
        registerChange,
        clearChanges,
        undo,
        redo,
        canUndo,
        canRedo,
        courseSlug,
        editorToken,
      }}
    >
      {children}

      {/* Edit mode toggle button */}
      <button
        onClick={toggleEditMode}
        className="fixed top-4 right-4 sm:top-20 z-[80] flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg"
        style={{
          backgroundColor: isEditMode ? "var(--course-primary)" : "var(--course-surface)",
          color: isEditMode ? "#fff" : "var(--course-text)",
          border: `1px solid ${isEditMode ? "var(--course-primary)" : "var(--course-text-muted)"}`,
        }}
        title={isEditMode ? "Edit-Modus deaktivieren (⌘E)" : "Edit-Modus aktivieren (⌘E)"}
      >
        {isEditMode ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Vorschau
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Bearbeiten
          </>
        )}
      </button>
    </EditModeContext.Provider>
  );
}
