import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { CurriculumIcon } from "@/features/curriculum/components/CurriculumIcon";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

export function CurriculumGains() {
  const { gains } = useCurriculumContent();

  return (
    <Section>
      <div className="mx-auto max-w-4xl text-center">
        <Text variant="eyebrow" size="xs">{gains.eyebrow}</Text>
        <Text as="h2" variant="heading" size="section" className="mt-2">{gains.title}</Text>
        <Text variant="muted" className="mt-3">{gains.description}</Text>
      </div>
      <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {gains.items.map((item) => (
          <Card key={item.title} className="h-full"><CardContent className="flex h-full flex-col items-center p-5 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"><CurriculumIcon name={item.icon} className="h-6 w-6" /></div><Text as="h3" variant="heading" size="card" className="mt-4">{item.title}</Text><Text variant="muted" size="sm" className="mt-2">{item.description}</Text></CardContent></Card>
        ))}
      </div>
    </Section>
  );
}
