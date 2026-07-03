import { TileCard } from "@/components/ui/tile-card";

/** Initials from a state name, e.g. "Andhra Pradesh" -> "AP". */
function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * A single state tile inside a year's horizontal row.
 * Thin wrapper over the shared TileCard (fixed width so the row scrolls).
 */
export function StateCard({ year, state }) {
  const { slug, name } = state;

  return (
    <TileCard
      to={`/testimonials/${year}/${slug}`}
      title={name}
      initials={initials(name)}
      className="w-60 shrink-0 snap-start"
    />
  );
}
