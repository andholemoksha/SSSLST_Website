import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniJourney() {
  const { journey } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <Text variant="eyebrow" size="sm">
          {journey.eyebrow}
        </Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
          {journey.title}
        </Text>
        <Text size="base" leading="relaxed" className="mt-4">{journey.description}</Text>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {journey.items.map((item) => (
          <Text
            as="a"
            variant="body"
            key={item.title}
            href={item.href}
            className="group rounded-[1.4rem] border border-border bg-background/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-heading shadow-inner">
              {item.icon}
            </div>
            <Text as="h3" variant="heading" size="xl" className="mt-5">{item.title}</Text>
            <Text size="sm" leading="relaxed" className="mt-3">Continue exploring this inspiring path.</Text>
          </Text>
        ))}
      </div>
    </section>
  );
}
