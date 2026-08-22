import { useState } from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text/text";
import {
  useDhyanaVahiniVideos,
  useDhyanaVahiniYears,
} from "@/features/dhyana-vahini/hooks/useDhyanaVahiniVideos";

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
      <div className="px-4 py-3">
        <Text as="h3" size="sm" className="line-clamp-2 font-medium text-heading">
          {video.title}
        </Text>
      </div>
    </article>
  );
}

export function DhyanaVahiniVideos() {
  const { years, isLoading: yearsLoading, isError: yearsError } = useDhyanaVahiniYears();
  const [selectedYear, setSelectedYear] = useState(null);
  const activeYear = years.includes(selectedYear) ? selectedYear : (years[0] ?? null);
  const { videos, isLoading: videosLoading, isError: videosError } = useDhyanaVahiniVideos(activeYear);
  const hasMultipleYears = years.length > 1;

  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Text variant="eyebrow" size="sm">Dhyana Vahini</Text>
          <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
            Video Reflections
          </Text>
          <Text size="base" leading="relaxed" className="mt-4">
            Watch guided reflections from the Dhyana Vahini journey.
          </Text>
        </div>
        {!yearsLoading && !yearsError && years.length === 1 && (
          <Text variant="label" size="sm" color="text-accent">{years[0]}</Text>
        )}
      </div>

      {hasMultipleYears && (
        <div className="mt-7 flex flex-wrap gap-3">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              aria-pressed={activeYear === year}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40",
                activeYear === year ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {yearsLoading || videosLoading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="aspect-video animate-pulse rounded-xl bg-muted" />)}
        </div>
      ) : yearsError || videosError ? (
        <Text variant="muted" className="py-12 text-center">Unable to load videos. Please try again later.</Text>
      ) : videos.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => <VideoCard key={video.video_id} video={video} />)}
        </div>
      ) : (
        <Text variant="muted" className="py-12 text-center">Video reflections will be published soon.</Text>
      )}
    </section>
  );
}
