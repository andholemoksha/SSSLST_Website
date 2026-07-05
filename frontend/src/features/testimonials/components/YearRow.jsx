import { CardScroller } from "@/components/ui/card-scroller";
import { StateCard } from "@/features/testimonials/components/StateCard";
import { testimonialsContent } from "@/content/testimonials";

/**
 * One year's section: a title plus a horizontally-scrolling row of state cards.
 * States are expected to already be in alphabetical order (see content).
 */
export function YearRow({ year, states }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        {testimonialsContent.batchLabel} {year}
      </h2>
      <CardScroller>
        {states.map((state) => (
          <StateCard key={state.slug} year={year} state={state} />
        ))}
      </CardScroller>
    </section>
  );
}
