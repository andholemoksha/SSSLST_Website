import { useEffect, useState } from "react";
import { getSathvamYears } from "@/features/sathvam/services/sathvam.service";

/**
 * Hook to fetch available Sathvam years from the API.
 * Falls back to static content if the API is unavailable.
 */
export function useSathvamYears() {
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;

    getSathvamYears()
      .then((data) => {
        if (mounted) setYears(data);
      })
      .catch(() => {
        if (mounted) setIsError(true);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return { years, isLoading, isError };
}
