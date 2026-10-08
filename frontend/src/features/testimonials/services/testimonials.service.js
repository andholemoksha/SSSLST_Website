import { apiClient } from "@/api/client";

/**
 * Fetch all active testimonial videos.
 * @returns {Promise<Array<{id, video_url, embed_url}>>} bare array
 */
export async function fetchTestimonials() {
  const { data } = await apiClient.get("/testimonials/");
  return data;
}
