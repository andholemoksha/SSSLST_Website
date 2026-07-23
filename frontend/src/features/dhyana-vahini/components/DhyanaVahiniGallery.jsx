import { Button } from "@/components/ui/Button/button";
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

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {gallery.items.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-[1.4rem] border border-[#e8dcc9] bg-[#fdf8ee] shadow-[0_10px_30px_rgba(95,74,50,0.08)]">
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover sm:h-64 lg:h-72 xl:h-80" loading="lazy" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#3c2c1d]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5f4a32]">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
