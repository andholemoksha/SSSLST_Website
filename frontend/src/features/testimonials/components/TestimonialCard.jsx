import { Card } from "@/components/ui/card";
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
    <Card className="flex h-full flex-col p-6">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
          aria-hidden="true"
        >
          {initials(name)}
        </span>
        <Badge variant="outline">Batch {year}</Badge>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{experience}&rdquo;
      </p>

      <div className="mt-4">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {place} · {stateName}
        </p>
      </div>
    </Card>
  );
}
