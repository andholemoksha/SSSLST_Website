import { useEffect, useState } from "react";
import { fetchNewsletters } from "@/features/newsletter/services/newsletter.service";

/**
 * Load the monthly newsletter editions from the API.
 * @returns {{ data: object|null, isLoading: boolean, error: unknown }}
 */
export function useNewsletters() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);
    fetchNewsletters()
      .then((result) => {
        if (isCurrent) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (isCurrent) setError(err);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { data, isLoading, error };
}
