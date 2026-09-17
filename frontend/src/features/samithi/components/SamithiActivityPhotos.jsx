import { useMemo, useState } from "react";

import { Text } from "@/components/ui/Text/text";
import { Loader } from "@/components/ui/loader";
import { GalleryImage } from "@/features/photo-gallery/components/GalleryImage";
import { GalleryLightbox } from "@/features/photo-gallery/components/GalleryLightbox";
import { useSamithiActivityPhotos } from "@/features/samithi/hooks/useSamithiPhotos";

/**
 * Photo grid + lightbox for one Samithi Connect activity.
 * Reuses the Photo Gallery image + lightbox components.
 */
export function SamithiActivityPhotos({ activityId }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSamithiActivityPhotos(activityId);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photos = useMemo(
    () => (data?.pages ?? []).flatMap((page) => page.results ?? []),
    [data],
  );

  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
  const next = () => setLightboxIndex((i) => (i < photos.length - 1 ? i + 1 : 0));

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Text variant="muted" className="py-10 text-center">
        These photos could not be loaded right now. Please try again later.
      </Text>
    );
  }

  if (photos.length === 0) {
    return (
      <Text variant="muted" className="py-10 text-center">
        Photos for this activity will be added soon.
      </Text>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open photo ${i + 1}`}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <GalleryImage
              src={photo.thumbnail_link}
              alt={photo.title || `Photo ${i + 1}`}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {hasNextPage ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {isFetchingNextPage ? <Loader className="h-4 w-4" /> : null}
            {isFetchingNextPage ? "Loading…" : "Load more photos"}
          </button>
        </div>
      ) : null}

      {lightboxIndex !== null ? (
        <GalleryLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </div>
  );
}
