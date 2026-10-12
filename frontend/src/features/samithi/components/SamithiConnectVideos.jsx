import { VideoReflections } from "@/components/ui/video-reflections";
import { useSamithiConnectVideosByYear } from "@/features/samithi/hooks/useSamithiConnectVideos";

/**
 * Samithi Connect video reflections — reuses the shared VideoReflections grid.
 */
export function SamithiConnectVideos() {
  const { groups, isLoading, isError } = useSamithiConnectVideosByYear();

  return (
    <VideoReflections
      eyebrow="Samithi Connect"
      description="Watch reflections from the Samithi Connect journey."
      yearHeading={(year) =>
        `${year} Participants Reflections On Their Samithi Connect Journey.`
      }
      groups={groups}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
