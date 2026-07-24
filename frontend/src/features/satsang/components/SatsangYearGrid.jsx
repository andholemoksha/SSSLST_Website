import { Section } from "@/components/layout/Section";
import { SatsangYearCard } from "@/features/satsang/components/SatsangYearCard";
import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";
import { Text } from "@/components/ui/Text/text";

export function SatsangYearGrid() {
  const { yearsSection } = useSatsangContent();

  return (
    <Section className="bg-white py-12 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-3xl text-center">
        <Text variant="eyebrow" size="sm">
          {yearsSection.eyebrow}
        </Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-3 sm:text-5xl">
          {yearsSection.title}
        </Text>
        <Text variant="muted" size="base" leading="relaxed" className="mx-auto mt-4 max-w-2xl">
          {yearsSection.description}
        </Text>
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
