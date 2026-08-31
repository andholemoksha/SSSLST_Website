# Netritvam Page Backend Integration

## Overview

The Netritvam page presents the SSSLST Netritvam publication — a set of numbered
issues, each backed by an external HeyZine flip-book link. It lives at the route
`/publications` (heading "Netritvam") and is served by a read-only API from the
Django admin as the content management system (CMS).

The feature is organised exactly like the Newsletter feature, with one
difference: issues are ordered by a **serial number** within a year (1, 2, 3 ...)
instead of by month. Everything else — the automatic "latest" highlight, the
year grouping, and the collapsing archive — matches the Newsletter behaviour.

Everything an admin adds in the panel appears on the site automatically. The
page organises issues so it stays clean as the years accumulate:

- The **newest year** is shown expanded (a highlighted "Latest Release" card plus
  an issue grid).
- Every **past/completed year** collapses into a single archive card under
  **Past editions**, shown in ascending order (2026, 2027, …). Clicking a year
  card expands its issues inline.
- All of this is automatic — the backend decides which year is "current" from
  the data. The admin never sets a flag.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Netritvam                                   │
│       │                                                              │
│       ├── Add Netritvam                                              │
│       │      • Serial number + Year                                  │
│       │      • Publication URL (HeyZine link — only required field)   │
│       │      • Cover image (optional: upload a file OR paste a URL)   │
│       │      • Is active (show on site)                              │
│       │                                                              │
│       └── Save → appears on /publications automatically              │
│               (no code change, no rebuild)                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  /publications                                                       │
│       │  GET /api/v1/publications/  → { latest, groups[] }           │
│       │                                                              │
│       ├── "Latest Release" card  (newest issue, highlighted)         │
│       │                                                              │
│       ├── Current year (newest), expanded issue grid (1 → N)         │
│       │      [ #1 ] [ #2 ] [ #3 ] ...                                │
│       │                                                              │
│       └── Past editions (older years, ascending, collapsed)          │
│              [ 📁 2026 ▸ ]  [ 📁 2027 ▸ ]                             │
│                    │ click                                           │
│                    v expands that year's issue grid inline           │
│                                                                      │
│  Each issue card opens its HeyZine flip-book in a new browser tab.   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoint

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/v1/publications/` | GET | Public (AllowAny) | Latest issue + all active issues grouped by year |

There is only **one** endpoint, and it is read-only (no POST/PUT/DELETE). All
writes happen through the Django Admin.

### GET /api/v1/publications/

```json
{
  "latest": {
    "id": 7,
    "title": "Netritvam-7",
    "serial_number": 7,
    "year": 2026,
    "publication_url": "https://heyzine.com/flip-book/50ec5ecc53.html",
    "cover_image": ""
  },
  "groups": [
    {
      "year": 2026,
      "is_current": true,
      "issues": [
        { "id": 1, "title": "Netritvam-1", "serial_number": 1, "year": 2026, "publication_url": "https://heyzine.com/flip-book/3b5fb68b15.html", "cover_image": "" },
        { "id": 2, "title": "Netritvam-2", "serial_number": 2, "year": 2026, "publication_url": "https://heyzine.com/flip-book/160622ba0d.html", "cover_image": "" }
      ]
    }
  ]
}
```

Response fields:

- **`latest`** — the single most recent issue (highest year, then highest serial
  number). Rendered as the highlighted "Latest Release" card. `null` if there are
  no issues. Computed automatically; there is no admin flag.
- **`groups`** — every active issue grouped by year, ordered **oldest year first
  (ascending)** so the frontend can lay out the archive cards in order. Within
  each year, issues run **1 → N**.
- **`is_current`** — `true` for the newest year only (rendered expanded), `false`
  for older years (rendered as collapsible archive cards).
- **`title`** — the stored title, or an auto-generated `"Netritvam-<serial_number>"`
  when the title field is left blank.
- **`cover_image`** — the effective cover: the uploaded file's absolute URL if a
  file was uploaded, otherwise the pasted cover image URL, otherwise `""`.

---

## Database Model

### Netritvam

| Field | Type | Description |
|---|---|---|
| serial_number | PositiveSmallInteger | Serial number within its year (1, 2, 3 ...) |
| year | PositiveInteger (indexed) | Year the issue belongs to |
| title | CharField (blank) | Optional custom title; defaults to `"Netritvam-<serial_number>"` |
| publication_url | URLField (unique) | HeyZine flip-book link opened on click |
| cover_image_url | URLField (blank) | Optional cover image URL |
| cover_image | ImageField (blank) | Optional cover image upload; takes precedence over the URL |
| is_active | Boolean | Whether to show on the website / return from the API |
| created_at / updated_at | DateTime | Record timestamps |

Constraints and behaviour:

- **Unique `(year, serial_number)`** — prevents two issues with the same serial
  number in a year.
- **Ordering `['-year', 'serial_number', 'id']`** — newest year first, issues
  run 1 → N within a year.
- **`display_title`** — returns the custom title or `"Netritvam-<serial_number>"`.
- **`cover_image_source`** — returns the uploaded file's URL if present, else the
  URL field, else `""` (an uploaded file always wins over the URL).

---

## Initial Data — Data Migration (not a seed command)

Initial issues are seeded through the data migration
`website/migrations/0015_seed_netritvam_data.py` using `RunPython`. Running
`python manage.py migrate` populates the seven 2026 Netritvam issues.

```
0014_netritvam            → creates the Netritvam table
0015_seed_netritvam_data  → seeds the 7 initial issues (Netritvam-1 .. 7, 2026)
```

The seeder is **idempotent and non-destructive**: it uses `update_or_create`,
so re-running it on a redeploy never duplicates rows and never overwrites issues
an admin has added. There is **no** management command — this matches the
reviewed Sathvam/Dhyana pattern (initial data lives in migrations, ongoing
content is managed through the admin portal).

### Who sees what

| Situation | Who sees it | Mechanism |
|---|---|---|
| Admin adds an issue on the **live** site | All visitors, immediately | Shared production database |
| A **new developer** clones + runs `migrate` | That developer's local DB | Seed migration (the 7 issues) |
| A **fresh production** deploy (empty DB) | Everyone, after first `migrate` | Seed migration |
| Something added via a **local** admin panel | Only that developer | Local DB (`db.sqlite3` is gitignored) |

> Seed migrations are the initial baseline only. After deployment, the admin
> panel is the ongoing source of truth and is shared across all users through
> the production database. Issues added by an admin are **not** written back
> into migration files.

---

## Admin Guide

The admin page is at `/admin/` → **Website → Netritvam**.

### Change list

Columns: **Title · Serial number · Year · Is active · Updated at**. `Is active`
is editable inline. Filters: by year and by active. Search: by title or
publication URL. Ordering: newest year first, then serial number 1 → N.

### Add a new issue (e.g. Netritvam-8, 2026)

1. Open `http://yoursite.com/admin/` → **Netritvam** → **Add Netritvam**.
2. Enter the **Serial number** (`8`) and the **Year** (`2026`).
3. Paste the **Publication URL** (the HeyZine link — the only required field).
4. (Optional) Add a cover under **Cover image**: upload a file **or** paste a
   cover image URL. If both are set, the uploaded file wins.
5. Leave **Is active** enabled.
6. Click **Save**.

Result: the issue appears on `/publications` on the next page load, in serial
order. No code change, no rebuild.

### How the layout evolves automatically

- Adding a **higher serial number** in the current year → it becomes the
  "Latest Release" card; the previous latest drops into the year's grid in serial
  order.
- Adding the **first issue of a new year** (e.g. Netritvam-1 for 2027) → the new
  year becomes the expanded current year, and the previous year automatically
  collapses into a **Past editions** archive card. Admin does nothing extra.

---

## Frontend Structure

```
frontend/src/
├── features/netritvam/
│   └── components/
│       ├── NetritvamCard.jsx           # issue card (default) + "Latest Release" (featured)
│       └── NetritvamYearArchive.jsx    # collapsible past-year card (expands inline)
└── pages/
    └── PublicationsPage.jsx            # hero + latest card + current year + archive
```

Wiring:

- The `/publications` route renders `PublicationsPage`.
- The page calls `apiClient.get("/v1/publications/")`.

### Rendering logic

- `PublicationsPage` reads `{ latest, groups }`. It renders the `latest` issue as
  the highlighted card, the `is_current` group as an expanded issue grid (with
  the latest issue removed so it is not shown twice), and every other group as an
  ascending list of `NetritvamYearArchive` cards.
- `NetritvamCard` matches the Sathvam / Dhyana Vahini video card sizing exactly
  (`rounded-xl border border-border bg-white shadow-sm`, `aspect-video` media,
  `px-4 py-3` body, title `variant="body" size="sm" font-medium text-heading`).
  Its `featured` variant renders the wider highlighted "Latest Release" band.
- `NetritvamYearArchive` is a self-contained collapsible card; each past year
  toggles independently and reuses `NetritvamCard` for the issues inside.
- Cards open the HeyZine flip-book in a new tab
  (`target="_blank" rel="noopener noreferrer"`). No colours are hardcoded — the
  components use design tokens (`border-border`, `bg-white`, `bg-muted`,
  `bg-primary/90`, `text-heading`, `text-muted-foreground`).

---

## Backend Structure

```
backend/website/
├── models/netritvam.py                          # Netritvam model
├── admin/netritvam.py                            # Admin (serial/year/url + cover upload/url + is_active)
├── api/
│   ├── v1_urls.py                               # /api/v1/publications/ route
│   ├── views/netritvam.py                        # get_publications (latest + grouped, is_current)
│   └── serializers/netritvam.py                  # NetritvamSerializer
├── services/netritvam_service.py                 # get_active_publications, get_latest_publication
└── migrations/
    ├── 0014_netritvam.py                         # create table
    └── 0015_seed_netritvam_data.py               # seed 7 initial issues (idempotent)
```

Media/config notes:

- Cover-image uploads require media serving. `config/settings/base.py` sets
  `MEDIA_URL = 'media/'` and `MEDIA_ROOT = BASE_DIR / 'media'`; `config/urls.py`
  serves media in `DEBUG`. In production, point `media/` at persistent storage
  (or object storage such as S3) so uploaded covers survive restarts. The
  URL-based cover option avoids the need for file storage entirely.
- The model class is `Netritvam` (DB table `website_netritvam`). The endpoint URL
  (`/api/v1/publications/`) and the page route (`/publications`) are retained for
  backwards compatibility.

---

## Pull and Run (for developers)

From the repository root:

```powershell
# 1. Get the branch
git pull
git checkout feature/netritvam-publications

# 2. Backend
cd backend
py -m venv venv                       # first time only
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt       # includes Pillow (for cover uploads)
python manage.py migrate              # creates the table + seeds the 7 issues
python manage.py createsuperuser      # if you don't have an admin login yet
python manage.py runserver            # http://127.0.0.1:8000/

# 3. Frontend (in a second terminal, from the repo root)
cd frontend
npm install
npm run dev                           # http://localhost:5173/
```

Then open `http://localhost:5173/publications`. All seven 2026 issues appear
automatically because they come from the seed migration. Log in at
`http://127.0.0.1:8000/admin/` → **Netritvam** to add more.

---

## Summary

| Question | Answer |
|---|---|
| Does the admin need to write code? | No |
| How does the admin add an issue? | Admin → Netritvam → Add → serial number + year + publication URL → Save |
| Cover image? | Optional — upload a file or paste a URL (upload wins) |
| Does it appear in the UI automatically? | Yes — on the next page load, no rebuild |
| New issue added? | Slots into serial order; newest becomes the "Latest Release" card |
| New year (e.g. 2027)? | Becomes the expanded current year; the previous year auto-collapses into an archive card |
| Ordering | Newest year on top; serial number 1 → N within a year |
| API endpoint | `GET /api/v1/publications/` (public, read-only) |
| Initial data | Seeded via data migration `0015_seed_netritvam_data.py` (7 issues, 2026) |
| Will other developers see the data on pull? | Yes — the 7 seeded issues load on `migrate` (once the branch is committed/pushed) |
| Are admin-added issues shared via git? | No — they live in the database; on production all visitors see them via the shared DB |
| Colours hardcoded? | No — design tokens only |
