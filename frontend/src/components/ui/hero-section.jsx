import { Container } from "@/components/layout/Container";

export function HeroSection({
  label,
  title,
  subtitle,
  quote,
  backgroundImage,
  accentImage,
  overlay,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-text-h text-white">
      {/* Background Image */}
      <div className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-y-0 left-1/2 z-10 w-screen -translate-x-1/2 ${overlay}`}
      />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white via-white/35 to-transparent" />

      <Container className="relative z-20 grid min-h-[720px] max-w-[1700px] items-center gap-12 py-16 sm:min-h-[800px] sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_0.9fr] lg:gap-20 lg:py-20">
        {/* Left Content */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent sm:text-base">
            {label}
          </p>

          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[0.01em] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <div className="mt-6 h-px w-24 bg-accent" />

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            {subtitle}
          </p>

          <p className="mt-8 max-w-xl border-l border-accent/70 pl-5 text-lg italic leading-8 text-white/85 sm:text-xl">
            “{quote}”
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-sm">
            <img
              src={accentImage}
              alt=""
              className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[380px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}