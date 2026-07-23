import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniResources() {
  const { resources } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <Text variant="eyebrow" size="sm">
          {resources.eyebrow}
        </Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
          {resources.title}
        </Text>
        <Text size="base" leading="relaxed" className="mt-4">{resources.description}</Text>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {resources.items.map((item) => (
          <div key={item.title} className={`rounded-[1.4rem] bg-gradient-to-br ${item.accent} p-6 text-heading shadow-sm`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/70 text-lg shadow-sm">
              ✧
            </div>
            <Text as="h3" variant="heading" size="xl" className="mt-5">{item.title}</Text>
            <Text size="sm" leading="relaxed" className="mt-3">{item.description}</Text>
          </div>
        ))}
      </div>
    </section>
  );
}
