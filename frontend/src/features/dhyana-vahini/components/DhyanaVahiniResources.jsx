import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniResources() {
  const { resources } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          {resources.eyebrow}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl">
          {resources.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-foreground">{resources.description}</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {resources.items.map((item) => (
          <div key={item.title} className={`rounded-[1.4rem] bg-gradient-to-br ${item.accent} p-6 text-heading shadow-sm`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/70 text-lg shadow-sm">
              ✧
            </div>
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
