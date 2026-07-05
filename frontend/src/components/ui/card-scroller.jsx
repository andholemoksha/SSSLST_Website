import { cn } from "@/lib/utils";

/**
 * Reusable horizontal card scroller: a snap-scrolling row that hides the
 * scrollbar but keeps scrolling. Used by any "row of cards" section
 * (testimonial years, samithi sections, …). Pass fixed-width cards as children.
 */
export function CardScroller({ children, className }) {
  return (
    <div
      className={cn(
        "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
