import { useEffect, useState } from "react";

import { getDhyanaVahiniText } from "@/features/dhyana-vahini/services/dhyanaVahiniText.service";

export function useDhyanaVahiniText(year) {
  const [state, setState] = useState({ year, reflections: [], isError: false });

  useEffect(() => {
    let isCurrent = true;
    getDhyanaVahiniText(year)
      .then((data) => isCurrent && setState({ year, reflections: data, isError: false }))
      .catch(() => isCurrent && setState({ year, reflections: [], isError: true }));
    return () => { isCurrent = false; };
  }, [year]);

  return {
    reflections: state.year === year ? state.reflections : [],
    isLoading: state.year !== year,
    isError: state.year === year && state.isError,
  };
}
