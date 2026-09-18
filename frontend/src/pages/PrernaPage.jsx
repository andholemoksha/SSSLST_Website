import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TileCard } from "@/components/ui/tile-card";
import { Text } from "@/components/ui/Text/text";
import { prerna } from "@/content/prerna";
import { HeroSection } from "@/components/ui/hero-section";
import { usePrernaEditions } from "@/features/prerna/hooks/usePrernaEditions";

function PrernaHero() {
  const { hero } = prerna;

  return <HeroSection {...hero} />;
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

      <AboutSection />

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

      
    </>
  );
}
