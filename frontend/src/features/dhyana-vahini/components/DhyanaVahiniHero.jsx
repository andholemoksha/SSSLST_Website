import { HeroSection } from "@/components/ui/hero-section";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniHero() {
  const { hero } = useDhyanaVahiniContent();

  return (
    <HeroSection
      label={hero.label}
      title={hero.title}
      subtitle={hero.subtitle}
      quote={hero.quote}
      backgroundImage={hero.backgroundImage}
      accentImage={hero.accentImage}
      overlay={hero.overlay}
    />
  );
}