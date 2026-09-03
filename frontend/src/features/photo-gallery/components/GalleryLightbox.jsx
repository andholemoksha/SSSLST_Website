import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { GalleryImage } from "@/features/photo-gallery/components/GalleryImage";

/**
 * Full-screen lightbox. Loads the larger image only when opened. Supports
 * prev/next, close, and keyboard navigation (←/→/Esc). Rendered via a portal so
 * it overlays the whole page.
 */
export function GalleryLightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];

  const handleKey = useCallback(
    (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    // Prevent the page behind the lightbox from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleKey]);

  if (!photo) return null;

  const hasMultiple = photos.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white/90">
        <span className="text-sm">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full p-2 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Image area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
        {hasMultiple ? (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photo"
            className="absolute left-2 z-10 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:left-4"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
        ) : null}

        <GalleryImage
          src={photo.full_link}
          alt={photo.title || "Gallery photo"}
          className="max-h-full max-w-full rounded-lg"
          imgClassName="max-h-[80vh] max-w-full rounded-lg object-contain"
        />

        {hasMultiple ? (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-2 z-10 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-4"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {photo.title ? (
        <div className="px-4 pb-4 text-center text-sm text-white/80">{photo.title}</div>
      ) : null}
    </div>,
    document.body,
  );
}
