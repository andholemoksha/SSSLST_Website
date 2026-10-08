import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Text/text";
import { projectsContent } from "@/content/projects";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import { FilterPanel } from "@/features/projects/components/FilterPanel";
import { ActiveFilterChips } from "@/features/projects/components/ActiveFilterChips";

const EMPTY_FILTERS = { year: [], gender: [], state: [], category: [] };

export function ProjectsArchivePage() {
  // Selected filter values (arrays per type) + the committed, debounced search.
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Debounce the search box (300ms) before it becomes a committed filter.
  // Committing a new term also resets to the first page.
  useEffect(() => {
    const id = setTimeout(() => {
      const next = searchInput.trim();
      setSearch(next);
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const activeFilters = useMemo(
    () => ({ ...filters, search }),
    [filters, search]
  );

  const query = useProjects(activeFilters, page);

  function toggle(key, value) {
    setFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
    setPage(1);
  }

  function clearAll() {
    setFilters(EMPTY_FILTERS);
    setSearchInput("");
    setSearch("");
    setPage(1);
  }

  const hasActiveFilters =
    filters.year.length ||
    filters.gender.length ||
    filters.state.length ||
    filters.category.length;

  return (
    <>
      <Section className="py-8 sm:py-10 xl:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-surface p-5">
              <FilterPanel filters={filters} onToggle={toggle} onClear={clearAll} />
            </div>
          </aside>

          {/* Results column */}
          <div className="min-w-0 flex-1">
            {/* Search + mobile filters trigger */}
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={projectsContent.searchPlaceholder}
                  aria-label={projectsContent.searchPlaceholder}
                  className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button
                variant="solid"
                onClick={() => setSheetOpen(true)}
                icon={<SlidersHorizontal className="h-4 w-4" />}
                iconPosition="left"
                className="shrink-0 lg:hidden"
              >
                {projectsContent.filtersLabel}
              </Button>
            </div>

            {/* Active-filter summary — only on small screens; desktop relies on the sidebar */}
            {hasActiveFilters ? (
              <div className="mb-5 lg:hidden">
                <ActiveFilterChips filters={filters} onRemove={toggle} />
              </div>
            ) : null}

            <ProjectsGrid query={query} page={page} onPageChange={setPage} />
          </div>
        </div>
      </Section>

      {/* Mobile filter sheet */}
      {sheetOpen ? (
        <MobileFilterSheet
          filters={filters}
          onToggle={toggle}
          onClear={clearAll}
          onClose={() => setSheetOpen(false)}
        />
      ) : null}
    </>
  );
}

function MobileFilterSheet({ filters, onToggle, onClear, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex p-4 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Inset panel with margin all around on small screens */}
      <div className="relative flex max-h-full w-full flex-col overflow-hidden rounded-2xl bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <Text as="h2" variant="heading" size="lg" weight="semibold">
            {projectsContent.filtersLabel}
          </Text>
          <div className="flex items-center gap-2">
            <Button variant="link" size="sm" onClick={onClear}>
              {projectsContent.clearAllLabel}
            </Button>
            <Button
              variant="neutral"
              size="icon-sm"
              onClick={onClose}
              aria-label="Close filters"
              icon={<X />}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterPanel
            filters={filters}
            onToggle={onToggle}
            onClear={onClear}
            showHeader={false}
          />
        </div>

        <div className="border-t border-border p-4">
          <Button variant="solid" onClick={onClose} className="w-full">
            {projectsContent.applyLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
