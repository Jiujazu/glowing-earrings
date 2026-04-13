"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ImageElement } from "@/lib/types";

export default function ImageBlock({ element }: { element: ImageElement }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsZoomed(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isZoomed]);

  return (
    <>
      <figure className={element.fullWidth ? "-mx-4 sm:-mx-8" : ""}>
        <button
          type="button"
          onClick={() => setIsZoomed(true)}
          className="block w-full rounded-xl overflow-hidden cursor-zoom-in transition-shadow duration-300 hover:shadow-lg hover:shadow-[var(--course-primary)]/10"
        >
          <Image
            src={element.src}
            alt={element.alt}
            width={element.width || 800}
            height={element.height || 450}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </button>
        {element.caption && (
          <figcaption className="mt-2 text-center text-sm text-[var(--course-text-muted)] italic">
            {element.caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out p-4"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label={element.alt}
        >
          <Image
            src={element.src}
            alt={element.alt}
            width={element.width ? element.width * 2 : 1600}
            height={element.height ? element.height * 2 : 900}
            className="max-w-full max-h-[90vh] w-auto h-auto rounded-lg object-contain"
            sizes="100vw"
          />
        </div>
      )}
    </>
  );
}
