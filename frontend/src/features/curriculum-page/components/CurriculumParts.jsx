import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { CurriculumIcon } from "@/features/curriculum/components/CurriculumIcon";
import { useCurriculumPageContent } from "@/features/curriculum-page/hooks/useCurriculumPageContent";

function PartCard({ item }) {
  return (
    <Card className="h-full border-t-4 border-t-accent">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
          <CurriculumIcon name={item.icon} className="h-6 w-6" />
        </div>
        <Text as="h3" variant="heading" size="card" color="text-primary" className="mt-4">
          {item.title}
        </Text>
        <Text variant="muted" size="sm" leading="relaxed" className="mt-2">
          {item.description}
        </Text>
        {item.linkLabel ? (
          <a
            href={`#${item.linkTarget}`}
            className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function CurriculumParts() {
  const { parts } = useCurriculumPageContent();

  return (
    <Section className="pb-0 pt-8 sm:pt-10 xl:pt-12">
      <div className="max-w-3xl">
        <Text variant="eyebrow" size="xs">
          {parts.eyebrow}
        </Text>
        <Text as="h2" variant="heading" size="section" className="mt-2">
          {parts.title}
        </Text>
        <Text variant="muted" className="mt-3">
          {parts.description}
        </Text>
      </div>

      <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {parts.items.map((item) => (
          <PartCard key={item.title} item={item} />
        ))}
      </div>

      <Text variant="muted" size="sm" leading="relaxed" className="mt-6 max-w-3xl">
        {parts.note}
      </Text>
    </Section>
  );
}
