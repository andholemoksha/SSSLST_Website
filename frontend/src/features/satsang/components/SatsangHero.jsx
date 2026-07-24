import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";
import { Text } from "@/components/ui/Text/text";

export function SatsangHero() {
  const { hero } = useSatsangContent();

  return (
    <div className="max-w-2xl lg:justify-self-end">
      <Text variant="eyebrow" size="sm">
        {hero.eyebrow}
      </Text>
      <Text as="h1" variant="heading" size="5xl" color="text-white" leading="tight" className="mt-4 sm:text-7xl lg:text-[5.75rem]">
        {hero.title}
      </Text>
      <div className="mt-6 h-px w-24 bg-accent" />
      <Text size="base" color="text-white/85" leading="relaxed" className="mt-6 max-w-2xl sm:text-lg">
        {hero.description}
      </Text>
    </div>
  );
}
