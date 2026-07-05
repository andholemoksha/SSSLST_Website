import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniTimeline() {
  const { timeline } = useDhyanaVahiniContent();

  return (
    <section className="rounded-lg border border-border bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {timeline.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-h">{timeline.title}</h2>
      <div className="mt-6 space-y-4">
        {timeline.items.map((item) => (
          <div key={item.title} className="rounded-lg border border-border bg-muted/40 p-4">
            <h3 className="text-lg font-semibold text-text-h">{item.title}</h3>
            <p className="mt-2 text-sm text-text">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
