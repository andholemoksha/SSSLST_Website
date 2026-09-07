import { useQuery } from "@tanstack/react-query";
import { getAdmissions } from "@/features/admissions/services/admissions.service";

/**
 * Load the site-wide admissions ("Apply Now") settings.
 * Cached for the session so the global card only fetches once.
 */
export function useAdmissions() {
  return useQuery({
    queryKey: ["admissions"],
    queryFn: getAdmissions,
    staleTime: 5 * 60 * 1000,
  });
}
