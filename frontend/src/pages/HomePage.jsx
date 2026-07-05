import { HeroSection } from "@/features/home/components/HeroSection";
import { HighlightsSection } from "@/features/home/components/HighlightsSection";
import { ProgrammeNumbersSection } from "@/features/home/components/ProgrammeNumbersSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <ProgrammeNumbersSection />
    </>
  );
}