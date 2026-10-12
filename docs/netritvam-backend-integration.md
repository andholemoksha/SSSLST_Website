# Netritvam Page Backend Integration

## Overview

The Netritvam page presents the SSSLST Netritvam magazine — **named issues
grouped by year**, each backed by a HeyZine flip-book link. It is reached from
the **Publications** side panel (the featured "Netritvam" card → **Read Latest
Issue**) and lives at the route `/netritvam`.

Each issue has a real **name** (e.g. "Guru Purnima Issue"), not a serial number,
and is identified by a **month + year**. The programme publishes four issues a
year: **January, April, July and November**. On the page, issues are grouped
under a per-year heading ("Netritvam 2025", "Netritvam 2026").

The feature follows the same pattern as the Newsletter page: a Django model + a
data migration for the initial issues + a read-only DRF endpoint + the Django
Admin as the CMS interface + a dedicated frontend feature folder. Like
Newsletter, Netritvam is now keyed on **month + year** and the issues are
**grouped by year** rather than shown as a flat serial list.

Everything an admin adds in the panel appears on the site automatically. The
page shows:

- The **latest issue** (newest year, then newest month) as a highlighted "Latest
  issue" card at the top.
- The **current (newest) year** expanded as a grid of its issues.
- **Past years** as collapsible "archive" cards that expand on click. Inside each
  year, issues read **January → November** (chronological order).
- The "latest" is computed automatically from the data — the admin never sets a
  flag.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Netritvam                                   │
