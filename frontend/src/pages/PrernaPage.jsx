import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TileCard } from "@/components/ui/tile-card";
import { Text } from "@/components/ui/Text/text";
import { prerna } from "@/content/prerna";
import { usePrernaEditions } from "@/features/prerna/hooks/usePrernaEditions";

function PrernaHero() {
  const { hero } = prerna;

  return (
    <section className="relative overflow-hidden bg-gradient-highlight">
      <Container className="relative z-10 grid max-w-[1700px] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-20 lg:py-24">
        {/* Left Content */}
        <div className="max-w-2xl">
          <Text variant="eyebrow" size="sm" className="sm:text-base">
            {hero.label}
          </Text>
          <Text
            as="h1"
            variant="heading"
            size="5xl"
            className="mt-6 leading-[0.95] tracking-[0.01em] sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </Text>

          <div className="mt-6 h-px w-24 bg-accent" />

          <Text size="base" leading="relaxed" className="mt-6 max-w-2xl sm:text-lg">
            {hero.subtitle}
          </Text>

          {hero.quote && (
            <Text
              as="blockquote"
              size="base"
              leading="relaxed"
              className="mt-8 max-w-xl border-l-2 border-accent/70 pl-5 italic text-muted-foreground sm:text-lg"
            >
              {hero.quote}
            </Text>
          )}
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-border/30 bg-white/50 p-3 shadow-xl">
            <img
              src={hero.accentImage}
              alt=""
              className="h-[320px] w-full rounded-[1.5rem] object-cover object-[50%_20%] sm:h-[420px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function EditionsGrid() {
  const { editions, isLoading, isError } = usePrernaEditions();

  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-52 w-full animate-pulse rounded-lg bg-muted sm:w-60" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Text variant="muted" className="mt-12 py-12 text-center">
        Unable to load editions. Please try again later.
      </Text>
    );
  }

  if (editions.length === 0) {
    return (
      <Text variant="muted" className="mt-12 py-12 text-center">
        Editions will be published here soon.
      </Text>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
      {editions.map((edition) => (
        <TileCard
          key={edition.year}
          to={edition.pdf_url}
          title={edition.title}
          image={edition.cover_image_url || undefined}
          initials={String(edition.year)}
          cta="Read"
          className="w-full sm:w-60"
        />
      ))}
    </div>
  );
}

function AboutSection() {
  const { about } = prerna;

  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl">
        <Text variant="eyebrow" size="sm">{about.eyebrow}</Text>
        <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-3 sm:text-4xl">
          {about.title}
        </Text>
        <div className="mt-6 space-y-4">
          {about.paragraphs.map((para, i) => (
            <Text key={i} size="base" leading="relaxed" className="text-foreground">
              {para}
            </Text>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function PrernaPage() {
  const { editions } = prerna;

  return (
    <>
      <PrernaHero />

      <Section className="bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <Text variant="eyebrow" size="sm">{editions.eyebrow}</Text>
          <Text as="h2" variant="heading" size="3xl" leading="tight" className="mt-3 sm:text-5xl">
            {editions.title}
          </Text>
          <Text variant="muted" size="base" leading="relaxed" className="mx-auto mt-4 max-w-2xl">
            {editions.description}
          </Text>
        </div>

        <EditionsGrid />
      </Section>

      <AboutSection />
    </>
  );
}
