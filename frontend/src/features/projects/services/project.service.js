import { apiClient } from "@/api/client";

export async function getProjects() {
  const { data } = await apiClient.get("/projects/");
  return data;
}
