import { Section } from "@/components/layout/Section";
import { QuoteBlock } from "@/components/ui/quote-block";
import spiritualImg from "@/assets/categories/spiritual-wing.jpg";

export function HeroQuote({ quote }) {
  return (
    <Section containerClassName="grid items-center gap-10 md:grid-cols-2">
      {/* Quote on the left */}
      <div>
        <QuoteBlock
          quote={quote.text}
          attribution={quote.attribution}
          className="text-primary"
        />
      </div>

      {/* Image on the right */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={spiritualImg}
          alt="Spiritual gathering"
          className="h-full w-full object-cover"
        />
      </div>
    </Section>
  );
}
