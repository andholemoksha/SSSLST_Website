import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  fetchGalleryAlbums,
  fetchGalleryPhotos,
  fetchGalleryYears,
} from "@/features/photo-gallery/services/photoGallery.service";

// Cache for 5 minutes — gallery content changes rarely (only on admin sync),
// so repeat visits and back/forward navigation avoid refetching.
const STALE_TIME = 5 * 60 * 1000;

/** Load available years. Runs once; cached and reused across the session. */
export function useGalleryYears() {
  return useQuery({
    queryKey: ["gallery", "years"],
    queryFn: fetchGalleryYears,
    staleTime: STALE_TIME,
  });
}

/** Load albums for the selected year. Only runs when a year is selected. */
export function useGalleryAlbums(year) {
  return useQuery({
    queryKey: ["gallery", "albums", year],
    queryFn: () => fetchGalleryAlbums(year),
    enabled: Boolean(year),
    staleTime: STALE_TIME,
  });
}

/**
 * Load photos for an album, page by page ("Load More"). Only runs when an
 * album is open. Each page is cached, so navigating back into an album reuses
 * what was already fetched.
 */
export function useGalleryPhotos(albumId) {
  return useInfiniteQuery({
    queryKey: ["gallery", "photos", albumId],
    queryFn: ({ pageParam = 1 }) => fetchGalleryPhotos(albumId, pageParam),
    enabled: Boolean(albumId),
    staleTime: STALE_TIME,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
  });
}
