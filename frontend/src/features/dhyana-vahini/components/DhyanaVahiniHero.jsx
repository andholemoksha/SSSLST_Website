import { Container } from "@/components/layout/Container";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniHero() {
  const { hero } = useDhyanaVahiniContent();

  return (
    <section className="relative isolate overflow-hidden bg-hero-bg text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt=""
          className="h-full w-full object-cover object-[50%_20%]"
        />
      </div>
      <div className={`absolute inset-0 z-10 ${hero.overlay}`} />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <Container className="relative z-20 flex min-h-[75vh] items-center py-16 sm:min-h-[80vh] sm:py-20 lg:min-h-[85vh] lg:py-24 xl:py-28 max-w-[1700px]">
        <div className="grid w-full items-center gap-8 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          <div className="max-w-3xl">
            <Text variant="eyebrow" size="sm" className="sm:text-base">
              {hero.label}
            </Text>
            <Text as="h1" variant="heading" size="5xl" color="text-white" className="mt-6 leading-[0.95] tracking-[0.01em] sm:text-6xl lg:text-7xl">
              {hero.title}
            </Text>
            <div className="mt-6 h-px w-24 bg-accent" />
            <Text size="base" color="text-white/90" leading="relaxed" className="mt-6 max-w-2xl sm:text-lg">
              {hero.subtitle}
            </Text>
            <Text variant="quote" size="lg" color="text-white/85" leading="relaxed" className="mt-8 max-w-xl border-l border-accent/70 pl-5 sm:text-xl">
              “{hero.quote}”
            </Text>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-background/15 bg-background/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-sm">
              <img
                src={hero.accentImage}
                alt=""
                className="h-[320px] w-full rounded-[1.5rem] object-cover object-[50%_20%] sm:h-[380px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
