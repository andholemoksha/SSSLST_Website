import { X } from "lucide-react";
import { WINGS } from "@/content/projects";

const WING_LABEL = Object.fromEntries(WINGS.map((w) => [w.slug, w.label]));

/**
 * Removable pills summarising the currently applied filters (below the search).
 * Each pill reads "<Type> | <value>", e.g. "Year | 2020".
 *
 * @param {object}   props.filters  { year, gender, state, category } arrays
 * @param {Function} props.onRemove (key, value) => void
 */
export function ActiveFilterChips({ filters, onRemove }) {
  const chips = [
    ...filters.year.map((v) => ({ key: "year", value: v, type: "Year", label: String(v) })),
    ...filters.gender.map((v) => ({ key: "gender", value: v, type: "Gender", label: v })),
    ...filters.state.map((v) => ({ key: "state", value: v, type: "State", label: v })),
    ...filters.category.map((v) => ({
      key: "category",
      value: v,
      type: "Category",
      label: WING_LABEL[v] ?? v,
    })),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          type="button"
          onClick={() => onRemove(chip.key, chip.value)}
          className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm text-foreground transition-colors hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Remove ${chip.type} ${chip.label} filter`}
        >
          <span className="font-medium text-muted-foreground">{chip.type}</span>
          <span aria-hidden="true" className="text-muted-foreground">|</span>
          <span>{chip.label}</span>
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
