import { participants } from "@/content/testimonials";

/**
 * Returns participant testimonials matching the given filters.
 *
 * filters = { search, states: string[], years: number[], genders: string[] }
 *
 * Today: filters the static list client-side.
 * Tomorrow: becomes ONE API call with the filters as query params, e.g.
 *   GET /api/testimonials?search=&states=telangana,kerala&years=2025&gender=women
 * so only the matching rows are fetched (fast, no over-fetching). The component
 * never changes — same { data, isLoading, isError } shape. See AGENT.md.
 */
export function useTestimonials(filters) {
  const { search = "", states = [], years = [], genders = [] } = filters || {};
  const q = search.trim().toLowerCase();

  const data = participants.filter((p) => {
    if (q && !`${p.name} ${p.place}`.toLowerCase().includes(q)) return false;
    if (states.length && !states.includes(p.state)) return false;
    if (years.length && !years.includes(p.year)) return false;
    if (genders.length && !genders.includes(p.gender)) return false;
    return true;
  });

  return { data, isLoading: false, isError: false };
}
