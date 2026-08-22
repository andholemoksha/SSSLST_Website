import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";

export function DhyanaVahiniTextReflectionsPage() {
  return (
    <Section className="bg-background py-6 sm:py-10 lg:py-14 xl:py-18">
      <Link
        to="/programme/dhyana-vahini"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-link transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dhyana Vahini
      </Link>
      <div className="rounded-[2rem] border border-border bg-background p-8 text-center shadow-md sm:p-12">
        <Text variant="eyebrow" size="sm">Dhyana Vahini</Text>
        <Text as="h1" variant="heading" size="3xl" className="mt-4 sm:text-4xl">Text Reflections</Text>
        <Text variant="muted" className="mx-auto mt-4 max-w-xl">
          Text reflections will be published here soon.
        </Text>
      </div>
    </Section>
  );
}
