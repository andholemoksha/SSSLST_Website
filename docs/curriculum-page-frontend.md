# Curriculum Page (Frontend)

## Overview

The **Curriculum** page describes what a participant actually does across the
12-month course. It has three parts:

1. A **hero header** — title, intro paragraph, and two fact cards (Duration,
   Mode), using the shared `HeroSection` (same header style as the Overview /
   Dhyana Vahini pages).
2. **Programme Structure — "What you will do"** — a grid of five part cards
   (Dhyana Vahini, Satvam, Samithi Connect, Projects, Lecture Sessions),
   followed by an "Also part of the course" info banner.
3. **Lecture sessions** — a tabbed section with four themes (Foundation, Be,
   Do, See & Tell); each tab shows its topics and a closing insight line.

Unlike most pages documented here, the Curriculum page is **frontend-static**:
there is **no Django model, API endpoint, serializer, or admin CMS** behind it.
All copy lives in a single content file and is rendered by React components. To
change the text, edit the content file — no migration, no admin step, no backend
deploy.

It is reached as a top-level nav item (beside Programme) at the route
`/curriculum`.

> Related: the old page previously at `/curriculum` was renamed to **Overview**
> and moved to `/programme/overview` (content in `curriculum.js`, page
> `OverviewPage.jsx`). This document is only about the **new Curriculum page**.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CONTENT (edit here)                           │
│                                                                      │
│  frontend/src/content/curriculum-page.js                             │
│       │  export const curriculumPage = {                             │
│       │    hero:     { title, subtitle, backgroundImage,             │
│       │                accentImage, facts: [ {label, value} ] },     │
│       │    parts:    { eyebrow, title, description,                   │
│       │                items: [ {icon, title, description,           │
│       │                          linkLabel?, linkTarget?} ],         │
│       │                noteTitle, note },                            │
│       │    lectures: { eyebrow, title, description,                  │
│       │                themes: [ {key, title, theme,                 │
│       │                           topics:[{title,description}],      │
│       │                           insight} ] } }                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         HOOK (returns content)                        │
│  frontend/src/features/curriculum-page/hooks/                        │
│       useCurriculumPageContent()  ->  curriculumPage                 │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         PAGE + COMPONENTS                             │
│  frontend/src/pages/CurriculumPage.jsx                               │
│       ├── <CurriculumIntro/>     → hero header + fact cards           │
│       ├── <CurriculumParts/>     → "What you will do" + info banner   │
│       └── <CurriculumLectures/>  → tabbed lecture themes              │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         USER EXPERIENCE                               │
│  Navbar → "Curriculum" (beside Programme)  →  /curriculum            │
│       Hero (title + intro + Duration/Mode)                           │
│       → Programme Structure (5 cards) → "Also part of…" banner       │
│       → Lecture sessions (Foundation | Be | Do | See & Tell tabs)     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Frontend structure

```
frontend/src/
├── content/
│   └── curriculum-page.js                          # all page copy (hero, parts, lectures)
├── features/curriculum-page/
│   ├── hooks/
│   │   └── useCurriculumPageContent.js             # returns the curriculumPage content object
│   └── components/
│       ├── CurriculumIntro.jsx                      # HeroSection header + Duration/Mode fact cards
│       ├── CurriculumParts.jsx                      # "What you will do" grid + "Also part of…" banner
│       └── CurriculumLectures.jsx                   # tabbed Foundation/Be/Do/See & Tell themes
└── pages/
    └── CurriculumPage.jsx                           # composes the three sections
```

Route wiring: `frontend/src/App.jsx` →
`<Route path="/curriculum" element={<CurriculumPage />} />`.

Nav wiring: `frontend/src/content/navigation.js` → a top-level
`{ title: "Curriculum", href: "/curriculum" }` entry placed right after the
Programme dropdown.

---

## Content shape

`frontend/src/content/curriculum-page.js` exports one object, `curriculumPage`,
with three keys:

### `hero`
| Field | Type | Notes |
|---|---|---|
| `label` | string | Eyebrow above the title. Empty here (hidden). |
| `title` | string | "Curriculum". |
| `subtitle` | string | Intro paragraph. |
| `backgroundImage` | string | Hero background (shared asset). |
| `accentImage` | string | Right-side hero image (shared asset). |
| `facts` | array | `[{ label, value }]` → the Duration / Mode cards. |

### `parts`
| Field | Type | Notes |
|---|---|---|
| `eyebrow` | string | "Programme Structure". |
| `title` | string | "What you will do". |
| `description` | string | Sub-line under the title. |
| `items` | array | Five `{ icon, title, description }` cards. The Lecture Sessions card also has `linkLabel` + `linkTarget` ("lectures") to jump to the tabs section. |
| `noteTitle` / `note` | string | Shown in the "Also part of the course" info banner. |

### `lectures`
| Field | Type | Notes |
|---|---|---|
| `eyebrow` / `title` / `description` | string | Section intro. |
| `themes` | array | Four `{ key, title, theme, topics[], insight }` objects. `key` is the tab label; `topics` is `[{ title, description }]`; `insight` is the closing line. |

`icon` values map through the existing
`frontend/src/features/curriculum/components/CurriculumIcon.jsx` (lucide icons).

---

## Design / styling

- **No hardcoded colors or fonts.** Everything uses the shared `<Text>`
  component and the site's semantic Tailwind tokens (`text-primary`,
  `bg-surface`, `bg-background`, `bg-secondary`, `border-accent`,
  `border-border`, `text-muted-foreground`, `ring-ring`), so the page inherits
  the same purple scheme as the rest of the site.
- **Reused components:** `HeroSection`, `Section`, `Container`, `Card`, `Text`,
  and `CurriculumIcon`.
- **Hero fact cards:** two solid purple-gradient cards (via the existing
  `--gradient-purple-to-pink` token) with white text, rendered through the
  `HeroSection` `actions` slot (same spacing as the home hero).
- **Panels:** the "What you will do" and "Lecture sessions" sections reuse the
  two Dhyana Vahini panel styles (`rounded-[2rem]` surfaces with the standard
  border/shadow/padding) for visual consistency.
- **Info banner:** the "Also part of the course" note uses the same banner style
  as the Overview page's "Selection Information" box (`bg-secondary`,
  `border-primary/15`, an `Info` icon, heading + message).
- **Lecture tabs:** an accessible tablist (`role="tablist"` / `role="tab"` /
  `role="tabpanel"`) with left/right arrow-key navigation and a visible
  focus ring.

---

## How to edit

| Change | Where |
|---|---|
| Title / intro / Duration / Mode | `curriculum-page.js` → `hero` |
| A programme-structure card | `curriculum-page.js` → `parts.items` |
| The "Also part of the course" banner | `curriculum-page.js` → `parts.noteTitle` / `parts.note` |
| A lecture theme, its topics, or insight | `curriculum-page.js` → `lectures.themes` |
| An icon on a part card | `icon` value (keys defined in `CurriculumIcon.jsx`) |
| The route or nav placement | `App.jsx` / `navigation.js` |

No build-time data, no API calls, no admin — edits to the content file appear on
the next page load (hot-reloads in dev).

---

## Summary

| Question | Answer |
|---|---|
| Backend model / API / admin? | No — fully frontend-static |
| Where is the content? | `frontend/src/content/curriculum-page.js` |
| Route | `/curriculum` |
| Nav placement | Top-level item beside the Programme dropdown |
| How to change copy | Edit the content file (no migration/admin) |
| Styling | Shared components + semantic tokens (no hardcoded hex) |
| Relation to Overview | Overview is the old Curriculum page, renamed and moved to `/programme/overview` |
