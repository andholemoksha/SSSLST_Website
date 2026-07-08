import { cn } from "@/lib/utils";

/**
 * Reusable responsive card grid: 1 / 2 / 4 columns with consistent gaps.
 * Used by any "grid of cards" section (project categories, …).
 */
export function CardGrid({ children, className }) {
  return (
    <div
      className={cn(
        "grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
