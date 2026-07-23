import { TileCard } from "@/components/ui/tile-card";
import { Badge } from "@/components/ui/badge";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** A single participant reflection card. */
export function TestimonialCard({ participant, stateName }) {
  const { name, place, year, experience } = participant;

  return (
    <TileCard
      title={name}
      description={
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{experience}&rdquo;</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Batch {year}</Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {place} · {stateName}
          </p>
        </div>
      }
      media={
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-primary"
          aria-hidden="true"
        >
          {initials(name)}
        </span>
      }
      showFooter={false}
      className="h-full"
    />
  );
}
