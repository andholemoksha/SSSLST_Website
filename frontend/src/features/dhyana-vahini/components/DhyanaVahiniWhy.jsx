import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniWhy() {
  const { why } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          {why.eyebrow}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl">
          {why.title}
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {why.items.map((item) => (
          <div
            key={item.title}
            className="group rounded-[1.4rem] border border-border bg-background/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-heading shadow-inner">
              {item.icon}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-heading">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
