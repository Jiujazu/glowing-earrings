"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { VideoElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";

const EditableVideo = dynamic(() => import("@/components/editor/EditableVideo"), {
  ssr: false,
});

function getThumbnailUrl(platform: string, videoId: string): string {
  if (platform === "youtube") {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return `https://vumbnail.com/${videoId}.jpg`;
}

function getEmbedUrl(platform: string, videoId: string, startAt?: number): string {
  if (platform === "youtube") {
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
    });
    if (startAt) params.set("start", String(startAt));
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  }
  const params = new URLSearchParams({ autoplay: "1" });
  if (startAt) params.set("t", `${startAt}s`);
  return `https://player.vimeo.com/video/${videoId}?${params}`;
}

export default function VideoEmbed({ element }: { element: VideoElement }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isEditMode } = useEditMode();

  // Empty video placeholder
  if (!element.videoId) {
    const placeholder = (
      <div className="overflow-hidden border-4 border-[var(--course-text)]/15 bg-[var(--course-surface)] aspect-video flex items-center justify-center">
        <div className="text-center text-[var(--course-text-muted)]">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
            <line x1="17" y1="17" x2="22" y2="17" />
          </svg>
          <p className="text-sm">Video-URL einfügen</p>
        </div>
      </div>
    );

    if (isEditMode) {
      return (
        <EditableVideo elementId={element.id} currentPlatform={element.platform} currentVideoId={element.videoId}>
          {placeholder}
        </EditableVideo>
      );
    }
    return placeholder;
  }

  const videoContent = (
    <div className="overflow-hidden border-4 border-[var(--course-text)]/15 bg-[var(--course-surface)]">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => {
            if (!isEditMode) setIsPlaying(true);
          }}
          className={`relative block w-full aspect-video group ${
            isEditMode ? "cursor-default" : "cursor-pointer"
          }`}
          aria-label={element.title ? `Video abspielen: ${element.title}` : "Video abspielen"}
        >
          {/* Thumbnail */}
          <img
            src={getThumbnailUrl(element.platform, element.videoId)}
            alt={element.title || "Video thumbnail"}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Play overlay */}
          {!isEditMode && (
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-100 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[var(--neo-border)] bg-white group-hover:scale-110 transition-all duration-100 flex items-center justify-center"
                style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--course-primary)] ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </button>
      ) : (
        <div className="relative w-full aspect-video">
          <iframe
            src={getEmbedUrl(element.platform, element.videoId, element.startAt)}
            title={element.title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )}

      {element.title && (
        <p className="px-4 py-3 text-sm font-medium text-[var(--course-text)]">
          {element.title}
        </p>
      )}
    </div>
  );

  if (isEditMode) {
    return (
      <EditableVideo
        elementId={element.id}
        currentPlatform={element.platform}
        currentVideoId={element.videoId}
      >
        {videoContent}
      </EditableVideo>
    );
  }

  return videoContent;
}
