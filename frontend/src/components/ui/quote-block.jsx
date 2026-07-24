import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text/text";

/**
 * A pull-quote with a left accent border and attribution line. Used on the
 * Hero over the dark background; the text/border colors are inherited from
 * the caller's context rather than hardcoded, so it can also be reused on
 * light surfaces later.
 */
export function QuoteBlock({ quote, attribution, className }) {
  return (
    <blockquote className={cn("border-l-2 border-accent pl-4", className)}>
      <Quote className="mb-2 h-6 w-6 fill-accent text-accent" aria-hidden="true" />
      <Text variant="quote" size="lg" leading="relaxed">{quote}</Text>
      {attribution && (
        <Text as="footer" variant="eyebrow" size="sm" className="mt-2">{attribution}</Text>
      )}
    </blockquote>
  );
}
