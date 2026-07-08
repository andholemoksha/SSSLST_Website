import { CardScroller } from "@/components/ui/card-scroller";
import { ActivityCard } from "@/features/samithi/components/ActivityCard";

/**
 * One section: a title plus a horizontally-scrolling row of activity cards.
 * The row scrolls only when the cards overflow (short sections don't scroll).
 */
export function SectionRow({ section }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        {section.title}
      </h2>
      <CardScroller>
        {section.activities.map((activity) => (
          <ActivityCard
            key={activity.slug}
            sectionSlug={section.slug}
            activity={activity}
          />
        ))}
      </CardScroller>
    </section>
  );
}
