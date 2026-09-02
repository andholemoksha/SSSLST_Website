# Newsletter Page Backend Integration

## Overview

The Newsletter page presents the SSSLST monthly newsletter — one edition per
month, each backed by a HeyZine flip-book link. It is reached from the
**Publications** side panel ("Monthly / Newsletter" → **View This Month**) and
lives at the route `/newsletter`.

The feature follows the same pattern as the other content pages: a Django model
+ a data migration for the initial editions + a read-only DRF endpoint + the
Django Admin as the CMS interface + a dedicated frontend feature folder.

Everything an admin adds in the panel appears on the site automatically. The
page organises editions so it stays clean as the years accumulate:

- The **newest year** is shown expanded (a highlighted "Latest issue" card plus
  a month grid).
- Every **past/completed year** collapses into a single archive card under
  **Past editions**, shown in ascending order (2026, 2027, …). Clicking a year
  card expands its months inline.
- All of this is automatic — the backend decides which year is "current" from
  the data. The admin never sets a flag.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Newsletters                                 │
│       │                                                              │
│       ├── Add newsletter                                             │
│       │      • Month (dropdown) + Year                               │
│       │      • Flipbook URL (HeyZine link — only required field)      │
│       │      • Cover image (optional: upload a file OR paste a URL)   │
│       │      • Is active (show on site)                              │
│       │                                                              │
│       └── Save → appears on /newsletter automatically                │
│               (no code change, no rebuild)                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  Publications side panel → "Monthly / Newsletter" → View This Month  │
│       │                                                              │
│       v                                                              │
│  /newsletter                                                         │
│       │  GET /api/newsletters/  → { latest, groups[] }               │
│       │                                                              │
│       ├── "Latest issue" card  (newest edition, highlighted)         │
│       │                                                              │
│       ├── Current year (newest), expanded month grid (Jan → Dec)     │
│       │      [ Feb ] [ Mar ] [ Apr ] ...                             │
│       │                                                              │
│       └── Past editions (older years, ascending, collapsed)          │
│              [ 📁 2026 ▸ ]  [ 📁 2027 ▸ ]                             │
│                    │ click                                           │
│                    v expands that year's month grid inline           │
│                                                                      │
│  Each month card opens its HeyZine flip-book in a new browser tab.   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoint

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/newsletters/` | GET | Public (AllowAny) | Latest edition + all active editions grouped by year |

There is only **one** endpoint, and it is read-only (no POST/PUT/DELETE). All
writes happen through the Django Admin.

### GET /api/newsletters/

```json
{
  "latest": {
    "id": 6,
    "title": "July 2026",
    "month": 7,
    "year": 2026,
    "flipbook_url": "https://heyzine.com/flip-book/88086dd966.html",
    "cover_image": ""
  },
  "groups": [
    {
      "year": 2026,
      "is_current": true,
      "issues": [
        { "id": 1, "title": "February 2026", "month": 2, "year": 2026, "flipbook_url": "https://heyzine.com/flip-book/f08c3400d1.html", "cover_image": "" },
        { "id": 2, "title": "March 2026", "month": 3, "year": 2026, "flipbook_url": "https://heyzine.com/flip-book/e7f1127908.html", "cover_image": "" }
      ]
    }
  ]
}
```

Response fields:

- **`latest`** — the single most recent edition (highest year, then highest
  month). Rendered as the highlighted "Latest issue" card. `null` if there are
  no editions. Computed automatically; there is no admin flag.
- **`groups`** — every active edition grouped by year, ordered **oldest year
  first (ascending)** so the frontend can lay out the archive cards in order.
  Within each year, editions run **January → December**.
- **`is_current`** — `true` for the newest year only (rendered expanded), `false`
  for older years (rendered as collapsible archive cards).
- **`title`** — the stored title, or an auto-generated `"<Month> <Year>"` when
  the title field is left blank.
- **`cover_image`** — the effective cover: the uploaded file's absolute URL if a
  file was uploaded, otherwise the pasted cover image URL, otherwise `""`.

---

## Database Model

### Newsletter

| Field | Type | Description |
|---|---|---|
| month | PositiveSmallInteger (choices 1–12) | Month the edition covers |
| year | PositiveInteger (indexed) | Year the edition covers |
| title | CharField (blank) | Optional custom title; defaults to `"<Month> <Year>"` |
| flipbook_url | URLField (unique) | HeyZine flip-book link opened on click |
| cover_image_url | URLField (blank) | Optional cover image URL |
| cover_image | ImageField (blank) | Optional cover image upload; takes precedence over the URL |
| is_active | Boolean | Whether to show on the website / return from the API |
| created_at / updated_at | DateTime | Record timestamps |

Constraints and behaviour:

- **Unique `(year, month)`** — prevents two editions for the same month.
- **Ordering `['-year', 'month', 'id']`** — newest year first, but months run
  January → December within a year.
- **`display_title`** — returns the custom title or `"<Month> <Year>"`.
- **`cover_image_source`** — returns the uploaded file's URL if present, else the
  URL field, else `""` (an uploaded file always wins over the URL).

---

## Initial Data — Data Migration (not a seed command)

Initial editions are seeded through the data migration
`website/migrations/0015_seed_newsletter_data.py` using `RunPython`. Running
`python manage.py migrate` populates the six 2026 editions (February–July).

```
0014_newsletter            → creates the Newsletter table
0015_seed_newsletter_data  → seeds the 6 initial editions (Feb–Jul 2026)
```

The seeder is **idempotent and non-destructive**: it uses `update_or_create`,
so re-running it on a redeploy never duplicates rows and never overwrites
editions an admin has added. There is **no** `seed_newsletter` management
command — this matches the reviewed Sathvam/Dhyana pattern (initial data lives
in migrations, ongoing content is managed through the admin portal).

### Who sees what

| Situation | Who sees it | Mechanism |
|---|---|---|
| Admin adds an edition on the **live** site | All visitors, immediately | Shared production database |
| A **new developer** clones + runs `migrate` | That developer's local DB | Seed migration (the 6 editions) |
| A **fresh production** deploy (empty DB) | Everyone, after first `migrate` | Seed migration |
| Something added via a **local** admin panel | Only that developer | Local DB (`db.sqlite3` is gitignored) |

> Seed migrations are the initial baseline only. After deployment, the admin
> panel is the ongoing source of truth and is shared across all users through
> the production database. Editions added by an admin are **not** written back
> into migration files.

---

## Admin Guide

The admin page is at `/admin/` → **Website → Newsletters**.

### Change list

Columns: **Title · Month · Year · Is active · Updated at**. `Is active` is
editable inline. Filters: by year and by active. Search: by title or flip-book
URL. Ordering: newest year first, then January → December.

### Add a new month (e.g. August 2026)

1. Open `http://yoursite.com/admin/` → **Newsletters** → **Add newsletter**.
2. Choose the **Month** (`August`) and enter the **Year** (`2026`).
3. Paste the **Flipbook URL** (the HeyZine link — the only required field).
4. (Optional) Add a cover under **Cover image**: upload a file **or** paste a
   cover image URL. If both are set, the uploaded file wins.
