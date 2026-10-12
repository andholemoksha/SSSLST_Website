import { FolderOpen } from "lucide-react";
import { Text } from "@/components/ui/Text/text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { NetritvamCard } from "@/features/netritvam/components/NetritvamCard";

/**
 * A collapsible archive card for a past year of Netritvam issues.
 * Uses the shared Accordion (the same expand/collapse component the FAQ page
 * uses). Collapsed: a single "folder" row ("Netritvam <year>"). Expanded: the
 * year's issues in a 3-column grid.
 */
export function NetritvamYearArchive({ year, issues }) {
  const count = issues.length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <Accordion className="divide-y-0">
        <AccordionItem value={String(year)} className="py-0">
          <AccordionTrigger className="gap-4 px-5 py-4 transition-colors hover:bg-muted/40 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary">
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-white">
                <FolderOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <Text as="span" variant="heading" size="lg" leading="tight">
                  Netritvam {year}
                </Text>
                <Text as="span" size="sm" className="text-muted-foreground">
                  {count} {count === 1 ? "issue" : "issues"}
                </Text>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t border-border p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue) => (
                <NetritvamCard key={issue.id} issue={issue} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