│       │                                                              │
│       ├── Add Netritvam                                              │
│       │      • Title       (issue name, e.g. "Guru Purnima Issue")   │
│       │      • Month       (dropdown: January … December)            │
│       │      • Year        (e.g. 2026)                               │
│       │      • Flipbook URL (HeyZine link)                           │
│       │      • Cover image (optional: upload a file OR paste a URL)   │
│       │      • Is active   (show on site)                            │
│       │                                                              │
│       └── Save → appears on /netritvam automatically                 │
│               (no code change, no rebuild)                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  Publications side panel → "Netritvam" → Read Latest Issue           │
│       │                                                              │
│       v                                                              │
│  /netritvam                                                          │
│       │  GET /api/netritvam/  → { latest, groups[] }                 │
│       │                                                              │
│       ├── "Latest issue" card  (newest year+month, highlighted)      │
│       │                                                              │
│       ├── Netritvam <current year>  (expanded grid)                  │
│       │     [ Jan ] [ Apr ] [ Jul ] [ Nov ]                          │
│       │                                                              │
│       └── Past editions  (collapsible archive cards)                 │
│             ▸ Netritvam 2025   → expands to Jan → Nov grid           │
│                                                                      │
│  Each card opens its HeyZine flip-book in a new browser tab.         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoint

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/netritvam/` | GET | Public (AllowAny) | Latest issue + all active issues grouped by year |

There is only **one** endpoint, and it is read-only (no POST/PUT/DELETE). All
writes happen through the Django Admin. It uses the same flat `/api/` convention
as the other features — there is no API versioning.

### GET /api/netritvam/

```json
{
  "latest": {
    "id": 7,
    "title": "Guru Purnima Issue",
    "month": 7,
    "year": 2026,
    "flipbook_url": "https://heyzine.com/flip-book/50ec5ecc53.html",
    "cover_image": "/assets/netritvam/netritvam-7-cover.jpg"
  },
  "groups": [
    {
      "year": 2025,
      "is_current": false,
      "issues": [
        { "id": 1, "title": "Inaugural / New Year Issue", "month": 1, "year": 2025, "flipbook_url": "https://heyzine.com/flip-book/3b5fb68b15.html", "cover_image": "/assets/netritvam/netritvam-1-cover.jpg" },
        { "id": 2, "title": "Aradhana Mahotsav Issue", "month": 4, "year": 2025, "flipbook_url": "https://heyzine.com/flip-book/160622ba0d.html", "cover_image": "/assets/netritvam/netritvam-2-cover.jpg" },
        { "id": 3, "title": "Guru Purnima Issue", "month": 7, "year": 2025, "flipbook_url": "https://heyzine.com/flip-book/f83b22df95.html", "cover_image": "/assets/netritvam/netritvam-3-cover.jpg" },
        { "id": 4, "title": "Swami Birthday / Centenary Issue", "month": 11, "year": 2025, "flipbook_url": "https://heyzine.com/flip-book/5734564ab1.html", "cover_image": "/assets/netritvam/netritvam-4-cover.jpg" }
      ]
    },
    {
      "year": 2026,
      "is_current": true,
      "issues": [
        { "id": 5, "title": "New Year Issue", "month": 1, "year": 2026, "flipbook_url": "https://heyzine.com/flip-book/17a32569d5.html", "cover_image": "/assets/netritvam/netritvam-5-cover.jpg" },
        { "id": 6, "title": "Aradhana Mahotsav Issue", "month": 4, "year": 2026, "flipbook_url": "https://heyzine.com/flip-book/9ea1e84bf3.html", "cover_image": "/assets/netritvam/netritvam-6-cover.jpg" },
        { "id": 7, "title": "Guru Purnima Issue", "month": 7, "year": 2026, "flipbook_url": "https://heyzine.com/flip-book/50ec5ecc53.html", "cover_image": "/assets/netritvam/netritvam-7-cover.jpg" }
      ]
    }
  ]
}
```

Response fields:

- **`latest`** — the single most recent issue (highest year, then highest month).
  Rendered as the highlighted "Latest issue" card. `null` if there are no issues.
  Computed automatically; there is no admin flag.
- **`groups`** — every active issue grouped by year. Groups are ordered **oldest
  year first** (ascending) for the archive layout; `is_current` marks the newest
  year (rendered expanded on the frontend) versus older years (rendered as
  collapsible archive cards). **Within each year, issues are ordered January →
  November** (month ascending).
- **`title`** — the issue name stored on the record.
- **`month`** / **`year`** — the issue's month (1–12) and year.
- **`cover_image`** — the effective cover: the uploaded file's absolute URL if a
  file was uploaded, otherwise the pasted/seeded cover image URL (bundled
  frontend asset path), otherwise `""`.

---

## Database Model

### Netritvam

| Field | Type | Description |
|---|---|---|
| title | CharField (required) | Issue name shown on the card, e.g. "Guru Purnima Issue" |
| month | PositiveSmallInteger (choices Jan–Dec) | Month this issue was published |
| year | PositiveInteger (indexed) | Year this issue belongs to, e.g. 2025 |
| flipbook_url | URLField (unique) | HeyZine flip-book link opened on click |
| cover_image_url | URLField (blank) | Optional cover image URL |
| cover_image | ImageField (blank) | Optional cover image upload; takes precedence over the URL |
| is_active | Boolean | Whether to show on the website / return from the API |
| created_at / updated_at | DateTime | Record timestamps |

Constraints and behaviour:

- **Unique `(year, month)`** — one issue per month per year — and unique
  `flipbook_url`. Prevents duplicates.
- **Ordering `['-year', '-month', 'id']`** — newest year first, then latest month
  (the service/view re-group and re-order per year for the page).
- **`display_title`** — returns the stored `title` (falls back to
  `"Netritvam <Month> <Year>"` only if a title were ever left blank).
- **`cover_image_source`** — returns the uploaded file's URL if present, else the
  URL field, else `""` (an uploaded file always wins over the URL).

> **Changed from the earlier version:** the model previously used a unique
> `serial_number` and the page showed a flat "Netritvam-1 … N" list. That field
> was removed in favour of `month` + `year`, with a `title` for the issue name
> and year-grouping on the page.

---

## Initial Data — Data Migrations (not a seed command)

Initial issues are seeded and shaped through data migrations using `RunPython`.
Running `python manage.py migrate` populates the seven Netritvam issues with
their names, months and years.

```
0017_netritvam                      → creates the Netritvam table (original: serial_number)
0018_seed_netritvam_data            → seeds the 7 initial issues (by flipbook_url)
0025_seed_netritvam_cover_images    → sets each issue's bundled cover image path
0031_netritvam_month_year           → schema rework: add month + year, drop serial_number
0032_seed_netritvam_issue_details   → set each issue's title + month + year (by flipbook_url)
0033_netritvam_unique_year_month    → add the unique (year, month) constraint
```

The seeders are **idempotent and non-destructive**: they match existing rows by
the stable `flipbook_url`, so re-running on a redeploy never duplicates rows and
never overwrites issues an admin has added. There is **no** management command —
this matches the reviewed Sathvam/Dhyana/Newsletter pattern (initial data lives
in migrations, ongoing content is managed through the admin portal).

### The seven seeded issues

| Title | Month | Year |
|---|---|---|
| Inaugural / New Year Issue | January | 2025 |
| Aradhana Mahotsav Issue | April | 2025 |
| Guru Purnima Issue | July | 2025 |
| Swami Birthday / Centenary Issue | November | 2025 |
| New Year Issue | January | 2026 |
| Aradhana Mahotsav Issue | April | 2026 |
| Guru Purnima Issue | July | 2026 |

### Who sees what

| Situation | Who sees it | Mechanism |
|---|---|---|
| Admin adds an issue on the **live** site | All visitors, immediately | Shared production database |
| A **new developer** clones + runs `migrate` | That developer's local DB | Seed migrations (the 7 issues) |
| A **fresh production** deploy (empty DB) | Everyone, after first `migrate` | Seed migrations |
| Something added via a **local** admin panel | Only that developer | Local DB (`db.sqlite3` is gitignored) |

> Seed migrations are the initial baseline only. After deployment, the admin
> panel is the ongoing source of truth and is shared across all users through
> the production database. Issues added by an admin are **not** written back into
> migration files.

---

## Admin Guide

The admin page is at `/admin/` → **Website → Netritvam**.

### Change list

Columns: **Title · Month · Year · Is active · Updated at**. `Is active` is
editable inline. Filter: by year and by active. Search: by title or flip-book
URL. Ordering: newest year first, then latest month.

### Add a new issue (e.g. the July 2027 issue)

1. Open `http://yoursite.com/admin/` → **Netritvam** → **Add Netritvam**.
2. Enter the **Title** (the issue name, e.g. "Guru Purnima Issue").
3. Choose the **Month** (dropdown) and enter the **Year** (both required — only
   one issue allowed per month/year).
