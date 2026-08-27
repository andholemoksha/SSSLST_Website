import { apiClient } from "@/api/client";

/**
 * Fetch all active Prerna editions (newest first).
 * @returns {Promise<Array<{year, title, description, pdf_url, cover_image_url}>>}
 */
export async function getPrernaEditions() {
  const { data } = await apiClient.get("/prerna/editions/");
  return data;
}
