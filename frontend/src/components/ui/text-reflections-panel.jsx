import { Text } from "@/components/ui/Text/text";

/**
 * Shared presentational panel for text reflections (year picker, states, card list).
 *
 * Used by both Dhyana Vahini and Samithi Connect reflections pages.
 *
 * Props:
 * - eyebrow        optional eyebrow label above the title (e.g. "Dhyana Vahini")
 * - title          panel heading text (default: "Text Reflections")
 * - headingAs      heading element for the title — "h1" | "h2" (default: "h1")
 * - years          array of available year values
 * - selectedYear   currently selected year
 * - onYearChange   callback receiving the new year string when selection changes
 * - isYearsLoading whether the years list is still loading
 * - isYearsError   whether fetching years failed
 * - reflections    array of { id, name, reflection } objects
 * - isLoading      whether reflections are loading
 * - isError        whether fetching reflections failed
 * - selectId       id for the <select> element (accessibility)
 */
export function TextReflectionsPanel({
  eyebrow,
  title = "Text Reflections",
  headingAs = "h1",
  years = [],
  selectedYear = "",
  onYearChange,
  isYearsLoading = false,
  isYearsError = false,
  reflections = [],
  isLoading = false,
  isError = false,
  selectId = "reflection-year",
}) {
  const cardHeadingAs = headingAs === "h1" ? "h2" : "h3";

  return (
    <>
      {eyebrow ? <Text variant="eyebrow" size="sm">{eyebrow}</Text> : null}

      <Text as={headingAs} variant="heading" size="3xl" className={eyebrow ? "mt-4 sm:text-4xl" : "sm:text-4xl"}>
        {title}
      </Text>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label htmlFor={selectId} className="text-sm font-medium text-foreground">Year</label>
        <select
          id={selectId}
          disabled={isYearsLoading || isYearsError || !years.length}
          value={selectedYear}
          onChange={(event) => onYearChange?.(event.target.value)}
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
      ) : isYearsLoading || !selectedYear ? (
        <Text variant="muted" className="py-12 text-center">Loading reflection years...</Text>
      ) : isLoading ? (
        <Text variant="muted" className="py-12 text-center">Loading reflections...</Text>
      ) : isError ? (
        <Text variant="muted" className="py-12 text-center">Unable to load reflections. Please try again later.</Text>
      ) : reflections.length ? (
        <div className="mt-10 space-y-6">
          {reflections.map((reflection) => (
            <article key={reflection.id} className="rounded-xl border border-border bg-surface p-6">
              <Text as={cardHeadingAs} variant="heading" size="xl">{reflection.name}</Text>
              <Text variant="muted" size="sm" className="mt-1">{reflection.id}</Text>
              <Text leading="relaxed" className="mt-4 whitespace-pre-line">{reflection.reflection}</Text>
            </article>
          ))}
        </div>
      ) : (
        <Text variant="muted" className="py-12 text-center">No reflections are available for {selectedYear}.</Text>
      )}
    </>
  );
}
