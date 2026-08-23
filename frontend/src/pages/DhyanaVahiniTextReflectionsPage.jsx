import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
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
        <Text variant="eyebrow" size="sm">Dhyana Vahini</Text>
        <Text as="h1" variant="heading" size="3xl" className="mt-4 sm:text-4xl">Text Reflections</Text>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label htmlFor="reflection-year" className="text-sm font-medium text-foreground">Year</label>
          <select
            id="reflection-year"
            disabled={isYearsLoading || isYearsError || !years.length}
            value={year}
            onChange={(event) => setSelectedYear(event.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {isYearsLoading ? <option value="">Loading years...</option> : null}
            {!isYearsLoading && !years.length ? <option value="">No years available</option> : null}
            {years.map((availableYear) => (
              <option key={availableYear} value={availableYear}>{availableYear}</option>
            ))}
          </select>
        </div>

        {isYearsError ? (
          <Text variant="muted" className="py-12 text-center">Unable to load reflection years. Please try again later.</Text>
        ) : isYearsLoading || !year ? (
          <Text variant="muted" className="py-12 text-center">Loading reflection years...</Text>
        ) : isLoading ? (
          <Text variant="muted" className="py-12 text-center">Loading reflections...</Text>
        ) : isError ? (
          <Text variant="muted" className="py-12 text-center">Unable to load reflections. Please try again later.</Text>
        ) : reflections.length ? (
          <div className="mt-10 space-y-6">
            {reflections.map((reflection) => (
              <article key={reflection.id} className="rounded-xl border border-border bg-surface p-6">
                <Text as="h2" variant="heading" size="xl">{reflection.name}</Text>
                <Text variant="muted" size="sm" className="mt-1">{reflection.id}</Text>
                <Text leading="relaxed" className="mt-4 whitespace-pre-line">{reflection.reflection}</Text>
              </article>
            ))}
          </div>
        ) : (
          <Text variant="muted" className="py-12 text-center">No reflections are available for {year}.</Text>
        )}
      </div>
    </Section>
  );
}
