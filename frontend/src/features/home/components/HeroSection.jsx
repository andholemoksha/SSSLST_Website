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

      <Container className="relative z-10 grid w-full gap-8 pt-28 pb-16 lg:min-h-screen lg:items-stretch lg:pt-24 lg:pb-0">
        <div className="flex min-w-0 items-center">
          <HeroContent hero={hero} />
        </div>
      </Container>

      <div className="flex justify-center pb-8 lg:absolute lg:inset-x-0 lg:bottom-8 lg:pb-0">
        <ScrollIndicator label={hero.scrollLabel} onClick={handleScrollToNextSection} />
      </div>
    </section>
  );
}
