# Netritvam Page Backend Integration

## Overview

The Netritvam page presents the SSSLST Netritvam magazine — a numbered series of
issues (Netritvam-1, Netritvam-2, …), each backed by a HeyZine flip-book link.
It is reached from the **Publications** side panel (the featured "Netritvam" card
→ **Read Latest Issue**) and lives at the route `/netritvam`.

The feature follows the same pattern as the Newsletter page: a Django model + a
data migration for the initial issues + a read-only DRF endpoint + the Django
Admin as the CMS interface + a dedicated frontend feature folder. The only
difference from Newsletter is the organising key: Netritvam issues are ordered by
a **serial number** rather than by month/year, and shown as a flat list rather
than year-grouped.

Everything an admin adds in the panel appears on the site automatically. The
page shows:

- The **latest issue** (highest serial number) as a highlighted "Latest issue"
  card at the top.
- All issues below, in a flat grid ordered **Netritvam-1 → Netritvam-N**.
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
│       │      • Serial number (e.g. 8 for Netritvam-8)                │
│       │      • Flipbook URL (HeyZine link — only required field)      │
│       │      • Cover image (optional: upload a file OR paste a URL)   │
│       │      • Is active (show on site)                              │
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
│       │  GET /api/netritvam/  → { latest, issues[] }                 │
│       │                                                              │
│       ├── "Latest issue" card  (highest serial, highlighted)         │
│       │                                                              │
│       └── All issues (flat grid, Netritvam-1 → N)                    │
│              [ Netritvam-1 ] [ Netritvam-2 ] [ Netritvam-3 ] ...      │
│                                                                      │
│  Each card opens its HeyZine flip-book in a new browser tab.         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoint

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/netritvam/` | GET | Public (AllowAny) | Latest issue + all active issues (ordered by serial number) |

There is only **one** endpoint, and it is read-only (no POST/PUT/DELETE). All
writes happen through the Django Admin. It uses the same flat `/api/` convention
as the other features — there is no API versioning.

### GET /api/netritvam/

```json
{
  "latest": {
    "id": 7,
    "title": "Netritvam-7",
    "serial_number": 7,
    "flipbook_url": "https://heyzine.com/flip-book/50ec5ecc53.html",
    "cover_image": ""
  },
  "issues": [
    { "id": 1, "title": "Netritvam-1", "serial_number": 1, "flipbook_url": "https://heyzine.com/flip-book/3b5fb68b15.html", "cover_image": "" },
    { "id": 2, "title": "Netritvam-2", "serial_number": 2, "flipbook_url": "https://heyzine.com/flip-book/160622ba0d.html", "cover_image": "" }
  ]
}
```

Response fields:

- **`latest`** — the single most recent issue (highest serial number). Rendered
  as the highlighted "Latest issue" card. `null` if there are no issues.
  Computed automatically; there is no admin flag.
- **`issues`** — every active issue ordered **by serial number ascending**
  (Netritvam-1, Netritvam-2, …), used for the grid below the featured card. The
  frontend removes the latest issue from the grid so it only appears once.
- **`title`** — the stored title, or an auto-generated `"Netritvam-<serial>"`
  when the title field is left blank.
- **`cover_image`** — the effective cover: the uploaded file's absolute URL if a
  file was uploaded, otherwise the pasted cover image URL, otherwise `""`.

---

## Database Model

### Netritvam

| Field | Type | Description |
|---|---|---|
| serial_number | PositiveInteger (unique, indexed) | Issue number, e.g. 1 for Netritvam-1. Higher = newer |
| title | CharField (blank) | Optional custom title; defaults to `"Netritvam-<serial>"` |
| flipbook_url | URLField (unique) | HeyZine flip-book link opened on click |
| cover_image_url | URLField (blank) | Optional cover image URL |
| cover_image | ImageField (blank) | Optional cover image upload; takes precedence over the URL |
| is_active | Boolean | Whether to show on the website / return from the API |
| created_at / updated_at | DateTime | Record timestamps |

Constraints and behaviour:

- **Unique `serial_number`** and **unique `flipbook_url`** — prevents duplicates.
- **Ordering `['-serial_number', 'id']`** — highest issue number first.
- **`display_title`** — returns the custom title or `"Netritvam-<serial>"`.
- **`cover_image_source`** — returns the uploaded file's URL if present, else the
  URL field, else `""` (an uploaded file always wins over the URL).

---

## Initial Data — Data Migration (not a seed command)

Initial issues are seeded through the data migration
`website/migrations/0018_seed_netritvam_data.py` using `RunPython`. Running
`python manage.py migrate` populates the seven Netritvam issues (1–7).

```
0017_netritvam             → creates the Netritvam table
0018_seed_netritvam_data   → seeds the 7 initial issues (Netritvam-1 … 7)
```

The seeder is **idempotent and non-destructive**: it uses `update_or_create`, so
re-running it on a redeploy never duplicates rows and never overwrites issues an
admin has added. There is **no** management command — this matches the reviewed
Sathvam/Dhyana/Newsletter pattern (initial data lives in migrations, ongoing
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
> the production database. Issues added by an admin are **not** written back into
> migration files.

---

## Admin Guide

The admin page is at `/admin/` → **Website → Netritvam**.

### Change list

Columns: **Title · Serial number · Is active · Updated at**. `Is active` is
editable inline. Filter: by active. Search: by title or flip-book URL. Ordering:
highest serial number first.

### Add a new issue (e.g. Netritvam-8)

1. Open `http://yoursite.com/admin/` → **Netritvam** → **Add Netritvam**.
2. Enter the **Serial number** (`8`).
3. Paste the **Flipbook URL** (the HeyZine link — the only required field).
4. (Optional) Add a cover under **Cover image**: upload a file **or** paste a
   cover image URL. If both are set, the uploaded file wins.
