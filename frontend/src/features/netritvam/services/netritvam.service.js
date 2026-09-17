import { apiClient } from "@/api/client";

/**
 * Fetch the Netritvam publication editions.
 * Returns { latest, groups: [{ year, is_current, issues: [...] }] }
 * (years ascending for the archive layout; issues 1 -> N within a year).
 */
export async function fetchNetritvam() {
  const { data } = await apiClient.get("/v1/publications/");
  return data;
}