4. Paste the **Flipbook URL** (the HeyZine link).
5. (Optional) Add a cover under **Cover image**: upload a file **or** paste a
   cover image URL. If both are set, the uploaded file wins.
6. Leave **Is active** enabled.
7. Click **Save**.

Result: the issue appears on `/netritvam` on the next page load, slotted into its
year's grid in chronological (month) order. If it is the newest issue overall it
becomes the "Latest issue" card. When the first issue of a brand-new year is
added, that year becomes the expanded current year and the previous year
collapses into a **Past editions** archive card.

---

## Frontend Structure

```
frontend/src/
├── features/netritvam/
│   ├── services/
│   │   └── netritvam.service.js         # fetchNetritvam() → GET /netritvam/
│   ├── hooks/
│   │   └── useNetritvam.js              # { data, isLoading, error }
│   └── components/
│       ├── NetritvamCard.jsx            # issue card (default) + "Latest issue" (featured)
│       └── NetritvamYearArchive.jsx     # per-year "Netritvam <year>" folder (uses shared Accordion)
└── pages/
    └── NetritvamPage.jsx                # hero + latest card + current year + past-year archives
```

Wiring:

- `App.jsx` — route `/netritvam` → `NetritvamPage`.
- `components/layout/PublicationsPanel.jsx` — the featured "Read Latest Issue"
  button navigates to `/netritvam` (and closes the panel).

### Rendering logic

- `NetritvamPage` reads `{ latest, groups }`. It renders the `latest` issue as
  the highlighted card, then the **current year** (the `is_current` group) as a
  grid with its latest removed, then the remaining years as **full-width
  collapsible `NetritvamYearArchive` cards** under a "Past editions" heading.
- `NetritvamYearArchive` shows a "Netritvam \<year\>" folder with the issue count;
  clicking it expands that year's issues in the same 3-column grid and card size
  as the current year, so an expanded past year reads just as clearly. It is
  built on the **shared `Accordion` component** (`components/ui/accordion.jsx` —
  the same expand/collapse primitive the FAQ page uses), not a bespoke toggle,
  so there is one expand/collapse implementation across the site. Each year is
  its own Accordion instance, so years expand/collapse independently.
