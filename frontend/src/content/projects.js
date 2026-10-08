// Static options + copy for the Projects Archive.
//
// Projects themselves come from Django (GET /api/projects/). The filter option
// lists below are intentionally hardcoded: wings and genders are fixed enums,
// and years/states change rarely enough to maintain here. The INDIAN_STATES
// values MUST match the backend State TextChoices (website/models/projects.py).

// The 8 wings. `slug` matches the backend `category` value; `label` is shown.
export const WINGS = [
  { slug: "spiritual", label: "Spiritual Wing" },
  { slug: "service", label: "Service Wing" },
  { slug: "education", label: "Education Wing" },
  { slug: "youth", label: "Youth Wing" },
  { slug: "medical", label: "Medical / Healthcare" },
  { slug: "rural", label: "Rural Development" },
  { slug: "environment", label: "Environment" },
  { slug: "other", label: "Other" },
];

export const GENDERS = ["Mahila", "Gents"];

// Descending year range shown as filter chips. Extend as new batches arrive.
export const PROJECT_YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

// Indian states + union territories. Must stay in sync with backend State choices.
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// Per-wing accent palette for the card top-bar and category badge.
// The actual colours are defined as CSS variables in index.css (the single
// source of truth); here we just reference them by var() so the card can pick
// a palette at runtime from the wing slug. `bar` = top accent;
// `badgeBg`/`badgeText` = pill colours.
function wingVars(slug) {
  return {
    bar: `var(--wing-${slug}-bar)`,
    badgeBg: `var(--wing-${slug}-badge-bg)`,
    badgeText: `var(--wing-${slug}-badge-text)`,
  };
}

export const WING_ACCENTS = Object.fromEntries(
  WINGS.map((w) => [w.slug, wingVars(w.slug)])
);

const DEFAULT_ACCENT = wingVars("other");

/** Accent palette for a wing slug, with a safe fallback. */
export function wingAccent(slug) {
  return WING_ACCENTS[slug] ?? DEFAULT_ACCENT;
}

// User-facing copy for the Projects Archive (keep copy out of components).
export const projectsContent = {
  searchPlaceholder: "Search projects...",
  stateSearchPlaceholder: "Filter states...",
  countNoun: "Projects",
  emptyMessage: "No projects match your filters. Try clearing some.",
  errorMessage: "Projects aren't available right now. Please try again later.",
  filtersLabel: "Filters",
  clearAllLabel: "Clear all",
  applyLabel: "Apply Filters",
  viewLabel: "View",
};
