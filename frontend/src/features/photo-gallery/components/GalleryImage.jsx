import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * A lazy-loaded image that degrades gracefully: if the (Google Drive) image
 * fails to load, it shows a placeholder instead of a broken-image icon, so one
 * bad photo never breaks the grid or the lightbox.
 */
export function GalleryImage({ src, alt, className = "", imgClassName = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        <ImageOff className="h-6 w-6" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={imgClassName || className}
      referrerPolicy="no-referrer"
    />
  );
}
