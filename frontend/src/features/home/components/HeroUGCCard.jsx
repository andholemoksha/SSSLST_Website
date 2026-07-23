import { Landmark } from "lucide-react";
import { TileCard } from "@/components/ui/tile-card";

export function HeroUGCCard({ ugc }) {
  return (
    <TileCard
      title={ugc.title}
      description={ugc.subtitle}
      media={
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <Landmark className="h-6 w-6 text-accent" aria-hidden="true" />
        </div>
      }
      showFooter={false}
      cta={null}
      cardClassName="border-primary/20 bg-white/10 text-white shadow-lg backdrop-blur-sm"
    />
  );
}
