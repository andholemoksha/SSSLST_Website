import { useEffect, useReducer } from "react";
import {
  getSamithiConnectVideoYears,
  getSamithiConnectVideos,
} from "@/features/samithi/services/samithiConnectVideo.service";

/**
 * Load Samithi Connect videos grouped by year.
 *
 * Returns { groups, isLoading, isError } where each group is { year, videos }.
 * Years are ordered oldest-first so newly added years append below existing ones.
 */
export function useSamithiConnectVideosByYear() {
  const [state, dispatch] = useReducer(
    (currentState, action) => {
      switch (action.type) {
        case "loading":
          return { groups: [], isLoading: true, isError: false };
        case "success":
          return { groups: action.data, isLoading: false, isError: false };
        case "error":
          return { groups: [], isLoading: false, isError: true };
        default:
          return currentState;
      }
    },
    { groups: [], isLoading: true, isError: false },
  );

  useEffect(() => {
    let isCurrent = true;
    dispatch({ type: "loading" });

    getSamithiConnectVideoYears()
      .then((years) => {
        const orderedYears = [...years].sort((a, b) => a - b);
        return Promise.all(
          orderedYears.map((year) =>
            getSamithiConnectVideos(year).then((videos) => ({ year, videos })),
          ),
        );
      })
      .then((groups) => {
        if (isCurrent) {
          dispatch({
            type: "success",
            data: groups.filter((group) => group.videos.length > 0),
          });
        }
      })
      .catch(() => isCurrent && dispatch({ type: "error" }));

    return () => {
      isCurrent = false;
    };
  }, []);

  return state;
}
