import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";
import { Text } from "@/components/ui/Text/text";

export function SatsangAbout() {
  const { about } = useSatsangContent();

  return (
    <div className="max-w-xl lg:-ml-4">
      <Text variant="eyebrow" size="sm">
        {about.eyebrow}
      </Text>
      <div className="mt-6 border-l border-accent/70 pl-6 sm:pl-8">
        {about.quotes.map((quote) => (
          <Text
            as="blockquote"
            variant="quote"
            size="2xl"
            color="text-white"
            leading="snug"
            key={quote}
            className="border-b border-white/15 py-6 text-2xl font-medium leading-snug text-white drop-shadow-sm last:border-b-0 sm:text-3xl lg:text-[2rem]"
          >
            "{quote}"
          </Text>
        ))}
      </div>
    </div>
  );
}
