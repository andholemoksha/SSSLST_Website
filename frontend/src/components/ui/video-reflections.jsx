import { useState } from "react";
import { Play } from "lucide-react";

import { Text } from "@/components/ui/Text/text";

/**
 * A single video card: shows the YouTube thumbnail with a play overlay, and
 * swaps to the embedded player on click (facade pattern — keeps load fast).
 */
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

function YearSection({ heading, videos }) {
  return (
    <div>
      <Text as="h3" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
        {heading}
      </Text>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.video_id} video={video} />
        ))}
      </div>
    </div>
  );
}

/**
 * Shared year-grouped video reflections grid.
 *
 * Renders a titled section with a YouTube facade grid per year. Both the
 * Dhyana Vahini and Samithi Connect features render this with their own
 * copy and data.
 *
 * @param {string} eyebrow - Small label above the title (e.g. "Dhyana Vahini").
 * @param {string} [title] - Main heading. Defaults to "Video Reflections".
 * @param {string} description - Intro paragraph under the title.
 * @param {(year: string|number) => string} yearHeading - Builds each year's heading.
 * @param {Array<{year: string|number, videos: Array}>} groups - Videos grouped by year.
 * @param {boolean} isLoading
 * @param {boolean} isError
 */
export function VideoReflections({
  eyebrow,
  title = "Video Reflections",
  description,
  yearHeading,
  groups,
  isLoading,
  isError,
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-2xl">
        <Text variant="eyebrow" size="sm">{eyebrow}</Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
          {title}
        </Text>
        <Text size="base" leading="relaxed" className="mt-4">
          {description}
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
      ) : groups.length ? (
        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <YearSection
              key={group.year}
              heading={yearHeading(group.year)}
              videos={group.videos}
            />
          ))}
        </div>
      ) : (
        <Text variant="muted" className="py-12 text-center">
          Video reflections will be published soon.
        </Text>
      )}
    </section>
  );
}
