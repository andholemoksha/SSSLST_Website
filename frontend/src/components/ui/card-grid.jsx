import { cn } from "@/lib/utils";

// Map a `columns` value to the responsive grid-template classes. The large
// breakpoint carries the requested column count; small/medium stay 1/2 for
// readable cards on narrow screens.
const COLUMN_CLASSES = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Reusable responsive card grid with consistent gaps.
 *
 * @param {2|3|4} [columns=4]  number of columns at the large breakpoint.
 */
export function CardGrid({ children, className, columns = 4 }) {
  return (
    <div
      className={cn(
        "grid auto-rows-fr gap-6",
        COLUMN_CLASSES[columns] ?? COLUMN_CLASSES[4],
        className
      )}
    >
      {children}
    </div>
  );
}
