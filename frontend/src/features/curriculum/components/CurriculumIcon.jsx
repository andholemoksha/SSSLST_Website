import { BadgeCheck, Brain, Building2, CalendarDays, ChartNoAxesCombined, ClipboardList, Clock3, Flower2, Globe2, GraduationCap, Handshake, Heart, Landmark, Laptop, Lightbulb, MessageSquare, NotebookPen, Users } from "lucide-react";

const iconMap = { badge: BadgeCheck, brain: Brain, building: Building2, calendar: CalendarDays, chart: ChartNoAxesCombined, clipboard: ClipboardList, clock: Clock3, flower: Flower2, globe: Globe2, graduation: GraduationCap, handshake: Handshake, heart: Heart, landmark: Landmark, laptop: Laptop, lightbulb: Lightbulb, message: MessageSquare, notebook: NotebookPen, users: Users };

export function CurriculumIcon({ name, className }) {
  const Icon = iconMap[name] ?? Flower2;
  return <Icon className={className} aria-hidden="true" />;
}
