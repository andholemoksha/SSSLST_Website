import { useState } from "react";
import { Search } from "lucide-react";
import { testimonialFilters, testimonialsContent } from "@/content/testimonials";

/** One checkbox row (multi-select). */
function CheckRow({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-primary"
      />
      <span className="truncate">{label}</span>
    </label>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-border py-4">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

/**
 * Left sidebar: search + multi-select filters (states / batch / gender).
 * Selecting anything updates `filters` in the parent → results re-render.
 */
export function TestimonialFilters({ filters, setFilters }) {
  const [stateQuery, setStateQuery] = useState("");
  const t = testimonialsContent;

  const toggle = (key, value) =>
    setFilters((f) => {
      const set = new Set(f[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...f, [key]: [...set] };
    });

  const anySelected =
    filters.search ||
    filters.states.length ||
    filters.years.length ||
    filters.genders.length;

  const visibleStates = testimonialFilters.states.filter((s) =>
    s.name.toLowerCase().includes(stateQuery.trim().toLowerCase())
  );

  return (
    <aside className="w-full lg:w-72 lg:shrink-0">
      <div className="rounded-lg border border-border bg-card p-4">
        {/* header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            {t.filters.heading}
          </h2>
          {anySelected ? (
            <button
              type="button"
              onClick={() =>
                setFilters({ search: "", states: [], years: [], genders: [] })
              }
              className="text-xs font-medium text-accent hover:underline"
            >
              {t.filters.clearAll}
            </button>
          ) : null}
        </div>

        {/* search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
            placeholder={t.searchPlaceholder}
            className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Batch / years */}
        <FilterGroup title={t.filters.years}>
          {testimonialFilters.years.map((y) => (
            <CheckRow
              key={y}
              label={`Batch ${y}`}
              checked={filters.years.includes(y)}
              onChange={() => toggle("years", y)}
            />
          ))}
        </FilterGroup>

        {/* Gender */}
        <FilterGroup title={t.filters.gender}>
          {testimonialFilters.genders.map((g) => (
            <CheckRow
              key={g.value}
              label={g.label}
              checked={filters.genders.includes(g.value)}
              onChange={() => toggle("genders", g.value)}
            />
          ))}
        </FilterGroup>

        {/* States (multi-select + mini search) */}
        <FilterGroup title={t.filters.states}>
          <input
            type="search"
            value={stateQuery}
            onChange={(e) => setStateQuery(e.target.value)}
            placeholder={t.filters.stateSearch}
            className="mb-2 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="max-h-56 space-y-0.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
            {visibleStates.map((s) => (
              <CheckRow
                key={s.slug}
                label={s.name}
                checked={filters.states.includes(s.slug)}
                onChange={() => toggle("states", s.slug)}
              />
            ))}
            {visibleStates.length === 0 ? (
              <p className="py-2 text-xs text-muted-foreground">No states found.</p>
            ) : null}
          </div>
        </FilterGroup>
      </div>
    </aside>
  );
}
