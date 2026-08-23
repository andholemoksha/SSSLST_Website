import { apiClient } from "@/api/client";

export async function getDhyanaVahiniText(year) {
  const { data } = await apiClient.get("/dhyana-vahini/text/", {
    params: { year },
  });
  return data;
}
