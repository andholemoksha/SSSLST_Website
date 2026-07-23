import {
  Calendar,
  Flower2,
  Users,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";
import { TileCard } from "@/components/ui/tile-card";

const iconMap = {
  calendar: Calendar,
  lotus: Flower2,
  community: Users,
  book: BookOpen,
  graduation: GraduationCap,
  certificate: Award,
};

export function HeroFeatureCard({ icon, label }) {
  const Icon = iconMap[icon];

  return (
    <TileCard
      title={label}
      media={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
          <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
        </div>
      }
      showFooter={false}
      cta={null}
      className="w-40 shrink-0 snap-start sm:w-auto"
      cardClassName="border-primary/20 bg-white/10 text-white shadow-lg backdrop-blur-sm"
    />
  );
}
