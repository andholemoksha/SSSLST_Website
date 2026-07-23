import { TileCard } from "@/components/ui/tile-card";
import { cn } from "@/lib/utils";

export function SatsangYearCard({ item, className }) {
  return (
    <TileCard
      to={`/satsang/${item.year}`}
      title={item.title}
      image={item.image}
      className={cn("w-full sm:w-60", className)}
    />
  );
}
