import { apiClient } from "@/api/client";

export async function getSamithiConnectVideos() {
  const { data } = await apiClient.get("/samithi-connect/videos/");
  return data;
}
