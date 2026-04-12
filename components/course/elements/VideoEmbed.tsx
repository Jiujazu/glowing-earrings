"use client";

import { useState } from "react";
import type { VideoElement } from "@/lib/types";

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
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
  }
  const params = new URLSearchParams({ autoplay: "1" });
  if (startAt) params.set("t", `${startAt}s`);
  return `https://player.vimeo.com/video/${videoId}?${params}`;
}

export default function VideoEmbed({ element }: { element: VideoElement }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden bg-[var(--course-surface)]">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="relative block w-full aspect-video group cursor-pointer"
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
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--course-primary)] ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
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
}
