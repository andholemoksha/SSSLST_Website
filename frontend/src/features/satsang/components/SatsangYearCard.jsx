import { useState } from "react";
import { TileCard } from "@/components/ui/tile-card";
import { cn } from "@/lib/utils";

export function SatsangYearCard({ item, className }) {
  // If the year logo image is missing (e.g. a newly added year has no logo
  // uploaded yet), fall back to showing the year number on the brand panel
  // instead of a broken image.
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <TileCard
      to={`/satsang/${item.year}`}
      title={item.title}
      image={imageFailed ? undefined : item.image}
      initials={item.year}
      onImageError={() => setImageFailed(true)}
      className={cn("w-full sm:w-60", className)}
    />
  );
}
