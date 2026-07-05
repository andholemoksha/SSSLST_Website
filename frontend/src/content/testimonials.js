// Testimonials hub data.
//
// Each year lists the SLUGS of states to show. Names come from the canonical
// list in indianStates.js and are sorted alphabetically automatically.
//
// Currently every year shows all 28 states (`stateSlugs`). Union territories are
// excluded. To customise a year, use a specific list, e.g.
//   { year: 2022, stateSlugs: ["telangana", "andhra-pradesh"] }
// To also include UTs, import and use `allRegionSlugs` instead.
// To add a brand-new state: add it once in indianStates.js.
//
// Participant lists per (year, state) will come from Django later
// (see AGENT.md: Component -> Hook -> Service -> API).

import { stateSlugs, getStatesBySlugs } from "@/content/indianStates";

const yearsRaw = [
  { year: 2025, stateSlugs: stateSlugs },
  { year: 2024, stateSlugs: stateSlugs },
  { year: 2023, stateSlugs: stateSlugs },
];

// Resolve slugs -> full, alphabetically-sorted state objects for each year.
export const testimonialYears = yearsRaw.map((entry) => ({
  year: entry.year,
  states: getStatesBySlugs(entry.stateSlugs),
}));

// All user-facing text for the Testimonials feature (keep copy out of components).
export const testimonialsContent = {
  page: {
    title: "Testimonials",
    description:
      "Reflections from our participants, year by year and state by state.",
  },
  batchLabel: "Batch",
  emptyMessage: "Testimonials aren't available yet. Check back soon.",
  backLabel: "Back to Testimonials",
  statePage: {
    // templated copy — component passes the dynamic state/year
    description: (year) => `Participant reflections · ${year}`,
    comingSoon: (state, year) =>
      `Testimonials for ${state} (${year}) are coming soon.`,
  },
};
