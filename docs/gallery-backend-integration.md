# Photo Gallery Backend Integration

## Overview

The Photo Gallery shows SSSLST photos organised as **Year → Album → Photos**
(e.g. `2026 → Induction Session → [photos]`). Photos live in Google Drive
folders; their metadata is **synced into our database by an admin action**, and
the public site reads only from our database. This is the key design choice: it
keeps the site fast, cache-friendly, and safe for many simultaneous users, and
it avoids Google Drive rate limits.

- Route: `/gallery` (linked from the navbar under **Digital Archives → Photo Gallery**).
- Progressive loading: years → albums for a year → a page of photos for an album.
- Thumbnails in the grid; the larger image loads only when a photo opens in the lightbox.

---

## Performance model (why the site stays fast)

```
ADMIN (occasional):  Drive folder ──"Sync from Drive"──> our database
USERS (every visit): browser ──> our API ──> our database   (Drive is NOT called)
                                   │
                                   └─ images stream directly from Google's CDN
                                      (thumbnails in grid, full image in lightbox)
```

- **Initial page load:** one small query — the list of years. Milliseconds.
- **Select a year:** one query — that year's albums (a handful of rows).
- **Open an album:** one query — a page of 24 photo thumbnails (paginated / "Load more").
- **Lightbox:** loads one larger image, on demand.
- **Multiple users:** all reads hit our own database; no per-user state is stored
  in globals or memory. Responses are small JSON and cacheable.
- **Google Drive load:** effectively zero during browsing — Drive is only called
  when an admin clicks **Sync**. Image bytes are served by Google's CDN
  (`drive.google.com/thumbnail…`), never proxied through our server.
- **Frontend caching:** TanStack Query caches years/albums/photos for 5 minutes,
  so switching years, reopening albums, and back/forward navigation avoid refetching.

### Google Drive limitations to be aware of

- A Drive folder can only be listed via the **Drive API v3** with a key; folders
  must be shared **"Anyone with the link → Viewer"** for the key to read them.
- The API has request quotas. Because we only call it on **sync** (not per user
  request), normal traffic never approaches those limits, even with many users.
- If Drive is slow or down, the **site still works** — it serves from our
  database. Only a fresh sync would be affected. A single broken image shows a
  placeholder and never breaks the grid or lightbox.

---

## Database Model

Binary image files are **not** stored in the database — only metadata/links.
There are just **two** models. `year` is a plain integer field on the card
(there is no separate Year table); years are derived from the cards that exist.

### GalleryAlbum (one "Photo Gallery" card = year + title + Drive folder)
| Field | Type | Notes |
|---|---|---|
| year | PositiveInteger (indexed) | e.g. 2026 — the year this card belongs to |
| title | Char | e.g. "Induction Session", "Valedictory", "Sai Hira" |
| description | Text (blank) | optional |
| drive_folder_url | URL (blank) | the Drive folder link |
| drive_folder_id | Char (auto) | extracted from the URL on save |
| cover_image_url / cover_image | URL / ImageField | optional; else first photo is the cover |
| photo_count | PositiveInteger (auto) | maintained on sync |
| is_active | Boolean (indexed) | hide/show this card |
| order | PositiveInteger | lower shows first within the year |
| last_synced_at | DateTime | |

Constraints/indexes: unique `(year, title)`; index on `(year, is_active, order)`.

### GalleryPhoto
| Field | Type | Notes |
|---|---|---|
| album | FK → GalleryAlbum | |
| drive_file_id | Char | Drive file id |
| title | Char (blank) | file name |
| thumbnail_link | URL | small CDN image for the grid |
| full_link | URL | larger image for the lightbox |
| width / height | PositiveInteger (nullable) | from Drive metadata |
| order | PositiveInteger | |
| is_active | Boolean (indexed) | |

Constraints/indexes: unique `(album, drive_file_id)`; index on `(album, is_active, order)`.

Image links use `https://drive.google.com/thumbnail?id=<file_id>&sz=w<size>`
(`w400` for the grid, `w1600` for the lightbox) — CDN-served and resizable, with
no API auth needed for publicly shared files.

---

## API Endpoints

All are public (AllowAny), read-only, and return only what the current screen needs.

| Endpoint | Query params | Returns |
|---|---|---|
| `GET /api/gallery/years/` | — | `[{ year, album_count, photo_count, cover_image }]` (only years with photos, newest first) |
| `GET /api/gallery/albums/` | `year` (required) | `[{ id, year, title, description, photo_count, cover_image }]` (only albums with photos) |
| `GET /api/gallery/photos/` | `album` (required), `page`, `page_size` | `{ count, next, previous, results: [{ id, title, thumbnail_link, full_link, width, height }] }` |

