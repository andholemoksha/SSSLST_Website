import { QuoteBlock } from "@/components/ui/quote-block";

export function HeroQuote({ quote }) {
  return <QuoteBlock quote={quote.text} attribution={quote.attribution} className="text-white/90" />;
}
