import { apiClient } from "@/api/client";

export async function getSamithiConnectTextYears() {
  const { data } = await apiClient.get("/samithi-connect/text/years/");
  return data;
}

export async function getSamithiConnectText(year) {
  const { data } = await apiClient.get("/samithi-connect/text/", {
    params: { year },
  });
  return data;
}
