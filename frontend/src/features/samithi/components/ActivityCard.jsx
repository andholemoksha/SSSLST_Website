import { TileCard } from "@/components/ui/tile-card";

/** Initials from an activity name, e.g. "Nagar Sankeertan" -> "NS". */
function initials(name) {
  return name
    .split(/\s+/)
    .filter((word) => /[a-zA-Z]/.test(word)) // skip "/" and stray symbols
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * A single activity tile inside a section row.
 * Thin wrapper over the shared TileCard (fixed width so the row scrolls).
 */
export function ActivityCard({ sectionSlug, activity }) {
  const { slug, name } = activity;

  return (
    <TileCard
      to={`/programme/samithi-connect/${sectionSlug}/${slug}`}
      title={name}
      initials={initials(name)}
      className="w-60 shrink-0 snap-start"
    />
  );
}
