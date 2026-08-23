import { apiClient } from "@/api/client";

export async function getDhyanaVahiniYears() {
  const { data } = await apiClient.get("/dhyana-vahini/years/");
  return data;
}

export async function getDhyanaVahiniVideos(year) {
  const { data } = await apiClient.get("/dhyana-vahini/videos/", {
    params: { year },
  });
  return data;
}
