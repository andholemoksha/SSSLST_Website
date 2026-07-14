import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniResources() {
  const { resources } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-[#e8dcc9] bg-[linear-gradient(145deg,_#fdf8ee_0%,_#f7ebd6_100%)] p-6 shadow-[0_20px_60px_rgba(75,54,29,0.06)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b6b2f]">
          {resources.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#3c2c1d] sm:text-4xl">
          {resources.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-[#5f4a32]">{resources.description}</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {resources.items.map((item) => (
          <div key={item.title} className={`rounded-[1.4rem] bg-gradient-to-br ${item.accent} p-6 text-[#3c2c1d] shadow-[0_10px_30px_rgba(95,74,50,0.12)]`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-lg shadow-sm">
              ✧
            </div>
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#4f3a21]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
