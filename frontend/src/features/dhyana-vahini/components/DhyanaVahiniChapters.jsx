import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniChapters() {
  const { chapters } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Text variant="eyebrow" size="sm">
            {chapters.eyebrow}
          </Text>
          <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-4 sm:text-4xl">
            {chapters.title}
          </Text>
          <Text size="base" leading="relaxed" className="mt-4">{chapters.description}</Text>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-accent/60 bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-secondary">
          <Text as="span" variant="label" size="sm" color="text-accent">View All Chapters</Text>
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {chapters.chapters.map((chapter) => (
          <div key={chapter.id} className="overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-sm">
            <div className="flex h-36 items-center justify-center bg-gradient-to-b from-background/70 to-transparent">
              <Text as="div" variant="label" size="sm" color="text-accent" className="rounded-2xl border border-background/70 bg-background/80 px-5 py-3 tracking-[0.25em]">
                {chapter.thumbnailLabel}
              </Text>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <Text as="h3" variant="heading" size="xl">{chapter.title}</Text>
                <Text as="span" variant="label" size="xs" color="text-accent" className="rounded-full bg-muted px-3 py-1 tracking-[0.2em]">
                  {chapter.status}
                </Text>
              </div>
              <Text size="sm" leading="relaxed" className="mt-3">{chapter.description}</Text>
              <button className="mt-5 inline-flex items-center rounded-full border border-accent/60 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-background">
                <Text as="span" variant="label" size="sm" color="text-accent">View Details</Text>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