5. Leave **Is active** enabled.
6. Click **Save**.

Result: the edition appears on `/newsletter` on the next page load, slotted into
its correct calendar position. No code change, no rebuild.

### How the layout evolves automatically

- Adding a **later month** in the current year → it becomes the "Latest issue"
  card; the previous latest drops into the year's grid in calendar order.
- Adding the **first edition of a new year** (e.g. January 2027) → the new year
  becomes the expanded current year, and the previous year automatically
  collapses into a **Past editions** archive card. Admin does nothing extra.

---

## Frontend Structure

```
frontend/src/
├── features/newsletter/
│   ├── services/
│   │   └── newsletter.service.js        # fetchNewsletters() → GET /newsletters/
│   ├── hooks/
│   │   └── useNewsletters.js            # { data, isLoading, error }
│   └── components/
│       ├── NewsletterCard.jsx           # month card (default) + "Latest issue" (featured)
│       └── NewsletterYearArchive.jsx    # collapsible past-year card (expands inline)
└── pages/
    └── NewsletterPage.jsx               # hero + latest card + current year + archive
```

Wiring:

- `App.jsx` — route `/newsletter` → `NewsletterPage`.
- `components/layout/PublicationsPanel.jsx` — the "View This Month" button
  navigates to `/newsletter` (and closes the panel).