- `NetritvamCard` renders a portrait (3:4) cover with the issue title below; its
  `featured` variant renders the wider highlighted "Latest issue" band. Titles
  display in full (no mid-word truncation).
- Cards open the HeyZine flip-book in a new tab
  (`target="_blank" rel="noopener noreferrer"`). No colours are hardcoded — the
  components use design tokens (`border-border`, `bg-white`, `bg-muted`,
  `bg-primary/90`, `text-heading`, `text-muted-foreground`), and the hero band
  uses the `bg-gradient-highlight` token.

---

## Backend Structure

```
backend/website/
├── models/netritvam.py                          # Netritvam model (title, month, year, ...)
├── admin/netritvam.py                            # Admin (title + month + year + url + cover + is_active)
├── api/
│   ├── urls.py                                  # /netritvam/ route
│   ├── views/netritvam.py                        # get_netritvam (latest + year groups)
│   └── serializers/netritvam.py                  # NetritvamSerializer (title, month, year, cover_image)
├── services/netritvam_service.py                 # get_active_issues, get_latest_issue
└── migrations/
    ├── 0017_netritvam.py                         # create table (original serial_number)
    ├── 0018_seed_netritvam_data.py               # seed 7 initial issues (idempotent)
    ├── 0025_seed_netritvam_cover_images.py       # set bundled cover image paths
    ├── 0031_netritvam_month_year.py              # add month + year, drop serial_number
    ├── 0032_seed_netritvam_issue_details.py      # set title + month + year per issue
    └── 0033_netritvam_unique_year_month.py       # unique (year, month) constraint
```

The view groups issues by year with `itertools.groupby` (the queryset is ordered
`-year, -month` by the model Meta), flags the newest year `is_current`, and sorts
each year's issues by month ascending before serializing.

Media/config notes:

- Cover-image uploads require media serving. `config/settings/base.py` sets
  `MEDIA_URL = 'media/'` and `MEDIA_ROOT = BASE_DIR / 'media'`; `config/urls.py`
  serves media in `DEBUG`. In production, point `media/` at persistent storage
  so uploaded covers survive restarts. The **seeded** covers use bundled frontend
  assets (`/assets/netritvam/...`), which need no media storage.

---

## Pull and Run (for developers)

From the repository root:

```powershell
# 1. Get the branch
git fetch origin
git checkout feature/netritvam-ui-name-changes

# 2. Backend
cd backend
py -m venv venv                       # first time only
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt       # includes Pillow (for cover uploads)
python manage.py migrate              # creates the table + seeds/shapes the 7 issues
python manage.py createsuperuser      # if you don't have an admin login yet
python manage.py runserver            # http://127.0.0.1:8000/

# 3. Frontend (in a second terminal, from the repo root)
cd frontend
npm install
npm run dev                           # http://localhost:5173/
```

Then open `http://localhost:5173/netritvam`. All seven issues appear
automatically (grouped under Netritvam 2025 and 2026) because they come from the
seed migrations. Log in at `http://127.0.0.1:8000/admin/` → **Netritvam** to add
more.

---

## Summary

| Question | Answer |
|---|---|
| Does the admin need to write code? | No |
| How does the admin add an issue? | Admin → Netritvam → Add → title + month + year + flip-book URL → Save |
| Cover image? | Optional — upload a file or paste a URL (upload wins) |
| Does it appear in the UI automatically? | Yes — on the next page load, no rebuild |
| How are issues identified? | By **month + year** (one issue per month/year); the `title` is the issue name |
| How many issues per year? | Four — January, April, July, November |
| Ordering | Newest issue as the "Latest" card; years grouped (newest expanded, older archived); within a year issues run Jan → Nov |
| API endpoint | `GET /api/netritvam/` (public, read-only, no versioning) |
| Response shape | `{ latest, groups: [{ year, is_current, issues[] }] }` |
| Initial data | Seeded + shaped via data migrations (7 issues across 2025/2026) |
| Will other developers see the data on pull? | Yes — the 7 seeded issues load on `migrate` |
| Are admin-added issues shared via git? | No — they live in the database; on production all visitors see them via the shared DB |
| Colours hardcoded? | No — design tokens only |
