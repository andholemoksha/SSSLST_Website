# Samithi Connect Activity Photos — Backend Integration

## Overview

The Samithi Connect page is organised into **three wings** — Spiritual, Service,
and Education. Each wing is backed by **one Google Drive folder**, and the public
page shows a single **photo carousel** (below the Reflections section) that is
filterable by wing. Selecting a wing shows **all** of that wing's photos.

How it works:

- There is exactly **one activity per wing** (Spiritual / Service / Education),
  each storing a **Drive folder link**.
- Photos are sourced from that folder: each photo row stores the Drive file id
  plus two public CDN image links (a small thumbnail and a larger lightbox
  image). Binary files are never stored in the database.
- The public site reads only from the database — it never calls Google Drive on
  a user request (fast, cache-friendly, safe for Drive rate limits).

> ### What this PR (`feat/samithi-connect`) changed
> This feature previously had **16 named activity cards** (Vedam, Narayan Seva,
> Vidya Jyoti, …) spread across the wings, three separate endpoints
> (`/wings/`, `/activities/`, `/photos/?activity=`), and per-activity gallery
> pages. This PR **simplified it**:
> - Replaced the 16 activities with **exactly three — one per wing** — each
>   pointing at a single Drive folder.
> - Reduced the public API to **one** read-only endpoint
>   (`/api/samithi-connect/photos/`) that returns a flat, wing-tagged list.
> - The carousel returns **every** photo of a wing (not one representative image
>   per activity), so a selected wing shows all its photos.
> - Removed the dedicated serializer; the view returns a plain list built by the
>   service.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Website → Samithi Connect Activities        │
│       │                                                              │
│       ├── Three activities exist: Spiritual / Service / Education     │
│       │      • Wing (dropdown)                                        │
│       │      • Drive folder URL                                       │
│       │      • Is active                                              │
│       │                                                              │
│       └── Save (auto-syncs) or click "Sync from Drive"               │
│               → folder's photos pulled into the DB (needs API key)    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  /programme/samithi-connect                                          │
│       │  GET /api/samithi-connect/photos/  -> [{ wing, title, image}]│
│       │                                                              │
│       └── Carousel with wing chips (Spiritual / Service / Education); │
│           choosing a wing shows all of that wing's photos.           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoint

Public (AllowAny), read-only, reads from the database only.

| Endpoint | Query params | Returns |
|---|---|---|
| `GET /api/samithi-connect/photos/` | — | `[{ wing, title, image }]` |

- Returns **all** active photos, each tagged by `wing`, in canonical wing order
  (Spiritual → Service → Education) and by photo order within each wing.
- `image` is the photo's thumbnail CDN link; `title` is the photo title (falling
  back to the activity title).
- The frontend filters client-side by the selected wing chips.

```json
[
  { "wing": "spiritual", "title": "...", "image": "https://drive.google.com/thumbnail?id=...&sz=w400" },
  { "wing": "service",   "title": "...", "image": "https://drive.google.com/thumbnail?id=...&sz=w400" }
]
```

> The old `/api/samithi-connect/wings/` and `/activities/` endpoints and the
> paginated `/photos/?activity=` form were removed by this PR. The text
> reflections (`/api/samithi-connect/text/*`) and video reflections
> (`/api/samithi-connect/videos/*`) endpoints are separate features and are
> unchanged.

---

## Database Model

Binary image files are **not** stored in the database — only metadata/links.

