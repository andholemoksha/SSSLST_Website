import { HeroSection } from "@/components/ui/hero-section";
import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";

export function SatsangHero() {
  const { hero } = useSatsangContent();

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