import { Section } from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";

export function HighlightsSection() {
  const { highlights } = useHomeContent();

  return (
    <Section id="highlights" className="scroll-mt-24" containerClassName="grid gap-6 sm:grid-cols-3">
      {highlights.map((highlight) => (
        <Card key={highlight.title}>
          <CardHeader>
            <CardTitle>{highlight.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {highlight.description}
          </CardContent>
        </Card>
      ))}
    </Section>
  );
}
