import { HeroSection } from "@/components/ui/hero-section";
import { Text } from "@/components/ui/Text/text";
import { useCurriculumPageContent } from "@/features/curriculum-page/hooks/useCurriculumPageContent";

function FactsBar({ facts }) {
  return (
    <div className="flex flex-wrap gap-3">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="min-w-[120px] shrink-0 rounded-xl px-4 py-3 text-center shadow-md"
          style={{ background: "var(--gradient-purple-to-pink)" }}
        >
          <Text
            as="span"
            variant="label"
            size="xs"
            color="text-white/70"
            className="tracking-[0.2em]"
          >
            {fact.label}
          </Text>
          <Text as="h3" variant="heading" size="base" color="text-white" className="mt-1">
            {fact.value}
          </Text>
        </div>
      ))}
    </div>
  );
}

export function CurriculumIntro() {
  const { hero } = useCurriculumPageContent();

  return <HeroSection {...hero} actions={<FactsBar facts={hero.facts} />} />;
}
