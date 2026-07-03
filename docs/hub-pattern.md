# Hub → Detail Pattern (SSSLST Website)

**Status:** Implemented for Projects on branch `feature/projects`.
**Applies to:** Projects, Samithi Connect, Gallery, Testimonials (any "categories → items" page).
**Stack note:** This reflects the real codebase — JavaScript, feature-based, Tailwind v4,
React Query-shaped hooks. Follows the rules in `frontend/AGENT.md`.

Inspired by the SSSIHL programmes page: a grid of equally-sized cards where each
card navigates to a dedicated page for that item. Build the shared pieces once;
each page just feeds different data.

---

## 1. The pattern

```
LEVEL 1 — HUB PAGE                          LEVEL 2 — DETAIL / LIST PAGE
┌──────────────────────────────┐           ┌───────────────────────────────┐
│ PageHeader (title + intro)    │           │ (category hero + heading)      │
│ ┌──────┐ ┌──────┐ ┌──────┐   │  click    │ ┌──────┐ ┌──────┐ ┌──────┐    │
│ │ card │ │ card │ │ card │   │ ────────► │ │ item │ │ item │ │ item │    │
│ └──────┘ └──────┘ └──────┘   │  a card   │ └──────┘ └──────┘ └──────┘    │
└──────────────────────────────┘           └───────────────────────────────┘
```

Max 3 clicks to any content: **Hub (1) → Category (2) → Item detail (3)**.

---

## 2. Routing (in `src/App.jsx`)

Implemented now:

| Route | Element | Status |
|---|---|---|
| `/projects` | `ProjectsPage` (hub) | ✅ built |
| `/projects/:categorySlug` | `ProjectCategoryPage` | ✅ blank placeholder |
| `/projects/:categorySlug/:projectSlug` | (project detail) | ⏳ later |

Planned for reuse (same shape):

| Page | Hub | Detail |
|---|---|---|
| Samithi Connect | `/samithi-connect` | `/samithi-connect/:itemSlug` |
| Gallery | `/gallery` | `/gallery/:batchSlug` |
| Testimonials | `/testimonials` | `/testimonials/:batchSlug` |

`slug` = URL-safe id (e.g. `medical-healthcare`). Never put DB numeric ids in URLs.

---

## 3. Files that make up the Projects hub

```
src/content/projects.js                              # static taxonomy (the 8 wings) + asset images
src/features/projects/hooks/useProjectCategories.js  # hook: static now, API-ready
src/features/projects/components/CategoryCard.jsx    # ONE reusable tile
src/features/projects/components/CategoryGrid.jsx    # grid; consumes the hook
src/pages/ProjectsPage.jsx                           # PageHeader + Section + CategoryGrid
src/pages/ProjectCategoryPage.jsx                    # Level-2 placeholder
src/assets/categories/*.jpg|.jpeg                    # local photos (imported, not hardcoded URLs)
```

This mirrors `AGENT.md`: **Component → Hook → (Service → API later)**, static content in
`content/`, images as assets, absolute `@/` imports.

---

## 4. Card sizing & grid (as built)

**Grid** (`CategoryGrid.jsx`): `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`
- mobile 1 col → tablet 2 → desktop 4. Inside `Container` (max-w-5xl).

**Card** (`CategoryCard.jsx`, on top of `ui/card`):
- Image: `aspect-[4/3]`, `object-cover`; brand-gradient behind it as fallback.
- Text area: title (`text-text-h`), description (`text-text`), then a bottom row:
  count in `text-brand-purple` ("N Projects") + "View →" in `text-brand-saffron`.
- **Hover (pure CSS, no framer-motion):** card `group-hover:-translate-y-1` +
  `group-hover:shadow-lg`; image `group-hover:scale-105`; arrow
  `group-hover:translate-x-1`. ~200ms transitions.
- Whole card is a `<Link>` to `/projects/:slug` with a saffron focus ring.

Keep this the single card component; other hub pages reuse it (or a copy in their
feature folder with the same look) — no per-page restyling.

---

## 5. Data shape (static now = future API shape)

`src/content/projects.js` exports `projectCategories`:

```js
import spiritualWing from "@/assets/categories/spiritual-wing.jpg";
// ...
export const projectCategories = [
  {
    slug: "spiritual-wing",
    title: "Spiritual Wing",
    description: "Bhajans, satsangs, and devotional service initiatives.",
    image: spiritualWing,   // imported asset (later: URL from Django)
    count: 12,              // placeholder count
  },
  // ...
];
```

**Fixed category slugs (do not rename after build):**
`spiritual-wing`, `service-wing`, `education-wing`, `youth-wing`,
`medical-healthcare`, `rural-development`, `environment`, `other`.

---

## 6. The hook (why the UI won't change when the API arrives)

`useProjectCategories.js` returns the **same shape React Query gives**:

```js
export function useProjectCategories() {
  return { data: projectCategories, isLoading: false, isError: false };
}
```

`CategoryGrid` already destructures `{ data, isLoading, isError }` and renders a
`Loader` / empty state. When Django is ready, swap the hook body for:

```js
return useQuery({ queryKey: ["project-categories"], queryFn: getProjectCategories });
```

…where `getProjectCategories` is an Axios call in
`features/projects/services/project.service.js`. **No component changes.**
(This is exactly `AGENT.md` > Hooks: "Today return static, tomorrow React Query.")

---

## 7. Level-2 (category detail) — later

`/projects/:categorySlug` is a blank placeholder now. When built, it will follow
the existing dynamic scaffold already in the repo:
`useProjects()` → `getProjects()` (Axios) → `ProjectsGrid` / `ProjectCard`,
filtered by `categorySlug` (and a batch filter). Reuse those files.

---

## 8. Reusing for other hub pages

For Samithi Connect / Gallery / Testimonials, repeat the same 6 pieces inside that
feature folder:
1. `content/<feature>.js` (or a service+hook if fully dynamic) with the item list.
2. A hook returning `{ data, isLoading, isError }`.
3. A `CategoryCard`-style tile (same look) + a grid.
4. A hub page (`PageHeader` + `Section` + grid).
5. A `:slug` detail route + page.

---

## 9. Rules

- One card look across all hub pages — change it in the component, not per page.
- All colours from theme tokens (`text-brand-*`, `text-text`, `bg-muted`…), never
  hardcoded hex in components. See `docs/design-tokens.md`.
- URLs use slugs, not numeric ids.
- Static content lives in `content/`; images are imported assets.
- Max 3 clicks to any content.
