import { useEffect, useState } from "react";

import {
  getSamithiConnectText,
  getSamithiConnectTextYears,
} from "@/features/samithi/services/samithiConnectText.service";

export function useSamithiConnectTextYears() {
  const [state, setState] = useState({ years: [], isLoading: true, isError: false });

  useEffect(() => {
    let isCurrent = true;
    getSamithiConnectTextYears()
      .then((years) => isCurrent && setState({ years, isLoading: false, isError: false }))
      .catch(() => isCurrent && setState({ years: [], isLoading: false, isError: true }));
    return () => { isCurrent = false; };
  }, []);

  return state;
}

export function useSamithiConnectText(year) {
  const [state, setState] = useState({ year, reflections: [], isError: false });

  useEffect(() => {
    if (!year) return undefined;
    let isCurrent = true;
    getSamithiConnectText(year)
      .then((reflections) => isCurrent && setState({ year, reflections, isError: false }))
      .catch(() => isCurrent && setState({ year, reflections: [], isError: true }));
    return () => { isCurrent = false; };
  }, [year]);

  return {
    reflections: state.year === year ? state.reflections : [],
    isLoading: Boolean(year) && state.year !== year,
    isError: state.year === year && state.isError,
  };
}
