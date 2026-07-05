import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniAbout() {
  const { about } = useDhyanaVahiniContent();

  return (
    <section className="rounded-lg border border-border bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {about.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-h">{about.title}</h2>
      <p className="mt-3 text-sm text-text">{about.description}</p>
    </section>
  );
}
