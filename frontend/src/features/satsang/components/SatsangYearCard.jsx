import { TileCard } from "@/components/ui/tile-card";

export function SatsangYearCard({ item, className }) {
  return (
    <TileCard
      to={`/satsang/${item.year}`}
      title={item.title}
      description={item.year}
      image={item.image}
      cta="View Details"
      className={className}
    />
  );
}
