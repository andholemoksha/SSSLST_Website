import { VideoReflections } from "@/components/ui/video-reflections";
import { useDhyanaVahiniVideosByYear } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniVideos";

/**
 * Dhyana Vahini video reflections — reuses the shared VideoReflections grid.
 */
export function DhyanaVahiniVideos() {
  const { groups, isLoading, isError } = useDhyanaVahiniVideosByYear();

  return (
    <VideoReflections
      eyebrow="Dhyana Vahini"
      description="Watch reflections from the Dhyana Vahini journey."
      yearHeading={(year) =>
        `${year} Participants Reflections On Their Dhyana Vahini Journey.`
      }
      groups={groups}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
