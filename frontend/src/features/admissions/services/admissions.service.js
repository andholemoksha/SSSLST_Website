import { apiClient } from "@/api/client";

/**
 * Fetch the admissions "Apply Now" card settings.
 * Returns { is_active, apply_url, headline, subtext }.
 */
export async function getAdmissions() {
  const { data } = await apiClient.get("/apply/");
  return data;
}
