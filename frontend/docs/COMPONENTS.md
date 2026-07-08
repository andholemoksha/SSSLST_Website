# UI Components — Usage Guide

Reusable components so we **don't rebuild the same card/row/page** in every feature.
Before writing new markup, check if one of these already does it.

- **Content/layout components:** `src/components/ui/`, `src/components/layout/`
- **Rule:** feature components should be thin wrappers over these — no duplicated markup.
- Also see `DESIGN_SYSTEM.md` (colors, spacing) and `THEME.md` (tokens).

---

## Reusable content components

### `TileCard` — the one card used everywhere
`components/ui/tile-card.jsx` · used by Projects, Testimonials, Samithi cards.

A clickable card with a media area (image **or** initials), title, optional
description, optional footer meta + a "View →" CTA. Hover lift + image zoom built in.

| Prop | Type | Notes |
|---|---|---|
| `to` | string | route the whole card links to (required) |
| `title` | string | heading (required) |
| `description` | string | optional supporting line |
| `image` | string | optional image src; if omitted, `initials` shows on a brand panel |
| `initials` | string | short text shown when there's no image (e.g. `"AP"`) |
| `meta` | string | small footer text on the left (e.g. `"12 Projects"`) |
| `cta` | string | footer label, default `"View"` |
| `className` | string | extra classes on the outer link (e.g. fixed width for scrollers) |

```jsx
// with an image (Projects)
<TileCard to={`/projects/${slug}`} title={title} description={description}
          image={image} meta={`${count} Projects`} />

// with initials, fixed width for a scroller (Testimonials / Samithi)
<TileCard to={`/testimonials/${year}/${slug}`} title={name}
          initials="AP" className="w-60 shrink-0 snap-start" />
```

### `CardScroller` — horizontal row of cards
`components/ui/card-scroller.jsx` · used by Testimonials `YearRow`, Samithi `SectionRow`.

Snap-scrolling row that **hides the scrollbar** but keeps scrolling. Give it
fixed-width cards as children.

```jsx
<CardScroller>
  {items.map((it) => (
    <TileCard key={it.slug} className="w-60 shrink-0 snap-start" ... />
  ))}
</CardScroller>
```

### `CardGrid` — responsive grid of cards
`components/ui/card-grid.jsx` · used by Projects `CategoryGrid`.

Responsive `1 / 2 / 4` column grid with equal-height rows.

```jsx
<CardGrid>
  {items.map((it) => <TileCard key={it.slug} ... />)}
</CardGrid>
```

### `PagePlaceholder` — shared layout for detail / "coming soon" pages
`components/layout/PagePlaceholder.jsx` · used by 7 pages (project category, state
testimonials, samithi activity, curriculum, dhyana vahini, sathvam, weekly sessions).

Header + optional back-link + a body message (or custom children).

| Prop | Notes |
|---|---|
| `title`, `description` | page header text |
| `backTo`, `backLabel` | optional back-link to a hub page |
| `message` | body text (default `"Content coming soon."`) |
| `children` | optional custom body (overrides `message`) |

```jsx
<PagePlaceholder
  title={stateName}
  description={`Participant reflections · ${year}`}
  backTo="/testimonials"
  backLabel="Back to Testimonials"
  message={`Testimonials for ${stateName} (${year}) are coming soon.`}
/>
```

---

## UI primitives (building blocks)

### `Card`
`components/ui/card.jsx` — `Card`, `CardHeader`, `CardTitle`, `CardDescription`,
`CardContent`, `CardFooter`. `TileCard` is built on these; use directly for custom cards.

```jsx
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Body</CardContent>
</Card>
```

### `Button`
`components/ui/button.jsx` — `variant`: `default` (primary purple) · `secondary` ·
`outline` · `ghost`. `size`: `default` · `sm` · `lg`.

```jsx
<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
```
For a link that looks like a button, use `buttonVariants` from
`components/ui/button-variants.js`: `className={cn(buttonVariants({ variant: "outline" }))}`.

### `Badge`
`components/ui/badge.jsx` — `variant`: `default` (filled) · `outline`.

```jsx
<Badge>2025</Badge>
<Badge variant="outline">Wing</Badge>
```

### `Accordion`
`components/ui/accordion.jsx` — `Accordion`, `AccordionItem`, `AccordionTrigger`,
`AccordionContent`. Good for the Contact/FAQ page.

```jsx
<Accordion>
  <AccordionItem value="q1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### `Loader`
`components/ui/loader.jsx` — spinner for loading states.

```jsx
{isLoading && <div className="flex justify-center py-12"><Loader /></div>}
```

### Layout helpers
`components/layout/` — `Container` (max-width wrapper), `Section` (vertical spacing +
Container), `PageHeader` (title + description band), `Navbar`, `Footer`.

---

## Recipe: a hub page (cards → detail)

```jsx
// 1. content: static data + copy in src/content/<feature>.js
// 2. hook: useX…() returns { data, isLoading, isError }
// 3. grid/row of TileCards:
<CardGrid>{items.map((i) => <TileCard key={i.slug} to={`/x/${i.slug}`} title={i.title} image={i.image} />)}</CardGrid>
// 4. detail route -> <PagePlaceholder title=... backTo="/x" />
```

That's Projects, Testimonials, and Samithi — same pieces, different data.
