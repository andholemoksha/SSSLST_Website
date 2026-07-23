import { Section } from "@/components/layout/Section";
import { TileCard } from "@/components/ui/tile-card";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";

export function HighlightsSection() {
  const { highlights } = useHomeContent();

  return (
    <Section id="highlights" className="scroll-mt-24" containerClassName="grid gap-6 sm:grid-cols-3">
      {highlights.map((highlight) => (
        <TileCard
          key={highlight.title}
          title={highlight.title}
          description={highlight.description}
          initials={highlight.title.slice(0, 2).toUpperCase()}
          showFooter={false}
        />
      ))}
    </Section>
  );
}
