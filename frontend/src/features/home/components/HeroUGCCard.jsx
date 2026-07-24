import { Landmark } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Text } from "@/components/ui/Text/text";

export function HeroUGCCard({ ugc }) {
  return (
    <GlassCard className="flex items-center gap-4 p-5 text-white">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glow-accent">
          <Landmark className="h-6 w-6 text-accent" aria-hidden="true" />
      </div>
      <div>
        <Text variant="heading" size="lg" weight="bold" color="text-white">{ugc.title}</Text>
        <Text size="sm" color="text-white/75">{ugc.subtitle}</Text>
      </div>
    </GlassCard>
  );
}
