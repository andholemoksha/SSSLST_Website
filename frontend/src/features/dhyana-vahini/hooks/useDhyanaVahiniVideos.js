import { useEffect, useReducer, useState } from "react";

import {
  getDhyanaVahiniVideos,
  getDhyanaVahiniYears,
} from "@/features/dhyana-vahini/services/dhyanaVahiniVideo.service";

export function useDhyanaVahiniYears() {
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    getDhyanaVahiniYears()
      .then((data) => isCurrent && setYears(data))
      .catch(() => isCurrent && setIsError(true))
      .finally(() => isCurrent && setIsLoading(false));
    return () => { isCurrent = false; };
  }, []);

  return { years, isLoading, isError };
}

export function useDhyanaVahiniVideos(year) {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case "loading":
        return { videos: [], isLoading: true, isError: false };
      case "success":
        return { videos: action.data, isLoading: false, isError: false };
      case "error":
        return { videos: [], isLoading: false, isError: true };
      case "idle":
        return { videos: [], isLoading: false, isError: false };
      default:
        return currentState;
    }
  }, { videos: [], isLoading: Boolean(year), isError: false });

  useEffect(() => {
    if (!year) {
      dispatch({ type: "idle" });
      return undefined;
    }
    let isCurrent = true;
    dispatch({ type: "loading" });
    getDhyanaVahiniVideos(year)
      .then((data) => isCurrent && dispatch({ type: "success", data }))
      .catch(() => isCurrent && dispatch({ type: "error" }));
    return () => { isCurrent = false; };
  }, [year]);

  return state;
}
