import { YouTubeCard } from "@/features/sathvam/components/YouTubeCard";
import { Text } from "@/components/ui/Text/text";

/**
 * SathvamVideoGrid
 *
 * Renders the video grid for a selected year. Uses the facade pattern —
 * each card is a thumbnail until clicked.
 */
export function SathvamVideoGrid({ videos, isLoading, isError }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Text variant="muted" className="py-12 text-center">
        Unable to load videos. Please try again later.
      </Text>
    );
  }

  if (videos.length === 0) {
    return (
      <Text variant="muted" className="py-12 text-center">
        No videos available for this year yet.
      </Text>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <YouTubeCard
          key={video.video_id}
          videoId={video.video_id}
          title={video.title}
        />
      ))}
    </div>
  );
}
