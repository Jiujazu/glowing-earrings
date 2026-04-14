"use client";

import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent editor blur
        onClick();
      }}
      className={`px-2 py-1 rounded text-xs font-medium transition-all duration-150 ${
        active
          ? "bg-[var(--course-primary)] text-white"
          : "hover:bg-[var(--course-text)]/10 text-[var(--course-text)]"
      }`}
      title={title}
    >
      {children}
    </button>
  );
}

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
  const [localContent, setLocalContent] = useState<string | null>(null);
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
        setLocalContent(markdown);
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
        {/* Formatting toolbar */}
        <div
          className="flex items-center gap-0.5 mb-2 px-1 py-1 rounded-lg flex-wrap"
          style={{
            backgroundColor: "color-mix(in srgb, var(--course-text) 8%, transparent)",
          }}
        >
          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Fett (⌘B)"
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Kursiv (⌘I)"
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Durchgestrichen"
          >
            <s>S</s>
          </ToolbarButton>
          <div className="w-px h-5 bg-[var(--course-text)]/15 mx-1" />
          <ToolbarButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Überschrift 2"
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="Überschrift 3"
          >
            H3
          </ToolbarButton>
          <div className="w-px h-5 bg-[var(--course-text)]/15 mx-1" />
          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Aufzählung"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Nummerierte Liste"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="3" y="8" fontSize="7" fill="currentColor" stroke="none">1</text><text x="3" y="14" fontSize="7" fill="currentColor" stroke="none">2</text><text x="3" y="20" fontSize="7" fill="currentColor" stroke="none">3</text></svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Zitat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="Code"
          >
            <code className="text-xs">{`</>`}</code>
          </ToolbarButton>
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

      {/* Show optimistic preview if content was edited, otherwise original */}
      {localContent !== null ? (
        <div className={COURSE_PROSE_CLASSES}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{localContent}</ReactMarkdown>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
