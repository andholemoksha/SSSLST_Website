import { Button } from "@/components/ui/Button/button";
import { TileCard } from "@/components/ui/tile-card";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniGallery() {
  const { gallery } = useDhyanaVahiniContent();

  return (
    <section className="rounded-[2rem] border border-[#e8dcc9] bg-white p-6 shadow-[0_20px_60px_rgba(75,54,29,0.06)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b6b2f]">
            {gallery.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#3c2c1d] sm:text-4xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-[#5f4a32]">{gallery.description}</p>
        </div>
        <Button
          variant="outline"
          size="lg"
        >
          View More
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
        {gallery.items.map((item) => (
          <TileCard
            key={item.title}
            title={item.title}
            description={item.caption}
            image={item.image}
            showFooter={false}
            className="w-full sm:w-60"
          />
        ))}
      </div>
    </section>
  );
}
