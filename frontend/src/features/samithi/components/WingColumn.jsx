import { TileCard } from "@/components/ui/tile-card";
import { Text } from "@/components/ui/Text/text";

/**
 * One wing (Spiritual / Education / Service) rendered as a titled column with a
 * grid of compact, non-clickable activity cards (title + image only).
 */
export function WingColumn({ section }) {
  return (
    <section>
      <Text as="h2" variant="heading" size="xl" className="mb-4">
        {section.title}
      </Text>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3 sm:gap-4">
        {section.activities.map((activity) => (
          <TileCard
            key={activity.slug}
            variant="compact"
            title={activity.name}
            image={activity.image}
            imagePosition={activity.imagePosition}
            className="max-w-[11rem]"
          />
        ))}
      </div>
    </section>
  );
}
