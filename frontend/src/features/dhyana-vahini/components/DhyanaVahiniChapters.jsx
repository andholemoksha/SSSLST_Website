import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniChapters() {
  const { chapters } = useDhyanaVahiniContent();

  return (
    <section className="rounded-lg border border-border bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        {chapters.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-text-h">{chapters.title}</h2>
      <p className="mt-3 text-sm text-text">{chapters.description}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.chapters.map((chapter) => (
          <div key={chapter.id} className="rounded-lg border border-border bg-muted/40 p-6">
            <h3 className="text-lg font-semibold text-text-h">{chapter.title}</h3>
            <p className="mt-2 text-sm text-text">{chapter.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
