import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { TextReflectionsPanel } from "@/components/ui/text-reflections-panel";
import { useDhyanaVahiniText } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniText";
import { useDhyanaVahiniYears } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniVideos";

export function DhyanaVahiniTextReflectionsPage() {
  const [selectedYear, setSelectedYear] = useState("");
  const { years, isLoading: isYearsLoading, isError: isYearsError } = useDhyanaVahiniYears();
  const year = selectedYear || years[0] || "";
  const { reflections, isLoading, isError } = useDhyanaVahiniText(year);

  return (
    <Section className="bg-background py-6 sm:py-10 lg:py-14 xl:py-18">
      <Link
        to="/programme/dhyana-vahini"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-link transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dhyana Vahini
      </Link>
      <div className="rounded-4xl border border-border bg-background p-8 shadow-md sm:p-12">
        <TextReflectionsPanel
          eyebrow="Dhyana Vahini"
          title="Text Reflections"
          headingAs="h1"
          selectId="reflection-year"
          years={years}
          selectedYear={year}
          onYearChange={setSelectedYear}
          isYearsLoading={isYearsLoading}
          isYearsError={isYearsError}
          reflections={reflections}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </Section>
  );
}
