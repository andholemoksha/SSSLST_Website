import { useState } from "react";
import { Images } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Loader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text/text";
import { GalleryImage } from "@/features/photo-gallery/components/GalleryImage";
import { GalleryAlbumView } from "@/features/photo-gallery/components/GalleryAlbumView";
import { useGalleryAlbums, useGalleryYears } from "@/features/photo-gallery/hooks/useGallery";

function YearTabs({ years, selectedYear, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {years.map((row) => {
        const isActive = row.year === selectedYear;
        return (
          <button
            key={row.year}
            type="button"
            onClick={() => onSelect(row.year)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-heading hover:bg-muted"
            }`}
          >
            {row.year}
          </button>
        );
      })}
    </div>
  );
}

function AlbumCard({ album, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(album)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <GalleryImage
          src={album.cover_image}
          alt={album.title}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <Text as="p" variant="body" size="sm" className="line-clamp-1 font-medium text-heading">
          {album.title}
        </Text>
        <Text as="span" size="xs" className="shrink-0 text-muted-foreground">
          {album.photo_count} {album.photo_count === 1 ? "photo" : "photos"}
        </Text>
      </div>
    </button>
  );
}

export function PhotoGalleryPage() {
  const yearsQuery = useGalleryYears();
  // null = "not chosen yet"; fall back to the newest year without an effect.
  const [chosenYear, setChosenYear] = useState(null);
  const [openAlbum, setOpenAlbum] = useState(null);

  const selectedYear = chosenYear ?? yearsQuery.data?.[0]?.year ?? null;

  const albumsQuery = useGalleryAlbums(selectedYear);

  const handleSelectYear = (year) => {
    setOpenAlbum(null);
    setChosenYear(year);
  };

  return (
    <>
      <PageHeader
        title="Photo Gallery"
        description="Explore memories from SSSLST programmes and activities."
      />
      <section className="bg-background py-10 sm:py-14">
        <Container>
          {/* Years */}
          {yearsQuery.isLoading ? (
            <div className="flex justify-center py-16">
              <Loader />
            </div>
          ) : yearsQuery.isError ? (
            <Text variant="muted" className="py-16 text-center">
              The gallery could not be loaded right now. Please try again later.
            </Text>
          ) : (yearsQuery.data?.length ?? 0) === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Images className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
              <Text variant="muted">Photos will be added soon.</Text>
            </div>
          ) : openAlbum ? (
            <GalleryAlbumView album={openAlbum} onBack={() => setOpenAlbum(null)} />
          ) : (
            <>
              <YearTabs
                years={yearsQuery.data}
                selectedYear={selectedYear}
                onSelect={handleSelectYear}
              />

              <div className="mt-8">
                {albumsQuery.isLoading ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="aspect-video animate-pulse rounded-xl bg-muted" />
                    ))}
                  </div>
                ) : albumsQuery.isError ? (
                  <Text variant="muted" className="py-10 text-center">
                    Albums could not be loaded right now. Please try again later.
                  </Text>
                ) : (albumsQuery.data?.length ?? 0) === 0 ? (
                  <Text variant="muted" className="py-10 text-center">
                    No albums for {selectedYear} yet.
                  </Text>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {albumsQuery.data.map((album) => (
                      <AlbumCard key={album.id} album={album} onOpen={setOpenAlbum} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
