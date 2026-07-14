import { HeroQuote } from "@/features/home/components/HeroQuote";
import { HeroButtons } from "@/features/home/components/HeroButtons";

export function HeroContent({ hero }) {
  return (
    <div className="text-white">
      <p className="hidden text-sm font-medium text-accent lg:block">{hero.eyebrow}</p>

      <h1 className="mt-2 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:mt-4 lg:text-6xl">
        {hero.heading}
        <span className="text-accent">{hero.headingHighlight}</span>
      </h1>

      <div className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />

      <p className="mt-4 text-lg font-medium text-white/90">{hero.supporting}</p>
      <p className="mt-3 max-w-xl text-white/75">{hero.description}</p>

      <div className="mt-6">
        <HeroQuote quote={hero.quote} />
      </div>

      <div className="mt-8">
        <HeroButtons ctaPrimary={hero.ctaPrimary} ctaSecondary={hero.ctaSecondary} />
      </div>
    </div>
  );
}
