# Samithi Connect Activity Photos — Backend Integration

## Overview

The Samithi Connect page is organised into **three wings** — Spiritual, Service,
and Education. Each wing has a set of **activities** (section cards, e.g. "Vedam",
"Narayan Seva", "Vidya Jyoti"), and each activity has **photos** sourced from a
Google Drive folder.

This feature makes those activity photos **admin-managed**, reusing the exact
Photo Gallery pattern:

- An admin manages one record per activity: pick the **Wing**, name the
  **Activity**, paste a **Google Drive folder link**, and click **Sync from
  Drive**.
- Sync lists the folder's images via the Drive API v3 and stores each photo's id
  + CDN image links in the database.
- The public site reads only from the database — it never calls Google Drive on
  a user request (fast, cache-friendly, safe for many users and Drive limits).

The three wings and their activity cards already exist on the frontend; this
feature backs each activity card with real photos and a lightbox.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Website → Samithi Connect Activities        │
│       │                                                              │
│       ├── Add / edit an activity                                     │
│       │      • Wing (dropdown: Spiritual / Service / Education)       │
│       │      • Activity title (e.g. "Vedam", "Narayan Seva")          │
│       │      • Drive folder URL                                       │
│       │      • Cover image (optional: upload or paste URL)            │
│       │      • Is active                                              │
│       │                                                              │
│       └── Save (auto-syncs) or click "Sync from Drive"               │
│               → photos appear on the website automatically           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  /programme/samithi-connect → 3 wings → activity cards               │
│       │                                                              │
│       v  open an activity (e.g. Service → Narayan Seva)              │
│  /programme/samithi-connect/<wing>/<activity>                        │
│       │  GET /api/samithi-connect/photos/?activity=ID (paginated)    │
│       │                                                              │
│       └── photo grid → click a photo → lightbox (prev/next/close)    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

All are public (AllowAny), read-only, and read from the database only.

| Endpoint | Query params | Returns |
|---|---|---|
| `GET /api/samithi-connect/wings/` | — | `[{ wing, label, activity_count, photo_count, cover_image }]` (only wings with photos) |
| `GET /api/samithi-connect/activities/` | `wing` (required) | `[{ id, wing, title, slug, description, photo_count, cover_image }]` (only activities with photos) |
| `GET /api/samithi-connect/photos/` | `activity` (required), `page`, `page_size` | `{ count, next, previous, results: [{ id, title, thumbnail_link, full_link, width, height }] }` |

Photos are paginated (24 per page, max 60). Wings/activities with no active
photos are excluded automatically — no empty cards.

> Note: the existing text reflections endpoints (`/api/samithi-connect/text/` and
> `/api/samithi-connect/text/years/`) are a separate feature and are unchanged.

---

## Database Model

Binary image files are **not** stored in the database — only metadata/links.

### SamithiActivity
| Field | Type | Notes |
|---|---|---|
| wing | Char (choices: spiritual / service / education, indexed) | Which wing |
| title | Char | Activity name, e.g. "Vedam", "Narayan Seva" |
| slug | Slug | URL slug (matches the frontend route; auto-filled from title) |
| description | Text (blank) | Optional |
| drive_folder_url | URL (blank) | The Drive folder link |
| drive_folder_id | Char (auto) | Extracted from the URL on save |
| cover_image_url / cover_image | URL / ImageField | Optional; else first photo is the cover |
| photo_count | PositiveInteger (auto) | Maintained on sync |
| is_active | Boolean (indexed) | |
| order | PositiveInteger | Lower shows first within a wing |
| last_synced_at | DateTime | |

Constraints/indexes: unique `(wing, title)`; index on `(wing, is_active, order)`.

### SamithiPhoto
| Field | Type | Notes |
|---|---|---|
| activity | FK → SamithiActivity | |
| drive_file_id | Char | Drive file id |
| title | Char (blank) | file name |
| thumbnail_link | URL | small CDN image for the grid |
| full_link | URL | larger image for the lightbox |
| width / height | PositiveInteger (nullable) | from Drive metadata |
| order | PositiveInteger | |
| is_active | Boolean (indexed) | |

Constraints/indexes: unique `(activity, drive_file_id)`; index on `(activity, is_active, order)`.

Image links use `https://drive.google.com/thumbnail?id=<file_id>&sz=w<size>`
(`w400` grid, `w1600` lightbox) — CDN-served, no API auth needed for publicly
shared files.

---

## Initial Data — Migrations

```
0021_samithiactivity_samithiphoto   → creates the two tables
0022_seed_samithi_activities        → seeds the 16 activity cards (wing + title + Drive link)
0023_seed_samithi_photos            → seeds the synced photos (from seed_data/samithi_photos_seed_data.json)
```

- `0022` creates the 16 activity cards with their Drive folder links (matching
  the frontend slugs).
- `0023` seeds the photos that were synced from Drive, using only public Drive
  file ids + CDN links (no API key in the data). So a fresh clone / production
  deploy shows the photos on `migrate` — **no Google API key needed to view**.
