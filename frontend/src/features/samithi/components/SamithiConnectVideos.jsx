import { useState } from "react";
import { Play } from "lucide-react";

import { Text } from "@/components/ui/Text/text";
import { useSamithiConnectVideos } from "@/features/samithi/hooks/useSamithiConnectVideos";

function VideoCard({ video }) {
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

export function SamithiConnectVideos() {
  const { videos, isLoading, isError } = useSamithiConnectVideos();

  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-2xl">
        <Text variant="eyebrow" size="sm">Samithi Connect</Text>
        <Text size="base" leading="relaxed" className="mt-4">
          Watch reflections from the Samithi Connect journey.
        </Text>
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="aspect-video animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : isError ? (
        <Text variant="muted" className="py-12 text-center">
          Unable to load videos. Please try again later.
        </Text>
      ) : videos.length ? (
        <div className="mt-10">
          <Text as="h2" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
            2026 Participants Reflections On Their Samithi Connect Journey.
          </Text>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.video_id} video={video} />
            ))}
          </div>
        </div>
      ) : (
        <Text variant="muted" className="py-12 text-center">
          Video reflections will be published soon.
        </Text>
      )}
    </section>
  );
}
