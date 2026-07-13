import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniGallery() {
  const { gallery } = useDhyanaVahiniContent();

  return (
<section className="rounded-[2rem] border border-border bg-background p-6 shadow-[0_20px_60px_rgba(75,54,29,0.06)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            {gallery.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{gallery.description}</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-border/60 bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition hover:bg-muted">
          View More
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {gallery.items.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-[0_10px_30px_rgba(95,74,50,0.08)]">
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover sm:h-64 lg:h-72 xl:h-80" loading="lazy" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
