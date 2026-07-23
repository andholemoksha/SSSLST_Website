import { TileCard } from "@/components/ui/tile-card";
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

      <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
        {why.items.map((item) => (
          <TileCard
            key={item.title}
            title={item.title}
            description={item.description}
            media={<span className="text-4xl">{item.icon}</span>}
            showFooter={false}
            className="w-full sm:w-60"
          />
        ))}
      </div>
    </section>
  );
}
