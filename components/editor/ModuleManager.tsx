"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Module } from "@/lib/types";
import { useEditMode } from "./EditModeProvider";
import ModuleRenderer from "@/components/course/ModuleRenderer";

let nextModuleId = 1;

function InlineModuleTitle({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="outline-none focus:ring-1 focus:ring-[var(--course-primary)] rounded px-1 -mx-1"
      onBlur={() => {
        const text = ref.current?.textContent || "";
        if (text !== value) onChange(text);
      }}
    />
  );
}

interface ModuleManagerProps {
  modules: Module[];
}

export default function ModuleManager({ modules: initialModules }: ModuleManagerProps) {
  const editMode = useEditMode();
  const isEditMode = editMode.isEditMode;
  const [localModules, setLocalModules] = useState<Module[]>(initialModules);

  const registerModulesChange = useCallback(
    (updated: Module[]) => {
      if ("registerChange" in editMode) {
        editMode.registerChange({
          elementId: "course",
          fieldPath: "modules",
          newValue: JSON.stringify(updated),
        });
      }
    },
    [editMode]
  );

  const addModule = useCallback(
    (afterIndex: number) => {
      const id = `new-module-${Date.now()}-${nextModuleId++}`;
      const newModule: Module = {
        id,
        title: "Neues Modul",
        estimatedMinutes: 5,
        elements: [
          { id: `${id}-intro`, type: "content" as const, text: "Modulinhalt hier einfügen." },
        ],
      };
      const updated = [...localModules];
      updated.splice(afterIndex + 1, 0, newModule);
      setLocalModules(updated);
      registerModulesChange(updated);
    },
    [localModules, registerModulesChange]
  );

  const deleteModule = useCallback(
    (index: number) => {
      if (localModules.length <= 1) return;
      const updated = localModules.filter((_, i) => i !== index);
      setLocalModules(updated);
      registerModulesChange(updated);
    },
    [localModules, registerModulesChange]
  );

  const moveModule = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= localModules.length) return;
      const updated = [...localModules];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setLocalModules(updated);
      registerModulesChange(updated);
    },
    [localModules, registerModulesChange]
  );

  const renameModule = useCallback(
    (index: number, newTitle: string) => {
      const updated = localModules.map((mod, i) =>
        i === index ? { ...mod, title: newTitle } : mod
      );
      setLocalModules(updated);
      registerModulesChange(updated);
    },
    [localModules, registerModulesChange]
  );

  // Read-only mode: render modules directly
  if (!isEditMode) {
    return (
      <>
        {initialModules.map((module, index) => (
          <ModuleRenderer key={module.id} module={module} index={index} allModules={initialModules} />
        ))}
      </>
    );
  }

  // Edit mode: render with controls
  return (
    <>
      {localModules.map((module, index) => (
        <div key={module.id} className="relative">
          {/* Module controls */}
          <div className="flex items-center justify-between px-4 py-2 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--course-text-muted)] uppercase tracking-wider">
                Modul {index + 1}:
              </span>
              <InlineModuleTitle
                value={module.title}
                onChange={(val) => renameModule(index, val)}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => moveModule(index, index - 1)}
                disabled={index === 0}
                className="p-1.5 rounded text-xs disabled:opacity-20 hover:bg-[var(--course-text)]/10 transition-colors"
                style={{ color: "var(--course-text-muted)" }}
                title="Nach oben"
              >
                ↑
              </button>
              <button
                onClick={() => moveModule(index, index + 1)}
                disabled={index === localModules.length - 1}
                className="p-1.5 rounded text-xs disabled:opacity-20 hover:bg-[var(--course-text)]/10 transition-colors"
                style={{ color: "var(--course-text-muted)" }}
                title="Nach unten"
              >
                ↓
              </button>
              <button
                onClick={() => deleteModule(index)}
                disabled={localModules.length <= 1}
                className="p-1.5 rounded text-xs disabled:opacity-20 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                style={{ color: "var(--course-text-muted)" }}
                title="Modul löschen"
              >
                ✕
              </button>
            </div>
          </div>

          <ModuleRenderer module={module} index={index} allModules={localModules} />

          {/* Add module button */}
          <div className="flex justify-center py-4">
            <button
              onClick={() => addModule(index)}
              className="group flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-200"
            >
              <div className="h-px w-16 bg-[var(--course-text-muted)]" />
              <span
                className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--course-surface)",
                  color: "var(--course-primary)",
                  border: "1px solid var(--course-primary)",
                }}
              >
                + Modul
              </span>
              <div className="h-px w-16 bg-[var(--course-text-muted)]" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
