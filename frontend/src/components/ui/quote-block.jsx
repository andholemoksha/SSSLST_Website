import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text/text";

export function QuoteBlock({ quote, attribution, className }) {
  return (
    <blockquote className={cn("border-l-2 border-accent pl-6 sm:pl-8", className)}>
      <div className="flex items-start gap-2">
        {/* Opening quote */}
        <span className="mt-1 text-2xl font-bold leading-none text-accent">
          “
        </span>

        <Text
          variant="quote"
          size="lg"
          leading="relaxed"
          color="text-foreground/80"
          className="max-w-4xl sm:text-xl"
        >
          {quote}
        </Text>

        {/* Closing quote */}
        <span className="mt-auto text-2xl font-bold leading-none text-accent">
          ”
        </span>
      </div>

      {/* Attribution */}
      {attribution && (
        <Text
          as="footer"
          variant="eyebrow"
          size="sm"
          className="mt-6 bg-gradient-to-r from-[#4b1f82] via-[#6d2ea7] to-[#b84d91] bg-clip-text font-semibold text-transparent"
        >
          {attribution}
        </Text>
      )}
    </blockquote>
  );
}