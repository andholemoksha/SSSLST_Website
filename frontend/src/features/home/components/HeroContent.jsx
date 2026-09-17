import { HeroButtons } from "@/features/home/components/HeroButtons";
import { Text } from "@/components/ui/Text/text";
import { GlassCard } from "@/components/ui/glass-card";

export function HeroContent({ hero }) {
  return (
    <div className="min-w-0 w-full text-white">
      <Text variant="eyebrow" size="sm" weight="medium" color="text-accent">
        {hero.eyebrow}
      </Text>

      <Text
        as="h1"
        variant="heading"
        size="display"
        color="text-white"
        className="mt-2 leading-tight lg:mt-4"
      >
        {hero.heading}
        <span className="text-accent">{hero.headingHighlight}</span>
      </Text>

      <div className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />

      <Text
        size="lg"
        weight="medium"
        color="text-white/90"
        className="mt-4"
      >
        {hero.supporting}
      </Text>

      <Text color="text-white/75" className="mt-3 max-w-xl">
        {hero.description}
      </Text>

      <div className="mt-8">
        <HeroButtons
          ctaPrimary={hero.ctaPrimary}
          ctaSecondary={hero.ctaSecondary}
        />
      </div>

      {/* Programme Highlights */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
        <GlassCard className="min-w-[120px] shrink-0 rounded-xl px-3 py-3 text-center">
          <Text
            as="span"
            variant="label"
            size="xs"
            color="text-white/60"
            className="tracking-[0.2em]"
          >
            Duration
          </Text>

          <Text as="h3" variant="heading" size="base" color="text-white" className="mt-1">
            12 Months
          </Text>
        </GlassCard>

        <GlassCard className="min-w-[120px] shrink-0 rounded-xl px-3 py-3 text-center">
          <Text
            as="span"
            variant="label"
            size="xs"
            color="text-white/60"
            className="tracking-[0.2em]"
          >
            Credits
          </Text>

          <Text as="h3" variant="heading" size="base" color="text-white" className="mt-1">
            X Credits
          </Text>
        </GlassCard>

        <GlassCard className="min-w-[155px] shrink-0 rounded-xl px-3 py-3 text-center">
          <Text
            as="span"
            variant="label"
            size="xs"
            color="text-white/60"
            className="tracking-[0.2em]"
          >
            Streams
          </Text>

          <Text as="h3" variant="heading" size="base" color="text-white" className="mt-1">
            English & Hindi
          </Text>
        </GlassCard>
      </div>
    </div>
  );
}