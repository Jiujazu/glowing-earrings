"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropModalProps {
  src: string;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
}

function getCroppedCanvas(
  image: HTMLImageElement,
  crop: PixelCrop
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas;
}

export default function ImageCropModal({ src, onCrop, onCancel }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCrop = useCallback(() => {
    if (!imgRef.current || !completedCrop) return;

    const canvas = getCroppedCanvas(imgRef.current, completedCrop);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "cropped.png", { type: "image/png" });
        onCrop(file);
      }
    }, "image/png");
  }, [completedCrop, onCrop]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="rounded-xl p-4 max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
        style={{ backgroundColor: "var(--course-surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-medium text-[var(--course-text)] mb-3">
          Bild zuschneiden
        </p>

        <div className="flex justify-center mb-4">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt="Zuschneiden"
              className="max-h-[60vh] w-auto"
            />
          </ReactCrop>
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
            disabled={!completedCrop}
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
