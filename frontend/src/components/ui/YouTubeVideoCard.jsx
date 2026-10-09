import { useState } from "react";
import { Play } from "lucide-react";

export function YouTubeVideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      {isPlaying ? (
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative block aspect-video w-full overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-label={`Play video: ${video.title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-current" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </article>
  );
}
