"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
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
  courseSlug: string;
}

const EditModeContext = createContext<EditModeContextValue | null>(null);

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) return { isEditMode: false } as const;
  return ctx;
}

export default function EditModeProvider({
  courseSlug,
  children,
}: {
  courseSlug: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");
  const canEdit = editParam === "true" || (editParam !== null && editParam.length > 0);

  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, EditorChange>>(
    () => new Map()
  );

  const toggleEditMode = useCallback(() => {
    if (!canEdit) return;
    setIsEditMode((prev) => !prev);
  }, [canEdit]);

  const registerChange = useCallback((change: EditorChange) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(`${change.elementId}:${change.fieldPath}`, change);
      return next;
    });
  }, []);

  const clearChanges = useCallback(() => {
    setPendingChanges(new Map());
  }, []);

  // Keyboard shortcut: Cmd+E / Ctrl+E
  useEffect(() => {
    if (!canEdit) return;

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault();
        setIsEditMode((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canEdit]);

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
        courseSlug,
      }}
    >
      {children}

      {/* Edit mode toggle button */}
      <button
        onClick={toggleEditMode}
        className="fixed top-20 right-4 z-[80] flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg"
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
