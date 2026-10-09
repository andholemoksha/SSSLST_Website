import { Text } from "@/components/ui/Text/text";
import { YouTubeVideoCard } from "@/components/ui/YouTubeVideoCard";
import { useSamithiConnectVideos } from "@/features/samithi/hooks/useSamithiConnectVideos";

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
              <YouTubeVideoCard key={video.video_id} video={video} />
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