- Both seeders are idempotent (`update_or_create`) and never overwrite
  admin-added content.

---

## Google Drive setup (only needed to sync NEW/updated photos)

Viewing the seeded photos needs no key. To sync new photos (or refresh after
adding to a Drive folder):

`.env` (backend only — never committed, never exposed to the frontend):
```
GOOGLE_API_KEY=your-key-here
```
1. Google Cloud Console → enable **Google Drive API** → create an **API key**.
2. Share each activity's Drive folder as **"Anyone with the link → Viewer"**.

---

## Admin Guide

Admin → **Website → Samithi Connect Activities**.

### Add / update an activity's photos
1. Open (or Add) an activity.
2. Choose the **Wing** and enter the **Activity title**.
3. Paste the **Drive folder link**.
4. Click **Save** (auto-syncs) or use the **Sync from Drive** button on the list.

The activity's photos appear on `/programme/samithi-connect/<wing>/<activity>`.
Deleting a photo from the Drive folder and re-syncing deactivates it. **Delete is
disabled** — untick **Is active** to hide an activity or photo. Photos are
managed by sync (not added by hand).

---

## Files

**Backend**
```
website/models/samithi_photos.py               # SamithiActivity, SamithiPhoto
website/services/samithi_photos_service.py     # query services + sync_activity (reuses gallery Drive helpers)
website/api/serializers/samithi_photos.py      # serializers
website/api/views/samithi_photos.py            # wings / activities / photos endpoints
website/admin/samithi_photos.py                # admin with "Sync from Drive"
website/migrations/0021_samithiactivity_samithiphoto.py
website/migrations/0022_seed_samithi_activities.py
website/migrations/0023_seed_samithi_photos.py
website/migrations/seed_data/samithi_photos_seed_data.json
```

**Frontend**
```
features/samithi/services/samithiPhotos.service.js
features/samithi/hooks/useSamithiPhotos.js           # TanStack Query (wings/activities/infinite photos)
features/samithi/components/SamithiActivityPhotos.jsx # photo grid + "Load more" + lightbox
features/samithi/components/SamithiActivityGallery.jsx # resolves wing+slug -> activity id
pages/SamithiActivityPage.jsx                         # renders the gallery for wing activities
```

The frontend reuses the Photo Gallery `GalleryImage` and `GalleryLightbox`
components. Activities resolve by `slug` (which matches the frontend route slug),
falling back to a slugified title.

---

## Pull and run (for developers)

```powershell
git fetch origin
git checkout feature/samithi-connect-backend-integration

cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate     # creates tables + seeds 16 activities + 91 photos
python manage.py runserver

# frontend (second terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173/programme/samithi-connect`, pick a wing → activity —
the photos appear (seeded, no key needed). Admins sync new photos at
`/admin/` → **Samithi Connect Activities**.

---

## Summary

| Question | Answer |
|---|---|
| What is it? | Admin-managed photos for each Samithi Connect wing/activity |
| How does the admin add photos? | Admin → Samithi Connect Activities → set Drive link → Sync from Drive |
| Does it appear in the UI automatically? | Yes — on the next page load |
| API endpoints | `GET /api/samithi-connect/wings/ | /activities/?wing= | /photos/?activity=` |
| Initial data | 16 activities + 91 photos seeded via migrations (public CDN links) |
| Will developers see photos on pull? | Yes — seeded on `migrate`, no API key needed to view |
| Key needed? | Only to sync NEW photos (backend `.env`), never to view |
| Colours hardcoded? | No — design tokens; reuses gallery image/lightbox components |


---

# Samithi Connect Video Reflections — Backend Integration

## Overview

Alongside the activity photos and the text reflections, the Samithi Connect page
has a **Video Reflections** section. It shows admin-managed YouTube videos
grouped by year, and is reached from the "Video" card under Reflections at the
route `/programme/samithi-connect/reflections/video`.

This feature mirrors the **Dhyana Vahini video reflections** pattern: each row
stores a single **YouTube video id** (not a full URL, not a playlist), and the
frontend turns the id into an embedded player (thumbnail → click → iframe). There
is no playlist sync and **no API key is required** — the videos are public
YouTube embeds.

Everything an admin adds in the panel appears on the site automatically, read
from the database.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Samithi Connect Videos                      │
│       │                                                              │
│       ├── Add Samithi Connect Video                                  │
│       │      • Year  (e.g. 2026)                                     │
│       │      • Title (e.g. "Participant Reflection")                 │
│       │      • Video id (e.g. 6V7zg9Scggc — from the YouTube URL)    │
│       │      • Order (lower shows first within a year)               │
│       │      • Is active (show on site)                              │
│       │                                                              │
│       └── Save → appears on the video reflections page automatically │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  Samithi Connect → Reflections → Video                               │
│       │  GET /api/samithi-connect/videos/years/   -> [2026, ...]     │
│       │  GET /api/samithi-connect/videos/?year=   -> [ {video...} ]  │
│       │                                                              │
│       └── Videos grouped by year; each card is a thumbnail that      │
│           swaps to an embedded YouTube player on click.              │
└─────────────────────────────────────────────────────────────────────┘
```

## API Endpoints

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/samithi-connect/videos/years/` | GET | Public | Years that have active videos (newest first) |
| `/api/samithi-connect/videos/?year=YYYY` | GET | Public | Active videos for a year, ordered by `order` |

