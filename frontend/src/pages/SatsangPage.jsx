import { Container } from "@/components/layout/Container";
import { SatsangAbout } from "@/features/satsang/components/SatsangAbout";
import { SatsangHero } from "@/features/satsang/components/SatsangHero";
import { SatsangYearGrid } from "@/features/satsang/components/SatsangYearGrid";
import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";

export function SatsangPage() {
  const { hero } = useSatsangContent();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-text-h text-white">
        <img
          src={hero.heroImage}
          alt="Satsang Hero"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[58%_24%] sm:object-[58%_20%] lg:object-[60%_18%]"
        />

        <div className="absolute inset-0 z-10 bg-text-h/68" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white via-white/35 to-transparent" />

        <Container className="relative z-20 grid min-h-[720px] max-w-6xl items-center gap-12 py-16 sm:min-h-[800px] sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_0.9fr] lg:gap-20 lg:py-20">
          <SatsangAbout />
          <SatsangHero />
        </Container>
      </section>

      <SatsangYearGrid />
    </>
  );
}