import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniTimeline() {
  const { timeline } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          {timeline.eyebrow}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-heading sm:text-4xl">
          {timeline.title}
        </h2>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-[720px] items-start gap-4">
          {timeline.items.map((item, index) => (
            <div key={item.title} className="flex flex-1 items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-surface text-sm font-semibold text-accent shadow-sm">
                  {index + 1}
                </div>
                {index < timeline.items.length - 1 ? (
                  <div className="mt-2 h-16 w-px bg-gradient-to-b from-accent to-transparent" />
                ) : null}
              </div>
              <div className="rounded-[1.2rem] border border-border bg-white/85 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-heading">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