5. Leave **Is active** enabled.
6. Click **Save**.

Result: the issue appears on `/netritvam` on the next page load. Because it has
the highest serial number, it becomes the new "Latest issue" card, and the
previous latest drops into the grid.

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
│       └── NetritvamCard.jsx            # issue card (default) + "Latest issue" (featured)
└── pages/
    └── NetritvamPage.jsx                # hero + latest card + flat "All issues" grid
```

Wiring:

- `App.jsx` — route `/netritvam` → `NetritvamPage`.
- `components/layout/PublicationsPanel.jsx` — the featured "Read Latest Issue"
  button navigates to `/netritvam` (and closes the panel).

### Rendering logic

- `NetritvamPage` reads `{ latest, issues }`. It renders the `latest` issue as
  the highlighted card, then the remaining `issues` (latest removed) as a flat
  grid ordered Netritvam-1 → N.
- `NetritvamCard` matches the Sathvam / Dhyana Vahini video card sizing exactly
  (`rounded-xl border border-border bg-white shadow-sm`, `aspect-video` media,
  `px-4 py-3` body, title `variant="body" size="sm" font-medium text-heading`).
  Its `featured` variant renders the wider highlighted "Latest issue" band.
- Cards open the HeyZine flip-book in a new tab
  (`target="_blank" rel="noopener noreferrer"`). No colours are hardcoded — the
  components use design tokens (`border-border`, `bg-white`, `bg-muted`,
  `bg-primary/90`, `text-heading`, `text-muted-foreground`), and the hero band
  uses the `bg-gradient-highlight` token.

---

## Backend Structure

```
backend/website/
├── models/netritvam.py                          # Netritvam model
├── admin/netritvam.py                            # Admin (serial + url + cover upload/url + is_active)
├── api/
│   ├── urls.py                                  # /netritvam/ route
│   ├── views/netritvam.py                        # get_netritvam (latest + issues)
│   └── serializers/netritvam.py                  # NetritvamSerializer
├── services/netritvam_service.py                 # get_active_issues, get_latest_issue
└── migrations/
    ├── 0017_netritvam.py                         # create table
    └── 0018_seed_netritvam_data.py               # seed 7 initial issues (idempotent)
```

Media/config notes:

- Cover-image uploads require media serving. `config/settings/base.py` sets
  `MEDIA_URL = 'media/'` and `MEDIA_ROOT = BASE_DIR / 'media'`; `config/urls.py`
  serves media in `DEBUG`. In production, point `media/` at persistent storage
  so uploaded covers survive restarts. The URL-based cover option avoids the need
  for file storage entirely.

---

## Pull and Run (for developers)

From the repository root:

```powershell
# 1. Get the branch
git fetch origin
git checkout feature/netritvam

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

Then open `http://localhost:5173/netritvam`. All seven issues appear
automatically because they come from the seed migration. Log in at
`http://127.0.0.1:8000/admin/` → **Netritvam** to add more.

---

## Summary

| Question | Answer |
|---|---|
| Does the admin need to write code? | No |
| How does the admin add an issue? | Admin → Netritvam → Add → serial number + flip-book URL → Save |
| Cover image? | Optional — upload a file or paste a URL (upload wins) |
| Does it appear in the UI automatically? | Yes — on the next page load, no rebuild |
| New issue added? | Slots into serial order; highest serial becomes the "Latest issue" card |
| Ordering | Highest serial as the latest card; grid runs Netritvam-1 → N |
| API endpoint | `GET /api/netritvam/` (public, read-only, no versioning) |
| Initial data | Seeded via data migration `0018_seed_netritvam_data.py` (Netritvam-1 … 7) |
| Will other developers see the data on pull? | Yes — the 7 seeded issues load on `migrate` |
| Are admin-added issues shared via git? | No — they live in the database; on production all visitors see them via the shared DB |
| Colours hardcoded? | No — design tokens only |
