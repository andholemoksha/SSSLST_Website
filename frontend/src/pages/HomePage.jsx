import { HeroSection } from "@/features/home/components/HeroSection";
import { HeroQuote } from "@/features/home/components/HeroQuote";
import { ProgrammeNumbersSection } from "@/features/home/components/ProgrammeNumbersSection";
import { HighlightsSection } from "@/features/home/components/HighlightsSection";
import { ExploreSection } from "@/features/home/components/ExploreSection";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";

export function HomePage() {
  const { hero } = useHomeContent();

  return (
    <>
      <HeroSection />
      <HeroQuote quote={hero.quote} />
      <ProgrammeNumbersSection />
      <HighlightsSection />
      <ExploreSection />
    </>
  );
}
