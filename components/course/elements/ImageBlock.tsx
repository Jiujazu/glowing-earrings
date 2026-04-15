"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { ImageElement } from "@/lib/types";
import { useEditMode } from "@/components/editor/EditModeProvider";
import { useFocusTrap } from "@/lib/use-focus-trap";

const EditableImage = dynamic(() => import("@/components/editor/EditableImage"), {
  ssr: false,
});

export default function ImageBlock({ element }: { element: ImageElement }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const { isEditMode } = useEditMode();
  const lightboxRef = useFocusTrap(isZoomed);

  useEffect(() => {
    if (!isZoomed) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsZoomed(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isZoomed]);

  const imageContent = (
    <>
      <figure className={element.fullWidth ? "-mx-4 sm:-mx-8" : ""}>
        <button
          type="button"
          onClick={() => {
            if (!isEditMode) setIsZoomed(true);
          }}
          className={`block w-full overflow-hidden border-4 border-[var(--course-text)]/10 transition-all duration-200 hover:-translate-y-1 ${
            isEditMode ? "cursor-default" : "cursor-zoom-in"
          }`}
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
          ref={lightboxRef}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 cursor-zoom-out p-4"
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
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain border-4 border-white"
            sizes="100vw"
          />
        </div>
      )}
    </>
  );

  if (isEditMode) {
    return (
      <EditableImage elementId={element.id} currentSrc={element.src}>
        {imageContent}
      </EditableImage>
    );
  }

  return imageContent;
}
