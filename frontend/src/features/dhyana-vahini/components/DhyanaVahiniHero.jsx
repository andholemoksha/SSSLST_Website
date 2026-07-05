import { Container } from "@/components/layout/Container";
import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniHero() {
  const { hero } = useDhyanaVahiniContent();

  return (
    <section className="relative isolate overflow-hidden rounded-none border-0 bg-text-h text-white lg:rounded-lg">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className={`absolute inset-0 z-10 ${hero.overlay}`} />
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white/85 via-white/30 to-transparent" />

      <Container className="relative z-20 flex min-h-[70vh] items-center py-20 sm:min-h-[75vh] sm:py-24 lg:min-h-[80vh] lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f2d58d] sm:text-base">
            {hero.label}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            {hero.subtitle}
          </p>
          <p className="mt-8 max-w-xl border-l border-[#f2d58d]/70 pl-5 text-lg italic text-white/85 sm:text-xl">
            “{hero.quote}”
          </p>
        </div>
      </Container>
    </section>
  );
}
