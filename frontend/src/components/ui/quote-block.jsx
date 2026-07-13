import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <p className="font-heading text-lg italic leading-relaxed">{quote}</p>
      {attribution && (
        <footer className="mt-2 text-sm font-medium text-accent">{attribution}</footer>
      )}
    </blockquote>
  );
}