### SamithiActivity (now one row per wing)
| Field | Type | Notes |
|---|---|---|
| wing | Char (choices: spiritual / service / education, indexed) | Which wing |
| title | Char | "Spiritual" / "Service" / "Education" |
| slug | Slug | Auto-filled from title |
| description | Text (blank) | Optional |
| drive_folder_url | URL | The wing's Drive folder link |
| drive_folder_id | Char (auto) | Extracted from the URL on save |
| cover_image_url / cover_image | URL / ImageField | Optional; else first photo is the cover |
| photo_count | PositiveInteger (auto) | Maintained on sync/seed |
| is_active | Boolean (indexed) | |
| order | PositiveInteger | Spiritual=1, Service=2, Education=3 |
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
0021_samithiactivity_samithiphoto     → creates the two tables
0022_seed_samithi_activities          → (superseded) seeded the old 16 activity cards
0023_seed_samithi_photos              → (superseded) seeded the old photos
0037_seed_samithi_carousel_images     → (superseded) carousel safeguard for the old data
0038_reset_samithi_to_three_folders   → THIS PR: resets to 3 wing activities + seeds all their photos
```

**`0038_reset_samithi_to_three_folders.py`** is the authoritative seed now. On
`migrate` it:

1. Deletes all previously-seeded activities/photos (the output of 0022/0023/0037).
2. Creates exactly three activities — Spiritual, Service, Education — each with
   its Drive folder link.
3. Seeds **all** of their photos from
   `migrations/seed_data/samithi_three_folders_seed.json` (static Drive file ids
   + public CDN links, exported once from a live Drive sync).

Because the photo links are static CDN URLs, a fresh clone / production deploy
shows every photo on `migrate` with **no Google API key and no network call**.
The migration is idempotent (`update_or_create`) and reversible.

---

## Google Drive setup (only needed to RE-SYNC photos)

Viewing the seeded photos needs no key. A key is only required to pull fresh
contents from a Drive folder (e.g. after adding photos to it):

`.env` (backend only — never committed, never exposed to the frontend):
```
GOOGLE_API_KEY=your-key-here
```
1. Google Cloud Console → enable **Google Drive API** → create an **API key**.
2. Share each wing's Drive folder as **"Anyone with the link → Viewer"**.

> After syncing, the key can be removed again — reads never need it. The seeded
> JSON is what ships in git, so the key is not required to run or deploy.

---

## Admin Guide

Admin → **Website → Samithi Connect Activities** (three rows: Spiritual /
Service / Education).

### Refresh a wing's photos
1. Open the wing's activity.
2. Confirm/replace the **Drive folder link**.
3. Click **Save** (auto-syncs) or use the **Sync from Drive** button on the list.

Re-syncing requires `GOOGLE_API_KEY`. Deleting a photo from the Drive folder and
re-syncing deactivates it. **Delete is disabled** — untick **Is active** to hide
an activity or photo. Photos are managed by sync (not added by hand).

---

## Files

**Backend**
```
website/models/samithi_photos.py               # SamithiActivity, SamithiPhoto
website/services/samithi_photos_service.py     # get_carousel_images (all photos per wing) + sync_activity
website/api/views/samithi_photos.py            # single /photos/ endpoint (no serializer)
website/admin/samithi_photos.py                # admin with "Sync from Drive"
website/migrations/0021_samithiactivity_samithiphoto.py
website/migrations/0038_reset_samithi_to_three_folders.py
website/migrations/seed_data/samithi_three_folders_seed.json
```

**Frontend**
```
features/samithi/services/samithiPhotos.service.js   # fetchSamithiPhotos() -> GET /samithi-connect/photos/
features/samithi/hooks/useSamithiPhotos.js           # TanStack Query -> { items, isLoading, isError }
features/samithi/components/SamithiPhotos.jsx         # wing-filterable, auto-advancing carousel
features/samithi/components/SamithiSections.jsx       # renders the three wing columns + <SamithiPhotos/>
```

The carousel renders each item as `{ wing, title, image }`; cards use
`aspect-[3/4]` with `object-cover`, and images set `referrerPolicy="no-referrer"`
so Google's CDN serves them reliably in the browser.

---

## Summary

| Question | Answer |
|---|---|
| What is it? | A wing-filterable photo carousel for Samithi Connect |
| How many activities? | Three — one per wing (Spiritual / Service / Education) |
| How does the admin refresh photos? | Admin → Samithi Connect Activities → open a wing → Sync from Drive |
| Does it appear in the UI automatically? | Yes — on the next page load |
| API endpoint | `GET /api/samithi-connect/photos/` → `[{ wing, title, image }]` (all photos, wing-tagged) |
| Initial data | 3 activities + all their photos seeded via `0038` (public CDN links) |
| Will developers see photos on pull? | Yes — seeded on `migrate`, no API key needed to view |
| Key needed? | Only to re-sync from Drive (backend `.env`), never to view |
| Colours hardcoded? | No — design tokens; shared carousel component |


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
├── components/ui/youtube-card.jsx                # shared facade card (thumbnail -> iframe); also used by Sathvam/Dhyana Vahini
├── components/ui/video-reflections.jsx           # shared VideoReflections grid (year sections of YouTubeCards)
├── features/samithi/
│   ├── services/samithiConnectVideo.service.js   # getSamithiConnectVideoYears / getSamithiConnectVideos
│   ├── hooks/useSamithiConnectVideos.js          # useSamithiConnectVideosByYear() -> { groups, isLoading, isError }
│   └── components/SamithiConnectVideos.jsx        # thin wrapper: calls the hook, renders <VideoReflections> with Samithi copy
└── pages/SamithiActivityPage.jsx                  # renders <SamithiConnectVideos/> for reflections/video
```

The grid itself is the shared `components/ui/video-reflections.jsx` component,
reused by both Samithi Connect and Dhyana Vahini. `SamithiConnectVideos.jsx` just
feeds it the data (`groups`, `isLoading`, `isError`) plus its own `eyebrow`,
`description`, and year-heading text. Each card is the shared
`components/ui/youtube-card.jsx` `YouTubeCard` (also used by the Sathvam video
grid): it shows the YouTube thumbnail (`img.youtube.com/vi/<id>/mqdefault.jpg`)
with a play overlay, and on click swaps to
`https://www.youtube.com/embed/<id>?autoplay=1&rel=0`.

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
