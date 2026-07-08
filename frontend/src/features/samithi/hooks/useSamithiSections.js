import { samithiSections } from "@/content/samithiConnect";

/**
 * Returns the Samithi Connect sections (Spiritual, Education, Service, Reflections).
 *
 * Today: static content. Tomorrow: swap to React Query + a service call.
 * Return shape mirrors React Query so the component never changes.
 * See AGENT.md > Hooks.
 */
export function useSamithiSections() {
  return { data: samithiSections, isLoading: false, isError: false };
}
