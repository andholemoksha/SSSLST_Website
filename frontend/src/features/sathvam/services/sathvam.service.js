import { apiClient } from "@/api/client";

/**
 * Fetch the list of available years for Sathvam videos.
 * @returns {Promise<number[]>}
 */
export async function getSathvamYears() {
  const { data } = await apiClient.get("/sathvam/years/");
  return data;
}

/**
 * Fetch videos for a specific year.
 * @param {number} year
 * @returns {Promise<Array<{video_id: string, title: string, published_at: string, order: number}>>}
 */
export async function getSathvamVideos(year) {
  const { data } = await apiClient.get("/sathvam/videos/", {
    params: { year },
  });
  return data;
}
