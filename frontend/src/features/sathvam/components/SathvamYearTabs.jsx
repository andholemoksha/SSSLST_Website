import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text/text";

/**
 * SathvamYearTabs
 *
 * Horizontal pill-style tabs for selecting a year.
 * The most recent year is selected by default.
 */
export function SathvamYearTabs({ years, selectedYear, onYearChange, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 w-20 animate-pulse rounded-full bg-muted" />
        ))}
      </div>
    );
  }

  if (years.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={cn(
            "rounded-full px-6 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/40",
            selectedYear === year
              ? "bg-primary text-white shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-primary/10"
          )}
          aria-pressed={selectedYear === year}
        >
          <Text as="span" size="sm" className="font-semibold">
            {year}
          </Text>
        </button>
      ))}
    </div>
  );
}
