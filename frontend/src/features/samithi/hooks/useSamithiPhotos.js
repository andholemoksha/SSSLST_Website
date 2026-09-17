import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  fetchSamithiActivities,
  fetchSamithiPhotos,
  fetchSamithiWings,
} from "@/features/samithi/services/samithiPhotos.service";

const STALE_TIME = 5 * 60 * 1000;

/** Wings that have activities with photos. */
export function useSamithiWings() {
  return useQuery({
    queryKey: ["samithi", "wings"],
    queryFn: fetchSamithiWings,
    staleTime: STALE_TIME,
  });
}

/** Activities (with photos) for a wing. */
export function useSamithiActivities(wing) {
  return useQuery({
    queryKey: ["samithi", "activities", wing],
    queryFn: () => fetchSamithiActivities(wing),
    enabled: Boolean(wing),
    staleTime: STALE_TIME,
  });
}

/** Photos for an activity, page by page ("Load more"). */
export function useSamithiActivityPhotos(activityId) {
  return useInfiniteQuery({
    queryKey: ["samithi", "photos", activityId],
    queryFn: ({ pageParam = 1 }) => fetchSamithiPhotos(activityId, pageParam),
    enabled: Boolean(activityId),
    staleTime: STALE_TIME,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
  });
}
