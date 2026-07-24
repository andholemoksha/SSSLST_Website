import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniTimeline() {
  const { timeline } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <Text variant="eyebrow" size="sm">
          {timeline.eyebrow}
        </Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
          {timeline.title}
        </Text>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-[720px] items-start gap-4">
          {timeline.items.map((item, index) => (
            <div key={item.title} className="flex flex-1 items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-surface text-sm font-semibold text-accent shadow-sm">
                  {index + 1}
                </div>
                {index < timeline.items.length - 1 ? (
                  <div className="mt-2 h-16 w-px bg-gradient-to-b from-accent to-transparent" />
                ) : null}
              </div>
              <div className="rounded-[1.2rem] border border-border bg-background/85 p-4 shadow-sm">
                <Text as="h3" variant="heading" size="lg">{item.title}</Text>
                <Text size="sm" leading="relaxed" className="mt-2">{item.description}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