Both are read-only; all writes happen through the Django admin.

### GET /api/samithi-connect/videos/years/

```json
[2026]
```

### GET /api/samithi-connect/videos/?year=2026

```json
[
  { "video_id": "6V7zg9Scggc", "title": "Samithi Connect Video Reflection 1", "published_at": null, "order": 1 },
  { "video_id": "uTHZ16ibW0k", "title": "Samithi Connect Video Reflection 2", "published_at": null, "order": 2 }
]
```

`year` is required on the videos endpoint (returns 400 if missing/invalid). The
frontend first calls `/years/`, then fetches videos per year and renders a
section per year.

## Database Model

### SamithiConnectVideo

| Field | Type | Description |
|---|---|---|
| year | PositiveInteger (indexed) | Year the video belongs to (its group heading) |
| video_id | CharField (unique) | YouTube video id, e.g. `6V7zg9Scggc` |
| title | CharField | Title shown with the card |
| published_at | DateField (optional) | Optional publish date |
| order | PositiveSmallInteger | Lower shows first within a year |
| is_active | Boolean | Whether to show on the site / return from the API |
| created_at | DateTime | Record timestamp |

Ordering: `['year', 'order', 'id']`.

## Initial Data — Data Migration

`website/migrations/0031_samithiconnectvideo.py` creates the table and seeds two
initial videos (idempotent `update_or_create` on `video_id`), so a fresh clone or
production deploy shows content on `migrate`. No API key is needed — these are
public YouTube embeds.

## Admin Guide

Admin → **Website → Samithi Connect Videos**.

- **Change list:** Title · Year · Video id · Order · Is active (order/active
  editable inline). Filter by year/active; search by title/video id.
- **Add a video:** enter Year, Title, and the **Video id** — the id is the part
  after `/shorts/` or `youtu.be/` in the URL (e.g. `6V7zg9Scggc` from
  `https://youtu.be/6V7zg9Scggc`; `uTHZ16ibW0k` from
  `https://youtube.com/shorts/uTHZ16ibW0k`). Optionally set Order → Save.
- Result: appears on the video reflections page on the next page load, in its
  year group. Untick **Is active** to hide a video.

## Frontend Structure

```
frontend/src/
├── features/samithi/
│   ├── services/samithiConnectVideo.service.js   # getSamithiConnectVideoYears / getSamithiConnectVideos
│   ├── hooks/useSamithiConnectVideos.js          # useSamithiConnectVideosByYear() -> { groups, isLoading, isError }
│   └── components/SamithiConnectVideos.jsx        # year sections + facade VideoCard (thumbnail -> iframe)
└── pages/SamithiActivityPage.jsx                  # renders <SamithiConnectVideos/> for reflections/video
```

The video card reuses the Dhyana Vahini facade pattern: it shows the YouTube
thumbnail (`img.youtube.com/vi/<id>/mqdefault.jpg`) with a play overlay, and on
click swaps to `https://www.youtube.com/embed/<id>?autoplay=1&rel=0`.

## Backend Structure

```
backend/website/
├── models/samithi_connect_videos.py              # SamithiConnectVideo model
├── admin/samithi_connect_videos.py               # Admin (year + title + video id + order + is_active)
├── api/
│   ├── urls.py                                   # /samithi-connect/videos/ + /videos/years/
│   ├── views/samithi_connect_videos.py           # samithi_connect_videos, samithi_connect_video_years
│   └── serializers/samithi_connect_videos.py     # SamithiConnectVideoSerializer
├── services/samithi_connect_videos_service.py    # get_videos_by_year, get_available_years
└── migrations/0031_samithiconnectvideo.py        # create table + seed 2 videos
```

## Summary

| Question | Answer |
|---|---|
| Does the admin need to write code? | No |
| How does the admin add a video? | Admin → Samithi Connect Videos → Add → year + title + video id → Save |
| Does it appear in the UI automatically? | Yes — on the next page load, no rebuild |
| How are videos identified? | By a unique YouTube `video_id`; grouped by `year` |
| API endpoints | `GET /api/samithi-connect/videos/years/` and `/videos/?year=` (public, read-only) |
| Initial data | 2 videos seeded via migration `0031_samithiconnectvideo.py` |
| Will developers see videos on pull? | Yes — seeded on `migrate` |
| Key needed? | No — videos are public YouTube embeds (no API key, no Drive sync) |
| Pattern | Mirrors Dhyana Vahini video reflections (video id → embedded player) |
