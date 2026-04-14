"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableElementProps {
  id: string;
  elementType: string;
  onDelete: () => void;
  children: React.ReactNode;
}

const typeLabels: Record<string, string> = {
  content: "Text",
  "key-concept": "Konzept",
  callout: "Callout",
  "context-box": "Kontext",
  quiz: "Quiz",
  flashcard: "Flashcard",
  reflection: "Reflexion",
  "easter-egg": "Easter Egg",
  image: "Bild",
  video: "Video",
  "code-block": "Code",
  "step-by-step": "Schritte",
  interactive: "Interaktiv",
};

export default function SortableElement({
  id,
  elementType,
  onDelete,
  children,
}: SortableElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group/sortable">
      {/* Controls bar — visible on hover */}
      <div className="absolute -top-4 left-0 right-0 z-20 flex items-center justify-between opacity-0 group-hover/sortable:opacity-100 transition-opacity duration-200">
        {/* Drag handle + type label */}
        <div className="flex items-center gap-1">
          <button
            {...attributes}
            {...listeners}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-grab active:cursor-grabbing shadow-sm"
            style={{
              backgroundColor: "var(--course-surface)",
              color: "var(--course-text-muted)",
              border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
            }}
            title="Ziehen zum Verschieben"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="1.5" />
              <circle cx="15" cy="5" r="1.5" />
              <circle cx="9" cy="12" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="15" cy="19" r="1.5" />
            </svg>
            {typeLabels[elementType] || elementType}
          </button>
        </div>

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium shadow-sm transition-colors duration-200 hover:bg-red-600 hover:text-white hover:border-red-600"
          style={{
            backgroundColor: "var(--course-surface)",
            color: "var(--course-text-muted)",
            border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
          }}
          title="Element löschen"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {children}
    </div>
  );
}
