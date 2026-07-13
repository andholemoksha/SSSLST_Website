import { SectionDivider } from "@/components/ui/section-divider";
import { GlassGrid } from "@/components/ui/glass-grid";
import { HeroFeatureCard } from "@/features/home/components/HeroFeatureCard";

export function HeroFeaturesGrid({ features }) {
  return (
    <div className="text-white">
      <SectionDivider label="Programme Highlights" variant="sparkle" />
      <GlassGrid columns={3} className="mt-6">
        {features.map((feature) => (
          <HeroFeatureCard key={feature.label} {...feature} />
        ))}
      </GlassGrid>
    </div>
  );
}
