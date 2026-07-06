// Canonical list of Indian states + union territories (single source of truth).
// Reuse anywhere a state is referenced (Testimonials, Projects, SYC directory).
// Add a new state/UT here ONCE; every feature that references it by slug picks it up.

// 28 states
export const indianStates = [
  { slug: "andhra-pradesh", name: "Andhra Pradesh" },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh" },
  { slug: "assam", name: "Assam" },
  { slug: "bihar", name: "Bihar" },
  { slug: "chhattisgarh", name: "Chhattisgarh" },
  { slug: "goa", name: "Goa" },
  { slug: "gujarat", name: "Gujarat" },
  { slug: "haryana", name: "Haryana" },
  { slug: "himachal-pradesh", name: "Himachal Pradesh" },
  { slug: "jharkhand", name: "Jharkhand" },
  { slug: "karnataka", name: "Karnataka" },
  { slug: "kerala", name: "Kerala" },
  { slug: "madhya-pradesh", name: "Madhya Pradesh" },
  { slug: "maharashtra", name: "Maharashtra" },
  { slug: "manipur", name: "Manipur" },
  { slug: "meghalaya", name: "Meghalaya" },
  { slug: "mizoram", name: "Mizoram" },
  { slug: "nagaland", name: "Nagaland" },
  { slug: "odisha", name: "Odisha" },
  { slug: "punjab", name: "Punjab" },
  { slug: "rajasthan", name: "Rajasthan" },
  { slug: "sikkim", name: "Sikkim" },
  { slug: "tamil-nadu", name: "Tamil Nadu" },
  { slug: "telangana", name: "Telangana" },
  { slug: "tripura", name: "Tripura" },
  { slug: "uttar-pradesh", name: "Uttar Pradesh" },
  { slug: "uttarakhand", name: "Uttarakhand" },
  { slug: "west-bengal", name: "West Bengal" },
];

// 8 union territories (kept separate; not shown on Testimonials by default)
export const unionTerritories = [
  { slug: "andaman-and-nicobar-islands", name: "Andaman & Nicobar Islands" },
  { slug: "chandigarh", name: "Chandigarh" },
  { slug: "dadra-and-nagar-haveli-and-daman-and-diu", name: "Dadra & Nagar Haveli and Daman & Diu" },
  { slug: "delhi", name: "Delhi" },
  { slug: "jammu-and-kashmir", name: "Jammu & Kashmir" },
  { slug: "ladakh", name: "Ladakh" },
  { slug: "lakshadweep", name: "Lakshadweep" },
  { slug: "puducherry", name: "Puducherry" },
];

export const allRegions = [...indianStates, ...unionTerritories];

// Fast lookup by slug (covers states + UTs, so any slug resolves).
const bySlug = Object.fromEntries(allRegions.map((s) => [s.slug, s]));

// Slug helpers.
export const stateSlugs = indianStates.map((s) => s.slug); // 28 states only
export const allRegionSlugs = allRegions.map((s) => s.slug); // 36 (states + UTs)

/**
 * Resolve a list of slugs into full region objects, sorted alphabetically by name.
 * Unknown slugs are ignored, so typos never crash the UI.
 */
export function getStatesBySlugs(slugs) {
  return slugs
    .map((slug) => bySlug[slug])
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}
