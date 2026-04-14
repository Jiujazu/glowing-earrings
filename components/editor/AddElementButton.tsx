"use client";

import { useState, useRef, useEffect } from "react";
import type { ModuleElement } from "@/lib/types";

interface AddElementButtonProps {
  onAdd: (element: ModuleElement) => void;
}

const elementTypes = [
  { type: "content", label: "Text", icon: "📝" },
  { type: "callout", label: "Callout", icon: "💡", variant: "tip" },
  { type: "key-concept", label: "Konzept", icon: "🔑" },
  { type: "context-box", label: "Kontext", icon: "📋" },
  { type: "reflection", label: "Reflexion", icon: "🤔" },
  { type: "image", label: "Bild", icon: "🖼️" },
  { type: "video", label: "Video", icon: "🎬" },
] as const;

let nextId = 1;
function generateId(type: string): string {
  return `new-${type}-${Date.now()}-${nextId++}`;
}

function createNewElement(type: string): ModuleElement {
  const id = generateId(type);

  switch (type) {
    case "content":
      return { id, type: "content", text: "Neuer Text — klicke zum Bearbeiten." };
    case "callout":
      return { id, type: "callout", variant: "tip", text: "Neuer Tipp — klicke zum Bearbeiten." };
    case "key-concept":
      return { id, type: "key-concept", title: "Neues Konzept", description: "Beschreibung hinzufügen." };
    case "context-box":
      return { id, type: "context-box", term: "Begriff", explanation: "Erklärung hinzufügen." };
    case "reflection":
      return { id, type: "reflection", prompt: "Neue Reflexionsfrage?" };
    case "image":
      return { id, type: "image", src: "", alt: "Neues Bild" };
    case "video":
      return { id, type: "video", platform: "youtube", videoId: "" };
    default:
      return { id, type: "content", text: "Neuer Text." };
  }
}

export default function AddElementButton({ onAdd }: AddElementButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div className="relative flex justify-center py-2">
      {/* "+" line */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-200"
      >
        <div className="h-px w-12 bg-[var(--course-text-muted)]" />
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 group-hover:scale-110"
          style={{
            backgroundColor: "var(--course-surface)",
            color: "var(--course-primary)",
            border: "2px solid var(--course-primary)",
          }}
        >
          +
        </div>
        <div className="h-px w-12 bg-[var(--course-text-muted)]" />
      </button>

      {/* Type picker */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full mt-1 z-30 rounded-xl p-2 shadow-2xl grid grid-cols-2 sm:grid-cols-4 gap-1"
          style={{
            backgroundColor: "var(--course-surface)",
            border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
          }}
        >
          {elementTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => {
                onAdd(createNewElement(type));
                setIsOpen(false);
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
              style={{
                color: "var(--course-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--course-primary) 10%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="text-lg">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
