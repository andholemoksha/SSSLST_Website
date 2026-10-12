import { apiClient } from "@/api/client";

export async function getSamithiConnectVideoYears() {
  const { data } = await apiClient.get("/samithi-connect/videos/years/");
  return data;
}

export async function getSamithiConnectVideos(year) {
  const { data } = await apiClient.get("/samithi-connect/videos/", {
    params: { year },
  });
  return data;
}
