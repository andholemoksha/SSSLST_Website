import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Text/text";
import { cn } from "@/lib/utils";
import {
  GENDERS,
  INDIAN_STATES,
  PROJECT_YEARS,
  WINGS,
  projectsContent,
} from "@/content/projects";

/**
 * The filter controls shared by the desktop sidebar and the mobile sheet.
 *
 * Year, Category/Wing, State and Gender are collapsible sections (shared
 * Accordion — single-open) with a selected-count badge in each trigger.
 *
 * Stateless w.r.t. the selected values — the parent owns `filters` and gets
 * change notifications via `onToggle` (multi-select arrays) and `onClear`.
 *
 * @param {object}   props.filters   { year:number[], gender:string[], state:string[], category:string[] }
 * @param {Function} props.onToggle  (key, value) => void
 * @param {Function} props.onClear   () => void
 */
export function FilterPanel({ filters, onToggle, onClear, showHeader = true }) {
  return (
    <div className="flex flex-col gap-5">
      {showHeader ? (
        <div className="flex items-center justify-between">
          <Text as="h2" variant="heading" size="lg" weight="semibold">
            {projectsContent.filtersLabel}
          </Text>
          <Button variant="link" size="sm" onClick={onClear}>
            {projectsContent.clearAllLabel}
          </Button>
        </div>
      ) : null}

      <Accordion>
        <AccordionItem value="year">
          <AccordionTrigger>
            <TriggerLabel label="Year" count={filters.year.length} />
          </AccordionTrigger>
          <AccordionContent>
            <ChipRow
              options={PROJECT_YEARS.map((y) => ({ value: y, label: String(y) }))}
              selected={filters.year}
              onToggle={(v) => onToggle("year", v)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>
            <TriggerLabel label="Category / Wing" count={filters.category.length} />
          </AccordionTrigger>
          <AccordionContent>
            <ChipRow
              options={WINGS.map((w) => ({ value: w.slug, label: w.label }))}
              selected={filters.category}
              onToggle={(v) => onToggle("category", v)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="state">
          <AccordionTrigger>
            <TriggerLabel label="State" count={filters.state.length} />
          </AccordionTrigger>
          <AccordionContent>
            <StateList selected={filters.state} onToggle={(v) => onToggle("state", v)} />
          </AccordionContent>
              </AccordionItem>

              <AccordionItem value="gender">
                  <AccordionTrigger>
                      <TriggerLabel label="Gender" count={filters.gender.length} />
                  </AccordionTrigger>
                  <AccordionContent>
                      <ChipRow
                          options={GENDERS.map((g) => ({ value: g, label: g }))}
                          selected={filters.gender}
                          onToggle={(v) => onToggle("gender", v)}
                      />
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
    </div>
  );
}

/** Label + selected-count badge shown inside an accordion trigger. */
function TriggerLabel({ label, count }) {
  return (
    <span className="flex items-center gap-2">
      <Text as="span" variant="heading" size="sm" weight="semibold">
        {label}
      </Text>
      {Number(count) > 0 ? (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </span>
  );
}

/** One checkbox + label row (used by the State list). */
function CheckboxRow({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-left text-sm hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
          checked ? "border-primary bg-primary text-primary-foreground" : "border-border"
        )}
      >
        {checked ? <Check className="h-3 w-3" /> : null}
      </span>
      <span className="text-foreground">{label}</span>
    </button>
  );
}

function ChipRow({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(opt.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground hover:bg-muted"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** State accordion body: a search box above the scrollable checkbox list. */
function StateList({ selected, onToggle }) {
  const [filter, setFilter] = useState("");

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return INDIAN_STATES;
    return INDIAN_STATES.filter((s) => s.toLowerCase().includes(q));
  }, [filter]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={projectsContent.stateSearchPlaceholder}
        className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <ul className="max-h-56 overflow-y-auto pr-1">
        {visible.map((state) => (
          <li key={state}>
            <CheckboxRow
              label={state}
              checked={selected.includes(state)}
              onToggle={() => onToggle(state)}
            />
          </li>
        ))}
        {visible.length === 0 ? (
          <li className="px-1 py-1.5 text-sm text-muted-foreground">No matching states</li>
        ) : null}
      </ul>
    </div>
  );
}