Photos are paginated (default 24 per page, max 60). Missing categories never
appear: years/albums with no active photos are excluded automatically.

---

## Admin / CMS

There is a **single** admin section: Admin → **Website → Photo Gallery**. Each
entry is one card. There are no separate "years" or "photos" screens — years are
derived from the cards, and photos are populated by sync.

### Add a card (e.g. 2025 Induction, then 2025 Valedictory)
1. **Photo Gallery → Add**.
2. Enter the **Year** (e.g. `2025`) and a **Title** (e.g. "Induction"), set **order** (optional).
3. Paste the **Drive folder link** (set the folder to *Anyone with the link → Viewer*).
4. (Optional) Add a cover: upload a file or paste a URL (else the first photo is used).
5. **Save** — the card auto-syncs photos from Drive. You can also click **Sync from
   Drive** on the list at any time to pick up new/removed photos.

To add a second card under the same year, add another entry with the same year
and a different title. Under 2025 you'd then get two cards (Induction, Valedictory).

Photos are managed by sync (not added by hand). **Delete is disabled** — untick
**Is active** to hide a card (or remove a photo from the Drive folder and re-sync).

### Missing categories
Only cards that actually exist and have photos are shown. If 2024 has Induction
and "Other Activities" but no Graduation, only those two appear — no empty cards.

---

## Google Drive setup (required environment variable)

`.env` (backend only — never exposed to the frontend):

```
GOOGLE_API_KEY=your-key-here
```

Setup:
1. Google Cloud Console → same project as the YouTube key (or a new one).
2. Enable **Google Drive API**.
3. Create an **API key** under Credentials (or reuse a key with Drive enabled).
4. Share each gallery Drive folder as **Anyone with the link → Viewer**.

The key is read via `config('GOOGLE_API_KEY')` in `settings/base.py` and used
only by the backend sync service. `.env.example` documents the placeholder.

---

## Files

**Backend**
```
website/models/photo_gallery.py            # GalleryYear, GalleryAlbum, GalleryPhoto (+ extract_drive_folder_id)
website/services/photo_gallery_service.py  # query services + Drive listing + sync_album
website/api/serializers/photo_gallery.py   # Year / Album / Photo serializers
website/api/views/photo_gallery.py         # gallery_years / gallery_albums / gallery_photos (+ pagination)
website/admin/photo_gallery.py             # admin with "Sync from Drive"
website/migrations/0014_galleryalbum_galleryphoto.py       # schema
website/migrations/0015_seed_gallery_data.py               # seeds 12 albums + 491 photos
website/migrations/seed_data/gallery_seed_data.json        # seed data (public Drive ids + CDN links)
config/settings/base.py                    # GOOGLE_API_KEY, MEDIA_URL/MEDIA_ROOT
config/urls.py                             # serve MEDIA in DEBUG
```

**Frontend**
```
features/photo-gallery/services/photoGallery.service.js
features/photo-gallery/hooks/useGallery.js            # TanStack Query (years/albums/infinite photos)
features/photo-gallery/components/GalleryImage.jsx     # lazy + graceful broken-image fallback
features/photo-gallery/components/GalleryAlbumView.jsx # grid + "Load more" + lightbox
features/photo-gallery/components/GalleryLightbox.jsx  # prev/next/close + keyboard
pages/PhotoGalleryPage.jsx                             # year tabs -> album cards -> album view
App.jsx                                                # /gallery route
content/navigation.js                                  # navbar link -> /gallery
```

---

## Pull and run (for developers)

```powershell
git checkout feature/gallery
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate     # creates the gallery tables
python manage.py runserver

# second terminal
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173/gallery`. To see photos, an admin logs in at
`/admin/`, adds a year + album with a shared Drive folder link, and clicks
**Sync from Drive** (requires `GOOGLE_API_KEY` in the backend `.env`).

---

## Limitations / manual setup

- Requires `GOOGLE_API_KEY` in the backend `.env` and each Drive folder shared as
  "Anyone with the link". Without the key, sync fails with a clear message; the
  rest of the site is unaffected.
- Cover-image uploads use Django media (`MEDIA_ROOT`). In production, point
  `media/` at persistent storage so uploaded covers survive restarts (the
  URL-based cover option and the auto "first photo" cover avoid this entirely).
- Photos are discovered from the folder on sync; the admin re-syncs to reflect
  additions/removals (there is intentionally no live per-request Drive polling).
