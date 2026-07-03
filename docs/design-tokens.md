# Design Tokens (SSSLST Website)

**One color system for every page.** No page-specific hex. Colors are defined as
**Tailwind v4 theme tokens** inside `frontend/src/index.css` (`@theme`), and used
via class names (`bg-muted`, `text-text`, `text-brand-saffron`…).

**Stack note:** This project uses **Tailwind v4** — there is **no `tailwind.config.js`**.
Tokens live in CSS (`@import "tailwindcss";` + `@theme { --color-*: … }`).

---

## How theming works here

`src/index.css`:

```css
@import "tailwindcss";

:root {
  --color-text: #6b6375;
  --color-text-h: #08060d;
  --color-bg: #ffffff;
  --color-border: #e5e4e7;
  --color-muted: #f4f3ec;
  --color-accent: #aa3bff;
  --sans: system-ui, "Segoe UI", Roboto, sans-serif;
}

@theme {
  /* team base tokens */
  --color-text: var(--color-text);
  --color-text-h: var(--color-text-h);
  --color-border: var(--color-border);
  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-text);
  --color-accent: var(--color-accent);

  /* SSSLST brand palette (from the new logo) — added alongside, non-destructive */
  --color-brand-indigo: #262261;
  --color-brand-purple: #7b2d8e;
  --color-brand-saffron: #f26522;
  --color-brand-magenta: #c5268b;
}
```

Any `--color-x` token in `@theme` becomes usable as `bg-x`, `text-x`, `border-x`,
`ring-x`, etc.

---

## Token reference

### Team base tokens (used site-wide)
| Class | Hex | Role |
|---|---|---|
| `text-text` | `#6b6375` | Body text |
| `text-text-h` | `#08060d` | Headings |
| `bg-muted` | `#f4f3ec` | Subtle surfaces / PageHeader band |
| `border-border` | `#e5e4e7` | Borders, dividers |
| `bg-accent` | `#aa3bff` | Current accent (badges, etc.) |

### Brand tokens (from the new logo)
| Class | Hex | Role |
|---|---|---|
| `*-brand-indigo` | `#262261` | Deep indigo — structure/headers |
| `*-brand-purple` | `#7b2d8e` | Royal purple — labels/counts |
| `*-brand-saffron` | `#f26522` | Saffron — **CTAs, links, "View →", focus ring** |
| `*-brand-magenta` | `#c5268b` | Magenta — gradient stop / highlights |

**Card image gradient** (fallback behind photos): inline
`linear-gradient(135deg, #262261 0%, #7b2d8e 55%, #c5268b 100%)`
(indigo → purple → magenta), lifted from the logo.

### Where the brand tokens are used today
`features/projects/components/CategoryCard.jsx` — count (`text-brand-purple`),
"View →" (`text-brand-saffron`), focus ring (`ring-brand-saffron`), image gradient.

---

## ⚠️ Open decision for the team
The base **`--color-accent` is `#aa3bff`** (a placeholder purple from the initial
setup), which differs from the logo's palette. The brand tokens above were added
**without changing** `--color-accent`, so existing pages (Home, etc.) are
unaffected. **Whether to make the whole site adopt the logo palette** (e.g. set
`--color-accent` to a brand value, restyle badges/buttons) is a team call — do it
in one PR to `index.css` when everyone's ready, and every page updates at once.

---

## Typography
- Base font: `system-ui, "Segoe UI", Roboto, sans-serif` (`--sans`).
- (The old prototype used Playfair Display for headings — not in the current base.
  Add later if the team wants a display heading font.)

---

## Heritage reference (OLD sssnlp.org — do NOT use, kept for context)
Deep purple `#57035B`, plum `#4C173B`, magenta `#C5268B`, pink `#F21195`,
near-white `#F5FAFD`, charcoal `#32373C`. The purple+magenta lineage carries into
the new logo, which adds indigo + saffron.

---

## Rule
Change colors ONLY in `src/index.css` (`:root` + `@theme`). Never hardcode hex in
components (the one intentional exception is the card image gradient, documented
above).
