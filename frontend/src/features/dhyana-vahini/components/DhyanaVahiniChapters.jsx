import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniChapters() {
  const { chapters } = useDhyanaVahiniContent();

  return (
<section className="rounded-[2rem] border border-border bg-background p-6 shadow-[0_20px_60px_rgba(75,54,29,0.06)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            {chapters.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {chapters.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{chapters.description}</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-border/60 bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition hover:bg-muted">
          View All Chapters
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {chapters.chapters.map((chapter) => (
          <div key={chapter.id} className="overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-[0_10px_30px_rgba(95,74,50,0.08)]">
            <div className="flex h-36 items-center justify-center bg-white/70">
              <div className="rounded-2xl border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                {chapter.thumbnailLabel}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-foreground">{chapter.title}</h3>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {chapter.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{chapter.description}</p>
              <button className="mt-5 inline-flex items-center rounded-full border border-border/60 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-white">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
