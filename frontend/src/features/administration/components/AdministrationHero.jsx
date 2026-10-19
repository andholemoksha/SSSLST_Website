import { HeroSection } from "@/components/ui/hero-section";
import { useAdministrationContent } from "@/features/administration/hooks/useAdministrationContent";

export function AdministrationHero() {
  const { hero } = useAdministrationContent();

  return (
    <HeroSection
      label={hero.eyebrow}
      title={hero.title}
      subtitle={hero.subtitle}
      quote={hero.quote}
      backgroundImage={hero.backgroundImage}
      accentImage={hero.accentImage}
      overlay={hero.overlay}
    />
  );
}
