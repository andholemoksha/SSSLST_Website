import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniWhy() {
  const { why } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-[#e8dcc9] bg-[linear-gradient(145deg,_#fcf8ee_0%,_#f6ebd8_100%)] p-6 shadow-[0_20px_60px_rgba(75,54,29,0.08)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b6b2f]">
          {why.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#3c2c1d] sm:text-4xl">
          {why.title}
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {why.items.map((item) => (
          <div
            key={item.title}
            className="group rounded-[1.4rem] border border-[#e6d2af] bg-white/80 p-6 shadow-[0_10px_30px_rgba(95,74,50,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(95,74,50,0.14)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#f6e1b0_0%,_#d9a75a_100%)] text-xl text-[#5c3a17] shadow-inner">
              {item.icon}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#3c2c1d]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#5f4a32]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
