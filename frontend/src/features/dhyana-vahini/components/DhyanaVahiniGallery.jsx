import { TileCard } from "@/components/ui/tile-card";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniGallery() {
  const { gallery } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Text variant="eyebrow" size="sm">
            {gallery.eyebrow}
          </Text>
          <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
            {gallery.title}
          </Text>
          <Text size="base" leading="relaxed" className="mt-4">{gallery.description}</Text>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
        {gallery.items.map((item) => (
          <TileCard
            key={item.title}
            title={item.title}
            description={item.caption}
            image={item.image}
            to={item.to}
            showFooter={false}
            className="w-full sm:w-60"
          />
        ))}
      </div>
    </section>
  );
}
