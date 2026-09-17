import { apiClient } from "@/api/client";

/**
 * Fetch the Netritvam issues.
 * Returns { latest, issues: [...] } (issues ordered Netritvam-1 -> N).
 */
export async function fetchNetritvam() {
  const { data } = await apiClient.get("/netritvam/");
  return data;
}
