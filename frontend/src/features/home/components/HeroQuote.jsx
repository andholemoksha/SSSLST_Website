import { Section } from "@/components/layout/Section";
import { QuoteBlock } from "@/components/ui/quote-block";
import spiritualImg from "@/assets/categories/spiritual-wing.jpg";

export function HeroQuote({ quote }) {
  return (
    <Section className="bg-soft-beige">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-white px-8 py-12 shadow-xl shadow-purple-900/10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          {/* Top gradient accent */}
          <div className="absolute left-0 top-0 h-1 w-full bg-nav-gradient" />

          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] lg:gap-16">
            {/* Quote */}
            <div className="min-w-0">
              <QuoteBlock
                quote={quote.text}
                attribution={quote.attribution}
                className="text-primary"
              />
            </div>

            {/* Image */}
            <div className="flex justify-center md:justify-end">
              <div className="h-56 w-56 overflow-hidden rounded-full sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                <img
                  src={spiritualImg}
                  alt="Spiritual gathering"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}