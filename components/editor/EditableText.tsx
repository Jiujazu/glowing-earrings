"use client";

import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { marked } from "marked";
import DOMPurify from "dompurify";
import TurndownService from "turndown";
import { useEditMode } from "./EditModeProvider";
import { COURSE_PROSE_CLASSES } from "@/lib/prose-classes";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  strongDelimiter: "**",
});

// Add strikethrough support for GFM compatibility
turndown.addRule("strikethrough", {
  filter: ["del", "s"],
  replacement: (content) => `~~${content}~~`,
});

interface EditableTextProps {
  elementId: string;
  content: string;
  fieldPath: string;
  children: React.ReactNode;
}

export default function EditableText({
  elementId,
  content,
  fieldPath,
  children,
}: EditableTextProps) {
  const editMode = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Convert markdown to HTML for TipTap initialization (sanitized against XSS)
  const htmlContent = DOMPurify.sanitize(
    marked.parse(content, { async: false }) as string
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: htmlContent,
    editable: true,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      if (!("registerChange" in editMode)) return;

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const html = ed.getHTML();
        const markdown = turndown.turndown(html);
        editMode.registerChange({
          elementId,
          fieldPath,
          newValue: markdown,
        });
      }, 300);
    },
  });

  // Click outside to stop editing
  useEffect(() => {
    if (!isEditing) return;

    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  // If not in edit mode, pass through children
  if (!editMode.isEditMode) {
    return <>{children}</>;
  }

  // Edit mode: show editable wrapper
  if (isEditing && editor) {
    return (
      <div
        ref={wrapperRef}
        className="relative rounded-lg transition-all duration-200"
        style={{
          border: "2px solid var(--course-primary)",
          backgroundColor: "color-mix(in srgb, var(--course-surface) 80%, transparent)",
          padding: "4px",
        }}
      >
        {/* Active editing indicator */}
        <div
          className="absolute -top-3 left-3 px-2 py-0.5 rounded text-xs font-medium z-10"
          style={{
            backgroundColor: "var(--course-primary)",
            color: "#fff",
          }}
        >
          Wird bearbeitet
        </div>

        <div className={COURSE_PROSE_CLASSES}>
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }

  // Edit mode but not editing: show hover affordance
  return (
    <div
      ref={wrapperRef}
      className="relative cursor-pointer rounded-lg transition-all duration-200"
      style={{
        border: isHovered
          ? "2px dashed var(--course-primary)"
          : "2px dashed transparent",
        padding: "4px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsEditing(true);
        // Focus editor after it renders
        setTimeout(() => editor?.commands.focus("end"), 50);
      }}
    >
      {/* Hover pencil icon */}
      {isHovered && (
        <div
          className="absolute -top-3 right-3 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 z-10"
          style={{
            backgroundColor: "var(--course-primary)",
            color: "#fff",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Klicken zum Bearbeiten
        </div>
      )}

      {children}
    </div>
  );
}
