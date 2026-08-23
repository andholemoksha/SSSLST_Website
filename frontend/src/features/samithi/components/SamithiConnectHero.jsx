import { HeroSection } from "@/components/ui/hero-section";
import { useSamithiContent } from "@/features/samithi/hooks/useSamithiSections";

export function SamithiConnectHero() {
  const { hero } = useSamithiContent();

  return (
    <HeroSection

      title={hero.title}
      subtitle={hero.subtitle}
      quote={hero.quote}
      backgroundImage={hero.backgroundImage}
      accentImage={hero.accentImage}
      overlay={hero.overlay}
    />
  );
}