import { useState } from "react";
import { ChevronDown, FolderOpen } from "lucide-react";
import { Text } from "@/components/ui/Text/text";
import { NewsletterCard } from "@/features/newsletter/components/NewsletterCard";

/**
 * A collapsible archive card for a past (completed) year.
 * Collapsed: a single "folder" card. Click to expand the year's month grid
 * inline. Each archive card manages its own open/closed state.
 */
export function NewsletterYearArchive({ year, issues }) {
  const [isOpen, setIsOpen] = useState(false);
  const count = issues.length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-white">
            <FolderOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <Text as="span" variant="heading" size="lg" leading="tight">
              {year}
            </Text>
            <Text as="span" size="sm" className="text-muted-foreground">
              {count} {count === 1 ? "edition" : "editions"}
            </Text>
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div className="border-t border-border p-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <NewsletterCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
