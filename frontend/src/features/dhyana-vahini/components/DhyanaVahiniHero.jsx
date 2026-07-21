import { Container } from "@/components/layout/Container";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

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
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white via-white/40 to-transparent" />

      <Container className="relative z-20 flex min-h-[75vh] items-center py-16 sm:min-h-[80vh] sm:py-20 lg:min-h-[85vh] lg:py-24 xl:py-28 max-w-[1700px]">
        <div className="grid w-full items-center gap-8 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent sm:text-base">
              {hero.label}
            </p>
            <h1 className="mt-6 font-heading text-5xl font-semibold leading-[0.95] tracking-[0.01em] text-white sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <div className="mt-6 h-px w-24 bg-accent" />
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
              {hero.subtitle}
            </p>
            <p className="mt-8 max-w-xl border-l border-accent/70 pl-5 text-lg italic leading-8 text-white/85 sm:text-xl">
              “{hero.quote}”
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-sm">
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
