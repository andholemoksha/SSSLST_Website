import { useEffect, useState } from "react";
import { fetchTestimonials } from "@/features/testimonials/services/testimonials.service";

/**
 * Load the testimonial videos from the API.
 * @returns {{ data: Array, isLoading: boolean, isError: boolean }}
 */
export function useTestimonials() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    fetchTestimonials()
      .then((result) => {
        if (isCurrent) {
          setData(Array.isArray(result) ? result : []);
          setIsError(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setData([]);
          setIsError(true);
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return { data, isLoading, isError };
}
