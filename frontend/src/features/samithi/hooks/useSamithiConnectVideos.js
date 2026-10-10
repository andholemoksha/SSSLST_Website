import { useEffect, useState } from "react";

import { getSamithiConnectVideos } from "@/features/samithi/services/samithiConnectVideo.service";

export function useSamithiConnectVideos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    getSamithiConnectVideos()
      .then((data) => isCurrent && setVideos(data))
      .catch(() => isCurrent && setIsError(true))
      .finally(() => isCurrent && setIsLoading(false));
    return () => { isCurrent = false; };
  }, []);

  return { videos, isLoading, isError };
}
