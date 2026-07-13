import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniJourney() {
  const { journey } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(75,54,29,0.08)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          {journey.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {journey.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">{journey.description}</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {journey.items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group rounded-[1.4rem] border border-border bg-white/80 p-6 shadow-[0_10px_30px_rgba(95,74,50,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(95,74,50,0.14)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/60 text-xl text-accent shadow-inner">
              {item.icon}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Continue exploring this inspiring path.</p>
          </a>
        ))}
      </div>
    </section>
  );
}
