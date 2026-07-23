import {
  Calendar,
  Flower2,
  Users,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

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
    <GlassCard className="flex w-40 shrink-0 snap-start flex-col items-center gap-3 p-5 text-center sm:w-auto">
      <div className="flex h-12 w-12 items-center justify-center rounded-full glow-accent">
          <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
      </div>
      <span className="text-sm font-medium text-white">{label}</span>
    </GlassCard>
  );
}
