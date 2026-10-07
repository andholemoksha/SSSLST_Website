import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/Text/text";
import { wingAccent, projectsContent } from "@/content/projects";

/**
 * A single project tile for the archive grid.
 *
 * The card itself is NOT a router link. The footer "View →" anchor opens the
 * external document in a new tab.
 */
export function ProjectCard({ project }) {
  const { title, year, state, gender, category, category_label, description, document_url } =
    project;
  const accent = wingAccent(category);
  // Use the full admin category name (e.g. "Medical / Healthcare").
  const badgeLabel = category_label || category;

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      {/* Coloured accent bar keyed to the wing */}
      <div className="h-1.5 w-full" style={{ backgroundColor: accent.bar }} aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category badge */}
        <span
          className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: accent.badgeBg, color: accent.badgeText }}
        >
          {badgeLabel}
        </span>

        <Text as="h3" variant="heading" size="base" className="line-clamp-2">
          {title}
        </Text>

        {description ? (
          <Text variant="muted" size="sm" className="line-clamp-3">
            {description}
          </Text>
        ) : null}

        <div className="mt-auto">
          <Text variant="muted" size="sm">
            {state} · {year}
          </Text>
          <Text variant="muted" size="sm">
            {gender}
          </Text>
        </div>

        <a
          href={document_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Text
            as="span"
            variant="body"
            size="sm"
            weight="semibold"
            color="text-accent"
            className="inline-flex items-center gap-1"
          >
            {projectsContent.viewLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Text>
        </a>
      </div>
    </Card>
  );
}
