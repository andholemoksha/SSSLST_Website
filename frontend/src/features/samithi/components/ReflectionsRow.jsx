import { TileCard } from "@/components/ui/tile-card";
import { Text } from "@/components/ui/Text/text";

/**
 * The Reflections section: two clickable cards (Video Reflections / Text
 * Reflections) that link to their respective reflection pages. Layout is
 * unchanged from the original design — a simple responsive row of cards.
 */
export function ReflectionsRow({ section }) {
  return (
    <section>
      <Text as="h2" variant="heading" size="2xl" className="mb-4">
        {section.title}
      </Text>
      <div className="grid grid-cols-2 gap-6 sm:max-w-xl">
        {section.activities.map((activity) => (
          <TileCard
            key={activity.slug}
            to={`/programme/samithi-connect/${section.slug}/${activity.slug}`}
            title={activity.name}
            image={activity.image}
            imagePosition={activity.imagePosition}
            cta="Open"
          />
        ))}
      </div>
    </section>
  );
}
