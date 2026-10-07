import { apiClient } from "@/api/client";

/**
 * Fetch a page of projects from the archive API.
 *
 * @param {object} params
 * @param {string} [params.search]
 * @param {Array<number|string>} [params.year]
 * @param {string[]} [params.state]
 * @param {string[]} [params.gender]
 * @param {string[]} [params.category]  wing slugs
 * @param {number} [params.page]
 * @returns {Promise<{count:number,next:string|null,previous:string|null,results:object[]}>}
 */
export async function getProjects(params = {}) {
  const { search, year, state, gender, category, page } = params;

  // URLSearchParams appends one entry per value, giving repeated keys for
  // arrays (?state=A&state=B) which the backend reads via getlist().
  const query = new URLSearchParams();

  if (search) query.set("search", search);
  appendAll(query, "year", year);
  appendAll(query, "state", state);
  appendAll(query, "gender", gender);
  appendAll(query, "category", category);
  if (page && page > 1) query.set("page", String(page));

  const { data } = await apiClient.get("/projects/", { params: query });
  return data;
}

function appendAll(query, key, values) {
  if (!values) return;
  const list = Array.isArray(values) ? values : [values];
  for (const value of list) {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  }
}
