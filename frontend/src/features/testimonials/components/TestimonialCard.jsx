import { useState } from "react";
import { Play } from "lucide-react";
import { Text } from "@/components/ui/Text/text";

/**
 * A single testimonial video card. Shows a cover photo with a play overlay;
 * clicking opens the video in a modal player (handled by the parent via onPlay).
 *
 * Cover source is a fallback chain:
 *   1. admin-set cover (coverImage)
 *   2. auto-derived Drive thumbnail (autoThumbnail)
 *   3. a plain gradient tile (if both fail / are missing)
 */
export function TestimonialCard({ number, coverImage, autoThumbnail, onPlay }) {
  // Ordered list of image candidates to try.
  const candidates = [coverImage, autoThumbnail].filter(Boolean);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const currentSrc = candidates[candidateIndex] || null;

  const label = `Testimonial ${number}`;

  const handleImgError = () => {
    // Move to the next candidate; when we run out, currentSrc becomes null and
    // the gradient tile shows instead.
    setCandidateIndex((i) => i + 1);
  };

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${label}`}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gradient-highlight">
        {currentSrc ? (
          <img
            src={currentSrc}
            alt={label}
            loading="lazy"
            onError={handleImgError}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        {/* Play overlay sits above the cover */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 fill-current" aria-hidden="true" />
        </div>
      </div>
      <div className="px-4 py-3">
        <Text as="p" variant="body" size="sm" className="font-medium text-heading">
          {label}
        </Text>
      </div>
    </button>
  );
}