### Rendering logic

- `NewsletterPage` reads `{ latest, groups }`. It renders the `latest` edition as
  the highlighted card, the `is_current` group as an expanded month grid (with
  the latest edition removed so it is not shown twice), and every other group as
  an ascending list of `NewsletterYearArchive` cards.
- `NewsletterCard` matches the Sathvam / Dhyana Vahini video card sizing exactly
  (`rounded-xl border border-border bg-white shadow-sm`, `aspect-video` media,
  `px-4 py-3` body, title `variant="body" size="sm" font-medium text-heading`).
  Its `featured` variant renders the wider highlighted "Latest issue" band.
- `NewsletterYearArchive` is a self-contained collapsible card; each past year
  toggles independently and reuses `NewsletterCard` for the months inside.
- Cards open the HeyZine flip-book in a new tab
  (`target="_blank" rel="noopener noreferrer"`). No colours are hardcoded — the
  components use design tokens (`border-border`, `bg-white`, `bg-muted`,
  `bg-primary/90`, `text-heading`, `text-muted-foreground`), and the hero band
  uses the `bg-gradient-highlight` token.

---

## Backend Structure

```
backend/website/
├── models/newsletter.py                        # Newsletter model
├── admin/newsletter.py                          # Admin (month/year/url + cover upload/url + is_active)
├── api/
│   ├── urls.py                                 # /newsletters/ route
│   ├── views/newsletter.py                      # get_newsletters (latest + grouped, is_current)
│   └── serializers/newsletter.py               # NewsletterSerializer
├── services/newsletter_service.py               # get_active_newsletters, get_latest_newsletter
└── migrations/
    ├── 0014_newsletter.py                       # create table
    └── 0015_seed_newsletter_data.py             # seed 6 initial editions (idempotent)
```

Media/config notes:

- Cover-image uploads require media serving. `config/settings/base.py` sets
  `MEDIA_URL = 'media/'` and `MEDIA_ROOT = BASE_DIR / 'media'`; `config/urls.py`
  serves media in `DEBUG`. In production, point `media/` at persistent storage
  (or object storage such as S3) so uploaded covers survive restarts. The
  URL-based cover option avoids the need for file storage entirely.

---

## Pull and Run (for developers)

From the repository root:

```powershell
# 1. Get the branch
git pull
git checkout newsletter

# 2. Backend
cd backend
py -m venv venv                       # first time only
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt       # includes Pillow (for cover uploads)
python manage.py migrate              # creates the table + seeds the 6 editions
python manage.py createsuperuser      # if you don't have an admin login yet
python manage.py runserver            # http://127.0.0.1:8000/

# 3. Frontend (in a second terminal, from the repo root)
cd frontend
npm install
npm run dev                           # http://localhost:5173/
```

Then open `http://localhost:5173/newsletter`. All six 2026 editions appear
automatically because they come from the seed migration. Log in at
`http://127.0.0.1:8000/admin/` → **Newsletters** to add more.

---

## Summary

| Question | Answer |
|---|---|
| Does the admin need to write code? | No |
| How does the admin add an edition? | Admin → Newsletters → Add → month + year + flip-book URL → Save |
| Cover image? | Optional — upload a file or paste a URL (upload wins) |
| Does it appear in the UI automatically? | Yes — on the next page load, no rebuild |
| New month added? | Slots into calendar order; newest becomes the "Latest issue" card |
| New year (e.g. 2027)? | Becomes the expanded current year; the previous year auto-collapses into an archive card |
| Ordering | Newest year on top; January → December within a year |
| API endpoint | `GET /api/newsletters/` (public, read-only) |
| Initial data | Seeded via data migration `0015_seed_newsletter_data.py` (Feb–Jul 2026) |
| Will other developers see the data on pull? | Yes — the 6 seeded editions load on `migrate` (once the branch is committed/pushed) |
| Are admin-added editions shared via git? | No — they live in the database; on production all visitors see them via the shared DB |
| Colours hardcoded? | No — design tokens only |
