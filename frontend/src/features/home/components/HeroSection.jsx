import { Container } from "@/components/layout/Container";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { HeroBackgroundVideo } from "@/features/home/components/HeroBackgroundVideo";
import { HeroContent } from "@/features/home/components/HeroContent";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";

export function HeroSection() {
  const { hero } = useHomeContent();

  const handleScrollToNextSection = () => {
    document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative -mt-20 overflow-hidden text-white lg:flex lg:h-screen lg:items-center">
      <HeroBackgroundVideo src={hero.backgroundMedia?.src} poster={hero.backgroundMedia?.poster} />

      <Container className="w-full pt-28 pb-16 lg:pt-24 lg:pb-20">
        <HeroContent hero={hero} />
      </Container>

      <div className="flex justify-center pb-8 lg:absolute lg:inset-x-0 lg:bottom-8 lg:pb-0">
        <ScrollIndicator label={hero.scrollLabel} onClick={handleScrollToNextSection} />
      </div>
    </section>
  );
}
