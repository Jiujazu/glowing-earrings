"use client";

import { useState, useRef, useEffect } from "react";
import { useEditMode } from "./EditModeProvider";

interface EditableImageProps {
  elementId: string;
  currentSrc: string;
  children: React.ReactNode;
}

export default function EditableImage({
  elementId,
  currentSrc,
  children,
}: EditableImageProps) {
  const editMode = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasContext = "courseSlug" in editMode;
  const courseSlug = hasContext ? editMode.courseSlug : "";
  const editorToken = hasContext ? editMode.editorToken : "";

  // Revoke object URLs on cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewSrc?.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  if (!editMode.isEditMode) {
    return <>{children}</>;
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Nur Bilder erlaubt.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Datei zu groß (max. 5 MB).");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", courseSlug);

      const response = await fetch("/api/editor/upload", {
        method: "POST",
        headers: {
          ...(editorToken && { Authorization: `Bearer ${editorToken}` }),
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.src) {
        if ("registerChange" in editMode) {
          editMode.registerChange({
            elementId,
            fieldPath: "src",
            newValue: data.src,
          });
        }
      } else {
        setUploadError(data.message || "Upload fehlgeschlagen.");
        setPreviewSrc(null);
      }
    } catch {
      setUploadError("Netzwerkfehler. Bitte erneut versuchen.");
      setPreviewSrc(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="relative rounded-xl transition-all duration-200"
      style={{
        outline: isDragging
          ? "3px dashed var(--course-primary)"
          : isHovered
          ? "2px dashed var(--course-primary)"
          : "2px dashed transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
    >
      {/* Preview overlay for new image */}
      {previewSrc && (
        <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc}
            alt="Vorschau"
            className="w-full h-full object-cover"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Wird hochgeladen...
              </div>
            </div>
          )}
        </div>
      )}

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-20 bg-[var(--course-primary)]/20 rounded-xl flex items-center justify-center">
          <div
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--course-primary)", color: "#fff" }}
          >
            Bild hier ablegen
          </div>
        </div>
      )}

      {/* Upload controls — always visible on mobile, hover on desktop */}
      {(isHovered || true) && !isDragging && !isUploading && (
        <div className={`absolute top-3 right-3 z-20 flex gap-2 ${isHovered ? "opacity-100" : "opacity-60 sm:opacity-0"} transition-opacity duration-200`}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--course-primary)",
              color: "#fff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Bild ersetzen
          </button>
        </div>
      )}

      {/* Error message */}
      {uploadError && (
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <div className="px-3 py-2 rounded-lg text-xs text-white bg-red-600 shadow-lg">
            {uploadError}
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {children}
    </div>
  );
}
