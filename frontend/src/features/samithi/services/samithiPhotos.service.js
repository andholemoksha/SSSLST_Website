import { apiClient } from "@/api/client";

/**
 * One representative image per Samithi Connect activity, tagged by wing.
 * Returns an array of { wing, title, image }.
 */
export async function fetchSamithiPhotos() {
  const { data } = await apiClient.get("/samithi-connect/photos/");
  return data;
}
