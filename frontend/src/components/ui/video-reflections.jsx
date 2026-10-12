import { Text } from "@/components/ui/Text/text";
import { YouTubeCard } from "@/components/ui/youtube-card";

function YearSection({ heading, videos }) {
  return (
    <div>
      <Text as="h3" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
        {heading}
      </Text>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <YouTubeCard key={video.video_id} videoId={video.video_id} title={video.title} />
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
