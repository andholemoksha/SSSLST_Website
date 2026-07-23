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
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
          {yearsSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {yearsSection.description}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
        {yearsSection.years.map((item) => (
          <SatsangYearCard
            key={item.year}
            item={item}
          />
        ))}
      </div>
    </Section>
  );
}
