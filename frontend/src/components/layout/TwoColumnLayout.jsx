import { cn } from "@/lib/utils";

/**
 * Generic 50/50 two-column layout: stacks to a single column on mobile
 * (left content first, then right), splits into two columns at `lg:`.
 * Reusable across any future section that needs this split, not just Hero.
 */
export function TwoColumnLayout({ left, right, className }) {
  return (
    <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2", className)}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
