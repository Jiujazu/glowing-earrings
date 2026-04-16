"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ImageCropModalProps {
  src: string;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function ImageCropModal({ src, onCrop, onCancel }: ImageCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [crop, setCrop] = useState<CropArea | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  // Get mouse position relative to image
  const getRelativePos = useCallback((e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: Math.max(0, Math.min(e.clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(e.clientY - rect.top, rect.height)),
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const pos = getRelativePos(e);
    setDragStart(pos);
    setCrop({ x: pos.x, y: pos.y, width: 0, height: 0 });
    setIsDragging(true);
  }, [getRelativePos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const pos = getRelativePos(e);
    setCrop({
      x: Math.min(dragStart.x, pos.x),
      y: Math.min(dragStart.y, pos.y),
      width: Math.abs(pos.x - dragStart.x),
      height: Math.abs(pos.y - dragStart.y),
    });
  }, [isDragging, dragStart, getRelativePos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleCrop = useCallback(() => {
    if (!imgRef.current || !crop || crop.width < 10 || crop.height < 10) return;

    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const canvas = document.createElement("canvas");
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0, 0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCrop(new File([blob], "cropped.png", { type: "image/png" }));
      }
    }, "image/png");
  }, [crop, onCrop]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  const hasCrop = crop && crop.width > 10 && crop.height > 10;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="rounded-xl p-4 max-w-2xl w-full shadow-2xl"
        style={{ backgroundColor: "var(--course-surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-medium text-[var(--course-text)] mb-3">
          Bild zuschneiden — ziehe einen Bereich auf
        </p>

        <div
          ref={containerRef}
          className="relative flex justify-center mb-4 cursor-crosshair select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt="Zuschneiden"
            className="max-h-[60vh] w-auto rounded-lg"
            onLoad={() => setImgLoaded(true)}
            draggable={false}
          />

          {/* Dark overlay outside crop area */}
          {imgLoaded && hasCrop && (
            <div
              className="absolute rounded-lg pointer-events-none"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: `0 0 0 9999px rgba(0,0,0,0.5)`,
                clipPath: `polygon(
                  0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%,
                  ${crop!.x}px ${crop!.y}px,
                  ${crop!.x}px ${crop!.y + crop!.height}px,
                  ${crop!.x + crop!.width}px ${crop!.y + crop!.height}px,
                  ${crop!.x + crop!.width}px ${crop!.y}px,
                  ${crop!.x}px ${crop!.y}px
                )`,
              }}
            />
          )}

          {/* Crop selection border */}
          {imgLoaded && hasCrop && (
            <div
              className="absolute border-2 border-white pointer-events-none"
              style={{
                left: crop!.x,
                top: crop!.y,
                width: crop!.width,
                height: crop!.height,
              }}
            />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: "var(--course-text-muted)",
              border: "1px solid color-mix(in srgb, var(--course-text) 15%, transparent)",
            }}
          >
            Abbrechen
          </button>
          <button
            onClick={handleCrop}
            disabled={!hasCrop}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50 transition-all"
            style={{ backgroundColor: "var(--course-primary)" }}
          >
            Zuschneiden & Hochladen
          </button>
        </div>
      </div>
    </div>
  );
}
