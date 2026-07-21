import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniGallery() {
  const { gallery } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            {gallery.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-foreground">{gallery.description}</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-accent/60 bg-surface px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-secondary">
          View More
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {gallery.items.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-sm">
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover sm:h-64 lg:h-72 xl:h-80" loading="lazy" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-heading">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
