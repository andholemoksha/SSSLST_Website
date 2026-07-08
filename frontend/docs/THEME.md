# Theme & Design System — Developer Guide

This document explains how the design system defined in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
is implemented, and how to use it when building new components.

## Where things live

| Concern | Location |
|---|---|
| Color tokens (CSS variables) | [src/index.css](src/index.css) — `:root` block |
| Tailwind ↔ token wiring | [src/index.css](src/index.css) — `@theme inline` block |
| Fonts (Google Fonts load) | [index.html](index.html) `<link>` tags |
| Font family tokens | [src/index.css](src/index.css) — `--font-heading`, `--font-sans` |
| Global typography (body, headings) | [src/index.css](src/index.css) — `@layer base` |
| Container (max-width + padding) | [src/components/layout/Container.jsx](src/components/layout/Container.jsx) |
| Section (vertical rhythm) | [src/components/layout/Section.jsx](src/components/layout/Section.jsx) |
| Button variants | [src/components/ui/button-variants.js](src/components/ui/button-variants.js) |

There is no `tailwind.config.js`. This project uses Tailwind v4's CSS-first
configuration (`@theme` in `src/index.css`) via the `@tailwindcss/vite` plugin —
that file **is** the Tailwind config.

## Re-theming the whole site

Edit only the `:root` variables at the top of `src/index.css` (colors, fonts,
gradient). Everything else — Tailwind utilities, shadcn-style components,
existing pages — reads from those variables through the `@theme inline` block,
so a single edit re-themes the entire site.

## How to use the system in new components

- **Colors**: use semantic utilities only — `bg-primary`, `text-foreground`,
  `border-border`, `bg-muted`, `text-destructive`, etc. Never use raw Tailwind
  colors (`bg-purple-700`, `text-gray-500`) or hex values in `className`.
- **Fonts**: `font-heading` (Poppins) is applied automatically to `h1`–`h6`.
  `font-sans` (Inter) is applied automatically to `body`. You rarely need to
  set either manually.
- **Font sizes**: pick from the Typography Scale in DESIGN_SYSTEM.md
  (e.g. Section Heading = `text-2xl md:text-3xl lg:text-4xl`). Don't invent
  new sizes.
- **Layout**: wrap page sections in `<Section>`, and any custom-width content
  in `<Container>`. Don't hand-roll `max-w-*` / `px-*` on page content.
- **Spacing**: stick to the Tailwind scale steps called out in
  DESIGN_SYSTEM.md (`2 4 6 8 12 16`). Avoid arbitrary values like `mt-[17px]`.
- **Radius**: `rounded-xl` by default, `rounded-2xl` for large cards.
- **Shadows**: `shadow-sm` at rest, `shadow-md` on hover. Avoid `shadow-xl`/`shadow-2xl`.
- **Gradients**: only for highlight/statistic/feature cards, via the
  `bg-gradient-highlight` utility class. Never on navbar, footer, buttons, or
  full-page backgrounds.
- **Buttons**: use `<Button>` from `src/components/ui/button.jsx` with
  `variant="default" | "secondary" | "outline" | "ghost"`. Don't build
  one-off buttons with raw `<button>` + custom classes.

## Known follow-up

Some pre-existing feature/page components (`Navbar`, `Footer`,
`HighlightsSection`, etc.) still reference ad-hoc tokens from before this
design system existed (`text-text`, `text-text-h`, `text-accent` used as the
old brand-purple color). Those tokens no longer exist — `accent` is now
Warm Orange, and brand purple is `primary`. This file only establishes the
foundation; migrating existing page content to the new tokens is a separate,
follow-up task.
