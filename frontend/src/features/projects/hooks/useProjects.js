import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProjects } from "@/features/projects/services/project.service";

/**
 * Fetch a page of projects for the given filters.
 *
 * @param {object} filters  { search, year[], state[], gender[], category[] }
 * @param {number} page      1-based page number
 */
export function useProjects(filters, page) {
  return useQuery({
    // Query key captures every input so changing a filter/page refetches and
    // caches independently.
    queryKey: ["projects", "list", filters, page],
    queryFn: () => getProjects({ ...filters, page }),
    // Keep showing the previous page's results while the next page loads, so
    // the grid doesn't flash empty during pagination/filtering.
    placeholderData: keepPreviousData,
  });
}
