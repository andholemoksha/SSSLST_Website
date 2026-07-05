import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniGallery() {
  const { gallery } = useDhyanaVahiniContent();

  return (
    <section className="rounded-lg border border-border bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {gallery.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-h">{gallery.title}</h2>
      <p className="mt-3 text-sm text-text">{gallery.description}</p>
    </section>
  );
}
