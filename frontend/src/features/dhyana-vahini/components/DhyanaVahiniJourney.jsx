import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniJourney() {
  const { journey } = useDhyanaVahiniContent();

  return (
    <section className="rounded-lg border border-border bg-muted/40 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {journey.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-h">{journey.title}</h2>
      <p className="mt-3 text-sm text-text">{journey.description}</p>
    </section>
  );
}
