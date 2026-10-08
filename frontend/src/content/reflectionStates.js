// Maps the two-letter state code prefix of a reflection id to its region name.
// Reflection ids begin with a two-letter SSE-region code (e.g. "KN0012" -> Karnataka North).
// These region names are distinct from the official states in indianStates.js, so this
// mapping is kept separate on purpose.

export const reflectionStateCodes = {
  AP: "Andhra Pradesh",
  AS: "Assam & North East",
  BH: "Bihar",
  CG: "Chhattisgarh",
  DL: "Delhi-NCR",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana and Chandigarh",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KN: "Karnataka North",
  KS: "Karnataka South",
  KL: "Keralam",
  MP: "Madhya Pradesh",
  ME: "Maharashtra East",
  MW: "Maharashtra West",
  MM: "Maharashtra West 1",
  MN: "Manipur",
  OD: "Odisha",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu North",
  TS: "Tamil Nadu South",
  TG: "Telangana",
  UP: "Uttar Pradesh",
  UK: "Uttarakhand",
  W1: "West Bengal 1",
  W2: "West Bengal 2",
  JK: "JK and Ladakh",
};

/**
 * Resolve a reflection id to its region name using the first two characters as a state code.
 * Falls back to the original id when the code is unknown or the id is too short, so the UI
 * never renders blank.
 *
 * @param {string} id - reflection id, e.g. "KN0012"
 * @returns {string} the region name, or the original id when it can't be resolved
 */
export function getStateFromId(id) {
  if (typeof id !== "string" || id.length < 2) return id ?? "";
  const code = id.slice(0, 2).toUpperCase();
  return reflectionStateCodes[code] ?? id;
}
