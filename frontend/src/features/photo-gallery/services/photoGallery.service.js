import { apiClient } from "@/api/client";

/** Years that have at least one album with photos (newest first). */
export async function fetchGalleryYears() {
  const { data } = await apiClient.get("/gallery/years/");
  return data;
}

/** Active albums for a year (only those that contain photos). */
export async function fetchGalleryAlbums(year) {
  const { data } = await apiClient.get("/gallery/albums/", { params: { year } });
  return data;
}

/** A page of photos for an album. Returns { count, next, previous, results }. */
export async function fetchGalleryPhotos(albumId, page = 1) {
  const { data } = await apiClient.get("/gallery/photos/", {
    params: { album: albumId, page },
  });
  return data;
}
