import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniTimeline() {
  const { timeline } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-[#e8dcc9] bg-[#fdf8ee] p-6 shadow-[0_20px_60px_rgba(75,54,29,0.06)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b6b2f]">
          {timeline.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#3c2c1d] sm:text-4xl">
          {timeline.title}
        </h2>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="flex min-w-[720px] items-start gap-4">
          {timeline.items.map((item, index) => (
            <div key={item.title} className="flex flex-1 items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7b77a] bg-[#fff7e8] text-sm font-semibold text-[#8f5d1e] shadow-sm">
                  {index + 1}
                </div>
                {index < timeline.items.length - 1 ? (
                  <div className="mt-2 h-16 w-px bg-gradient-to-b from-[#d7b77a] to-transparent" />
                ) : null}
              </div>
              <div className="rounded-[1.2rem] border border-[#e8dcc9] bg-white/85 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-[#3c2c1d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5f4a32]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
