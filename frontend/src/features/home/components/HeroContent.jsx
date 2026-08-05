import { HeroButtons } from "@/features/home/components/HeroButtons";
import { Text } from "@/components/ui/Text/text";
import { GlassCard } from "@/components/ui/glass-card";

export function HeroContent({ hero }) {
  return (
    <div className="text-white">
      <Text variant="eyebrow" size="sm" className="hidden lg:block">
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
        <GlassCard className="min-w-[120px] rounded-xl px-3 py-3 shrink-0">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
            Duration
          </p>

          <h3 className="mt-1 text-sm sm:text-base font-semibold text-white">
            12 Months
          </h3>
        </GlassCard>

        <GlassCard className="min-w-[120px] rounded-xl px-3 py-3 shrink-0">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
            Credits
          </p>

          <h3 className="mt-1 text-sm sm:text-base font-semibold text-white">
            X Credits
          </h3>
        </GlassCard>

        <GlassCard className="min-w-[155px] rounded-xl px-3 py-3 shrink-0">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
            Streams
          </p>

          <h3 className="mt-1 text-sm sm:text-base font-semibold text-white">
            English & Hindi
          </h3>
        </GlassCard>
      </div>
    </div>
  );
}