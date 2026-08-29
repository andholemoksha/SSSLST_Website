import { apiClient } from "@/api/client";

/**
 * Fetch the monthly newsletter editions.
 * Returns { latest, groups: [{ year, issues: [...] }] } (newest year first, Jan->Dec).
 */
export async function fetchNewsletters() {
  const { data } = await apiClient.get("/newsletters/");
  return data;
}
