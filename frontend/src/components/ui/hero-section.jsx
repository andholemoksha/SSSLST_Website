import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";

export function HeroSection({
  label,
  title,
  subtitle,
  quote,
  backgroundImage,
  accentImage,
  overlay,
  actions,
  imagePosition = "object-center",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-hero-bg text-white">
      {/* Background Image */}
      <div className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2">
        <img
          src={backgroundImage}
          alt=""
          className={`h-full w-full object-cover ${imagePosition}`}
        />
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-y-0 left-1/2 z-10 w-screen -translate-x-1/2 ${overlay}`}
      />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background via-background/35 to-transparent" />

      <Container className="relative z-20 grid min-h-[720px] max-w-[1700px] items-center gap-12 py-16 sm:min-h-[800px] sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_0.9fr] lg:gap-20 lg:py-20">
        {/* Left Content */}
        <div className="max-w-3xl">
          <Text variant="eyebrow" size="sm" className="sm:text-base">
            {label}
          </Text>

          <Text
            as="h1"
            variant="heading"
            size="5xl"
            color="text-white"
            className="mt-6 leading-[0.95] tracking-[0.01em] sm:text-6xl lg:text-7xl"
          >
            {title}
          </Text>

          <div className="mt-6 h-px w-24 bg-accent" />

          {/* Subtitle */}
          <Text
  size="base"
  color="text-white"
  leading="relaxed"
  className="mt-6 max-w-2xl whitespace-pre-line sm:text-lg"
>
  {subtitle}
</Text>


          {/* Quote */}
          {quote ? (
            <Text
              variant="quote"
              size="lg"
              color="text-white-light"
              leading="relaxed"
              className="mt-8 max-w-xl border-l border-accent/70 pl-5 text-left sm:text-xl"
            >
              {quote}
            </Text>
          ) : null}

          {actions ? <div className="mt-8">{actions}</div> : null}
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-background/15 bg-background/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-sm">
            <img
              src={accentImage}
              alt=""
              className="h-[320px] w-full rounded-[1.5rem] object-cover object-[50%_20%] sm:h-[380px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}