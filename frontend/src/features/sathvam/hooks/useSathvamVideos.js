import { useEffect, useReducer } from "react";
import { getSathvamVideos } from "@/features/sathvam/services/sathvam.service";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { videos: [], isLoading: true, isError: false };
    case "success":
      return { videos: action.data, isLoading: false, isError: false };
    case "error":
      return { videos: [], isLoading: false, isError: true };
    default:
      return state;
  }
}

/**
 * Hook to fetch Sathvam videos for a specific year.
 */
export function useSathvamVideos(year) {
  const [state, dispatch] = useReducer(reducer, {
    videos: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    if (!year) return;

    let mounted = true;
    dispatch({ type: "loading" });

    getSathvamVideos(year)
      .then((data) => {
        if (mounted) dispatch({ type: "success", data });
      })
      .catch(() => {
        if (mounted) dispatch({ type: "error" });
      });

    return () => { mounted = false; };
  }, [year]);

  return state;
}
