import { apiClient } from "@/api/client";

/** Wings that have activities with photos (+ counts, cover). */
export async function fetchSamithiWings() {
  const { data } = await apiClient.get("/samithi-connect/wings/");
  return data;
}

/** Activities for a wing (only those that contain photos). */
export async function fetchSamithiActivities(wing) {
  const { data } = await apiClient.get("/samithi-connect/activities/", {
    params: { wing },
  });
  return data;
}

/** A page of photos for an activity. Returns { count, next, previous, results }. */
export async function fetchSamithiPhotos(activityId, page = 1) {
  const { data } = await apiClient.get("/samithi-connect/photos/", {
    params: { activity: activityId, page },
  });
  return data;
}
