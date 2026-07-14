import { cn } from "@/lib/utils";

/**
 * Reusable responsive card row: a touch-friendly snap-scrolling row on
 * mobile (same hidden-scrollbar technique as `CardScroller`), switching to
 * a CSS grid with `columns` columns at `sm:` and up. Pass fixed-width
 * children (e.g. `w-40 shrink-0 snap-start` on mobile) so both layouts work.
 */
const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

export function GlassGrid({ children, columns = 3, className }) {
  return (
    <div
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "sm:grid sm:overflow-visible sm:pb-0",
        DESKTOP_COLUMNS[columns] ?? DESKTOP_COLUMNS[3],
        className
      )}
    >
      {children}
    </div>
  );
}
