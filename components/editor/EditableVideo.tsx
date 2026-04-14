"use client";

import { useState, useRef, useEffect } from "react";
import { useEditMode } from "./EditModeProvider";

interface EditableVideoProps {
  elementId: string;
  currentPlatform: string;
  currentVideoId: string;
  currentTitle?: string;
  children: React.ReactNode;
}

function parseVideoUrl(url: string): { platform: "youtube" | "vimeo"; videoId: string } | null {
  // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return { platform: "youtube", videoId: ytMatch[1] };

  // Vimeo: vimeo.com/ID, player.vimeo.com/video/ID
  const vimeoMatch = url.match(
    /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/
  );
  if (vimeoMatch) return { platform: "vimeo", videoId: vimeoMatch[1] };

  return null;
}

export default function EditableVideo({
  elementId,
  currentPlatform,
  currentVideoId,
  currentTitle,
  children,
}: EditableVideoProps) {
  const editMode = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on click outside
  useEffect(() => {
    if (!isEditing) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsEditing(false);
        setError("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isEditing]);

  if (!editMode.isEditMode) {
    return <>{children}</>;
  }

  const handleSubmit = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError("Bitte URL eingeben.");
      return;
    }

    const parsed = parseVideoUrl(trimmed);
    if (!parsed) {
      setError("Ungültige URL. Bitte eine YouTube- oder Vimeo-URL eingeben.");
      return;
    }

    // Don't register if nothing changed
    if (parsed.platform === currentPlatform && parsed.videoId === currentVideoId) {
      setIsEditing(false);
      setUrlInput("");
      setError("");
      return;
    }

    if ("registerChange" in editMode) {
      editMode.registerChange({
        elementId,
        fieldPath: "platform",
        newValue: parsed.platform,
      });
      editMode.registerChange({
        elementId,
        fieldPath: "videoId",
        newValue: parsed.videoId,
      });
    }

    setIsEditing(false);
    setUrlInput("");
    setError("");
  };

  return (
    <div
      className="relative rounded-xl transition-all duration-200"
      style={{
        outline: isHovered
          ? "2px dashed var(--course-primary)"
          : "2px dashed transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover controls */}
      {isHovered && !isEditing && (
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          <button
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--course-primary)",
              color: "#fff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Video ändern
          </button>
        </div>
      )}

      {/* URL input panel */}
      {isEditing && (
        <div
          ref={panelRef}
          className="absolute top-3 left-3 right-3 z-30 rounded-xl p-4 shadow-2xl"
          style={{
            backgroundColor: "var(--course-surface)",
            border: "1px solid var(--course-primary)",
          }}
        >
          <p className="text-xs font-medium text-[var(--course-text-muted)] mb-2">
            YouTube- oder Vimeo-URL einfügen
          </p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setError("");
                }
              }}
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--course-bg)] text-[var(--course-text)] border border-[var(--course-text-muted)]/30 focus:outline-none focus:border-[var(--course-primary)]"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "var(--course-primary)",
                color: "#fff",
              }}
            >
              OK
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
