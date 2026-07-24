import { TileCard } from "@/components/ui/tile-card";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniWhy() {
  const { why } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <Text variant="eyebrow" size="sm">
          {why.eyebrow}
        </Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
          {why.title}
        </Text>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
        {why.items.map((item) => (
          <TileCard
            key={item.title}
            title={item.title}
            description={item.description}
            media={<span className="text-4xl">{item.icon}</span>}
            showFooter={false}
            className="w-full sm:w-60"
          />
        ))}
      </div>
    </section>
  );
}
