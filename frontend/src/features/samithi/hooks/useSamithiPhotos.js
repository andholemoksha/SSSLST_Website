import { useQuery } from "@tanstack/react-query";

import { fetchSamithiPhotos } from "@/features/samithi/services/samithiPhotos.service";

const STALE_TIME = 5 * 60 * 1000;

/**
 * Samithi Connect photos (one per activity, tagged by wing) for the page carousel.
 * Returns { items, isLoading, isError } where each item is { wing, title, image }.
 */
export function useSamithiPhotos() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["samithi", "photos"],
    queryFn: fetchSamithiPhotos,
    staleTime: STALE_TIME,
  });

  return {
    items: data ?? [],
    isLoading,
    isError,
  };
}
