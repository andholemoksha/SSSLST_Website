import { testimonialYears } from "@/content/testimonials";

/**
 * Returns testimonials grouped by year (each year has alphabetical states).
 *
 * Today: static content. Tomorrow: swap to React Query + a service call.
 * Return shape mirrors React Query so the component never changes.
 * See AGENT.md > Hooks.
 */
export function useTestimonialYears() {
  return { data: testimonialYears, isLoading: false, isError: false };
}
