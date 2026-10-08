import { ChevronLeft, ChevronRight } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/Button/button";
import { CardGrid } from "@/components/ui/card-grid";
import { Text } from "@/components/ui/Text/text";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { projectsContent } from "@/content/projects";
import { PROJECTS_PAGE_SIZE } from "@/features/projects/services/project.service";

/**
 * Results area: count header, responsive card grid, and numbered pagination.
 *
 * @param {object}   props
 * @param {object}   props.query  the useProjects() result ({ data, isLoading, ... })
 * @param {number}   props.page   current 1-based page
 * @param {Function} props.onPageChange
 */
export function ProjectsGrid({ query, page, onPageChange }) {
  const { data, isLoading, isError, isPlaceholderData } = query;

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <Text variant="muted" className="py-16 text-center">
        {projectsContent.errorMessage}
      </Text>
    );
  }

  const count = data?.count ?? 0;
  const results = data?.results ?? [];
  const totalPages = Math.max(1, Math.ceil(count / PROJECTS_PAGE_SIZE));

  return (
    <div>
      {/* Count header */}
      <div className="mb-5 flex items-center justify-between">
        <Text variant="heading" size="base" weight="semibold">
          {`${count} ${projectsContent.countNoun}`}
        </Text>
        {totalPages > 1 ? (
          <Text variant="muted" size="sm">
            Page {page} of {totalPages}
          </Text>
        ) : null}
      </div>

      {results.length === 0 ? (
        <Text variant="muted" className="py-16 text-center">
          {projectsContent.emptyMessage}
        </Text>
      ) : (
        <CardGrid
          columns={3}
          className={isPlaceholderData ? "opacity-60 transition-opacity" : undefined}
        >
          {results.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </CardGrid>
      )}

      {totalPages > 1 ? (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      ) : null}
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  const pages = pageWindow(page, totalPages);

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
      aria-label="Projects pagination"
    >
      <Button
        variant="outline"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft
          className="h-5 w-5 shrink-0 text-[color:var(--accent)]"
          aria-hidden="true"
        />
      </Button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "solid" : "outline"}
            size="cell"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon-sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight
          className="h-5 w-5 shrink-0 text-[color:var(--accent)]"
          aria-hidden="true"
        />
      </Button>
    </nav>
  );
}

/** Compact page list with ellipses, e.g. [1 … 4 5 6 … 20]. */
function pageWindow(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const out = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}
