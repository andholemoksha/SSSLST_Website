import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniChapters() {
  const { chapters } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-white p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            {chapters.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl">
            {chapters.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground">{chapters.description}</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-accent/60 bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-secondary">
          View All Chapters
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {chapters.chapters.map((chapter) => (
          <div key={chapter.id} className="overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-sm">
            <div className="flex h-36 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent)]">
              <div className="rounded-2xl border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                {chapter.thumbnailLabel}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-heading">{chapter.title}</h3>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {chapter.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-foreground">{chapter.description}</p>
              <button className="mt-5 inline-flex items-center rounded-full border border-accent/60 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-white">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
