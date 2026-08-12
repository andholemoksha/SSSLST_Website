import { useEffect, useState } from "react";
import { getSathvamVideos } from "@/features/sathvam/services/sathvam.service";

/**
 * Hook to fetch Sathvam videos for a specific year.
 */
export function useSathvamVideos(year) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!year) return;

    let mounted = true;
    setIsLoading(true);
    setIsError(false);

    getSathvamVideos(year)
      .then((data) => {
        if (mounted) setVideos(data);
      })
      .catch(() => {
        if (mounted) setIsError(true);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => { mounted = false; };
  }, [year]);

  return { videos, isLoading, isError };
}
