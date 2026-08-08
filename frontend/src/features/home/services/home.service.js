import { apiClient } from "@/api/client";

let homeStatsRequest = null;

export async function getHomeStats({ force = false } = {}) {
    if (!force && homeStatsRequest) {
        return homeStatsRequest;
    }

    homeStatsRequest = apiClient
        .get("/home/stats/")
        .then(({ data }) => data)
        .catch((error) => {
            homeStatsRequest = null;
            throw error;
        });

    return homeStatsRequest;
}
