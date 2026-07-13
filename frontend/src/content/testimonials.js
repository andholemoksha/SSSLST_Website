// Testimonials content: participant reflections + filter options + copy.
// Filtering is client-side now; the useTestimonials hook is shaped so it later
// becomes a single API call with the selected filters as query params
// (only the matching data is fetched). See AGENT.md.

import { indianStates } from "@/content/indianStates";

// Filter options shown in the sidebar.
export const testimonialFilters = {
  states: indianStates, // { slug, name } — multi-select
  years: [2025, 2024, 2023], // batches — multi-select
  genders: [
    { value: "women", label: "Women" },
    { value: "men", label: "Men" },
  ],
};

// Participant reflections. state = slug from indianStates.
// Populated later from the API (see useTestimonials). Empty until then.
export const participants = [];

// All user-facing copy for the Testimonials feature.
export const testimonialsContent = {
  page: {
    title: "Testimonials",
    description:
      "Reflections from our participants. Filter by state, batch, and more.",
  },
  searchPlaceholder: "Search by name or place…",
  filters: {
    heading: "Filters",
    states: "States",
    years: "Batch",
    gender: "Gender",
    clearAll: "Clear all",
    stateSearch: "Filter states…",
  },
  resultsCount: (n) => `${n} ${n === 1 ? "testimonial" : "testimonials"}`,
  empty: "No testimonials match your filters. Try clearing a few.",
};
