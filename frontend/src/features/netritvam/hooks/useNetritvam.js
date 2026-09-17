import { useEffect, useState } from "react";
import { fetchNetritvam } from "@/features/netritvam/services/netritvam.service";

/**
 * Load the Netritvam publication editions from the API.
 * @returns {{ data: object|null, isLoading: boolean, error: unknown }}
 */
export function useNetritvam() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    fetchNetritvam()
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
