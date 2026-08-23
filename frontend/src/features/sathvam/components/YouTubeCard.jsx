import { useState } from "react";
import { Play } from "lucide-react";
import { Text } from "@/components/ui/Text/text";

/**
 * YouTubeCard — Facade pattern video player.
 *
 * Initially renders a lightweight thumbnail image + play button overlay.
 * On click, swaps to the actual YouTube iframe (autoplay).
 * This keeps page loads fast — only active video loads the heavy player.
 */
export function YouTubeCard({ videoId, title }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="px-4 py-3">
          <Text as="p" variant="body" size="sm" className="line-clamp-2 font-medium text-heading">
            {title}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40"
      aria-label={`Play video: ${title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 fill-current" />
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <Text as="p" variant="body" size="sm" className="line-clamp-2 font-medium text-heading">
          {title}
        </Text>
      </div>
    </button>
  );
}
