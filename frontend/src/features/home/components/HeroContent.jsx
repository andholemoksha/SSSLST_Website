import { HeroButtons } from "@/features/home/components/HeroButtons";
import { Text } from "@/components/ui/Text/text";

export function HeroContent({ hero }) {
  return (
    <div className="text-white">
      <Text variant="eyebrow" size="sm" className="hidden lg:block">{hero.eyebrow}</Text>

      <Text as="h1" variant="heading" size="display" weight="bold" color="text-white" className="mt-2 leading-tight lg:mt-4">
        {hero.heading}
        <span className="text-accent">{hero.headingHighlight}</span>
      </Text>

      <div className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />

      <Text size="lg" weight="medium" color="text-white/90" className="mt-4">{hero.supporting}</Text>
      <Text color="text-white/75" className="mt-3 max-w-xl">{hero.description}</Text>

      <div className="mt-8">
        <HeroButtons ctaPrimary={hero.ctaPrimary} ctaSecondary={hero.ctaSecondary} />
      </div>
    </div>
  );
}
