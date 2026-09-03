import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Text } from "@/components/ui/Text/text";
import { Loader } from "@/components/ui/loader";
import { GalleryImage } from "@/features/photo-gallery/components/GalleryImage";
import { GalleryLightbox } from "@/features/photo-gallery/components/GalleryLightbox";
import { useGalleryPhotos } from "@/features/photo-gallery/hooks/useGallery";

export function GalleryAlbumView({ album, onBack }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGalleryPhotos(album.id);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Flatten all loaded pages into a single photo list.
  const photos = useMemo(
    () => (data?.pages ?? []).flatMap((page) => page.results ?? []),
    [data],
  );

  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
  const next = () => setLightboxIndex((i) => (i < photos.length - 1 ? i + 1 : 0));

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to albums
      </button>

      <Text as="h2" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
        {album.title}
      </Text>
      {album.description ? (
        <Text variant="muted" size="sm" className="mt-2 max-w-2xl">
          {album.description}
        </Text>
      ) : null}

      {isLoading ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : isError ? (
        <Text variant="muted" className="mt-10 text-center">
          These photos could not be loaded right now. Please try again later.
        </Text>
      ) : photos.length === 0 ? (
        <Text variant="muted" className="mt-10 text-center">
          No photos in this album yet.
        </Text>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Open photo ${i + 1}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <GalleryImage
                  src={photo.thumbnail_link}
                  alt={photo.title || `Gallery photo ${i + 1}`}
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
        </>
      )}

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
