import { useEffect, useReducer, useCallback } from "react";
import { getPrernaEditions } from "@/features/prerna/services/prerna.service";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { editions: [], isLoading: true, isError: false };
    case "success":
      return { editions: action.data, isLoading: false, isError: false };
    case "error":
      return { editions: state.editions, isLoading: false, isError: true };
    default:
      return state;
  }
}

/**
 * Hook to fetch Prerna yearbook editions from the API.
 * Refetches every 30 seconds so admin changes appear without manual refresh.
 */
export function usePrernaEditions() {
  const [state, dispatch] = useReducer(reducer, {
    editions: [],
    isLoading: true,
    isError: false,
  });

  const fetchEditions = useCallback(() => {
    getPrernaEditions()
      .then((data) => dispatch({ type: "success", data }))
      .catch(() => dispatch({ type: "error" }));
  }, []);

  useEffect(() => {
    dispatch({ type: "loading" });
    fetchEditions();

    // Refetch every 30 seconds so admin changes reflect without manual refresh
    const interval = setInterval(fetchEditions, 30000);
    return () => clearInterval(interval);
  }, [fetchEditions]);

  return state;
}
