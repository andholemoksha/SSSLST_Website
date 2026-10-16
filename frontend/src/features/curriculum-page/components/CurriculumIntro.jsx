import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { useCurriculumPageContent } from "@/features/curriculum-page/hooks/useCurriculumPageContent";

export function CurriculumIntro() {
  const { hero } = useCurriculumPageContent();

  return (
    <Section className="pb-0">
      <Text variant="eyebrow" size="xs">
        {hero.label}
      </Text>
      <Text as="h1" variant="heading" size="page" color="text-primary" className="mt-2">
        {hero.title}
      </Text>
      <Text variant="muted" size="lg" leading="relaxed" className="mt-4 max-w-3xl">
        {hero.subtitle}
      </Text>

      <dl className="mt-8 grid max-w-md grid-cols-2 overflow-hidden rounded-lg border border-border">
        {hero.facts.map((fact, index) => (
          <div
            key={fact.label}
            className={`bg-surface p-4 ${index > 0 ? "border-l border-border" : ""}`}
          >
            <dt>
              <Text variant="muted" size="xs">
                {fact.label}
              </Text>
            </dt>
            <dd className="mt-1">
              <Text as="span" variant="heading" size="base" weight="semibold">
                {fact.value}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
