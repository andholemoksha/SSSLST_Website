import { Section } from "@/components/layout/Section";
import { QuoteBlock } from "@/components/ui/quote-block";
import spiritualImg from "@/assets/categories/spiritual-wing.jpg";

export function HeroQuote({ quote }) {
  return (
    <Section containerClassName="grid items-center gap-4 md:grid-cols-[1fr_auto] md:gap-6">
      {/* Quote on the left */}
      <div>
        <QuoteBlock
          quote={quote.text}
          attribution={quote.attribution}
          className="text-primary"
        />
      </div>

      {/* Image on the right */}
      <div className="flex justify-center md:justify-end">
        <div className="h-68 w-68 overflow-hidden rounded-full sm:h-66 sm:w-66">
          <img
            src={spiritualImg}
            alt="Spiritual gathering"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
