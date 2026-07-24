import { CardScroller } from "@/components/ui/card-scroller";
import { ActivityCard } from "@/features/samithi/components/ActivityCard";
import { Text } from "@/components/ui/Text/text";

/**
 * One section: a title plus a horizontally-scrolling row of activity cards.
 * The row scrolls only when the cards overflow (short sections don't scroll).
 */
export function SectionRow({ section }) {
  return (
    <section>
      <Text as="h2" variant="heading" size="2xl" className="mb-4">
        {section.title}
      </Text>
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
