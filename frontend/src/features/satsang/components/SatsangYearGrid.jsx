import { Section } from "@/components/layout/Section";
import { SatsangYearCard } from "@/features/satsang/components/SatsangYearCard";
import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";

export function SatsangYearGrid() {
  const { yearsSection } = useSatsangContent();

  return (
    <Section className="bg-white py-12 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {yearsSection.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-text-h sm:text-5xl">
          {yearsSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text">
          {yearsSection.description}
        </p>
      </div>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12">
        {yearsSection.years.map((item, index) => (
          <SatsangYearCard
            key={item.year}
            item={item}
            className={index === 4 ? "xl:col-span-3 xl:col-start-3" : "xl:col-span-3"}
          />
        ))}
      </div>
    </Section>
  );
}
