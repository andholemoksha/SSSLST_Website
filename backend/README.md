# SSSLST Backend

This project is a Django backend for the SSSLST website. The following steps will help you set it up locally and run it whenever you need to work on the project.

## Initial setup

Open PowerShell in the backend folder and run:

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

> Initial Sathvam data (playlists + videos for 2020-2026) is seeded automatically
> via a data migration when you run `python manage.py migrate`. Any further content
> should be managed through the admin portal.

### Environment variables

Copy `.env.example` to `.env` and fill in values:

```powershell
copy .env.example .env
```

- `YOUTUBE_API_KEY` — free key from Google Cloud Console (enable "YouTube Data
  API v3"). Required only for the "Sync Now" feature. The site works without it
  since initial data is seeded via migration.

## How to run the backend

Every time you want to start the backend, run:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

Then open:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/admin/

---

## API Endpoints

### Health Check

```
GET /api/health/
```

Response:
```json
{ "status": "ok", "message": "Backend connected successfully" }
```

### Home Stats

```
GET /api/home/stats/
```

Response:
```json
{
  "graduates": 2400,
  "states_covered": 28,
  "batches_completed": 12,
  "current_participants": 340
}
```

### Sathvam - Available Years

```
GET /api/sathvam/years/
```

Response:
```json
[2026, 2025, 2024, 2023, 2022, 2021, 2020]
```

### Sathvam - Videos by Year

```
GET /api/sathvam/videos/?year=2026
```

Response:
```json
[
  {
    "video_id": "lm9OumywtKg",
    "title": "Resonating With The Voice Within - Sri Girish Krishnamurthy",
    "published_at": "2026-04-24",
    "order": 1
  },
  ...
]
```

---

## Sathvam Sync (Admin Feature)

The Sathvam video integration uses an auto-sync approach to keep the website in sync with YouTube playlists without any code changes. Initial data is loaded via a data migration; all ongoing content is managed through the admin portal.

### What is "Sync Now"?

"Sync Now" is a button in the Django admin panel that fetches the latest videos from a YouTube playlist and updates the database. It:

- Adds new videos that were uploaded to the playlist
- Deactivates videos that were removed from the playlist
- Updates video titles if they changed on YouTube

### Why is it used?

Instead of manually adding each video to the database, the admin simply clicks "Sync Now" and the system automatically fetches all video data from the YouTube Data API v3. This means:

- Free (10,000 units/day quota; a full sync uses ~7 units)
- Non-technical admins can manage content
- Requires a one-time free YouTube Data API key (set as `YOUTUBE_API_KEY` in `.env`)

> Note: This originally used YouTube's public RSS feed (no key needed), but
> YouTube deprecated that endpoint (it now returns 404), so the official
> YouTube Data API v3 is used instead.

### How it works

```
Admin clicks "Sync Now"
       |
       v
Backend calls YouTube Data API v3
(playlistItems.list for the playlist_id, using YOUTUBE_API_KEY)
       |
       v
Compares API videos with database records
       |
       +---> New video from API? --> Add to database (is_active=True)
       |
       +---> Video missing from API? --> Deactivate in database (is_active=False)
       |
       +---> Title changed? --> Update in database
       |
       v
Website automatically displays updated videos
```

### How to add a new year (e.g. 2027)

1. Go to http://127.0.0.1:8000/admin/
2. Click **"Sathvam Playlists"** in the sidebar
3. Click **"ADD SATHVAM PLAYLIST"** (top right)
4. Fill in:
   - **Year**: `2027`
   - **Playlist URL**: Paste the full YouTube playlist URL (e.g. `https://youtube.com/playlist?list=PLxxx&si=abc`)
5. Click **"Save"**
6. Done! Videos are auto-fetched and the frontend shows a new 2027 card automatically.

### How to sync when new videos are added to YouTube

1. Go to http://127.0.0.1:8000/admin/
2. Click **"Sathvam Playlists"**
3. Find the year row and click the **"Sync Now"** button
4. Done! New videos appear on the website immediately.

### Management command (for developers)

```powershell
# Sync all playlists
python manage.py sync_sathvam

# Sync a specific year
python manage.py sync_sathvam --year 2026
```

---

## Useful commands

### Activate virtual environment

```powershell
.\venv\Scripts\Activate.ps1
```

### Install dependencies again

```powershell
pip install -r requirements.txt
```

### Apply migrations

```powershell
python manage.py migrate
```

### Create a superuser

```powershell
python manage.py createsuperuser
```

### Stop the server

Press Ctrl + C in the terminal where the server is running.

---

## Environment variables

Copy `.env.example` to `.env` and fill in values:

```powershell
copy .env.example .env
```

- `YOUTUBE_API_KEY` — free key from Google Cloud Console (enable "YouTube Data
  API v3"). Required only for the Dhyana Vahini "Sync Now" feature. The site
  works without it since initial data is seeded via a data migration.

---

## Dhyana Vahini Reflections

The Dhyana Vahini page shows YouTube video reflections from participants,
grouped by year. It follows the same pattern as the Sathvam integration.

### API endpoints

```
GET /api/dhyana-vahini/years/
```

Returns distinct years that contain at least one active video or written
reflection:

Response:
```json
[2026]
```

```
GET /api/dhyana-vahini/videos/?year=2026
```

Response:
```json
[
  { "video_id": "Gs8jtgJGsrw", "title": "Dhyana Vahini Video Reflection 1", "published_at": null, "order": 101 },
  ...
]
```

### How data is managed (admin / CMS)

- Initial data (the 2026 playlist + 9 video reflections) is seeded automatically
  via the data migration `0007_seed_dhyana_vahini_data.py` when you run
  `python manage.py migrate`. There is no seed command.
- All ongoing content is managed through the Django admin portal:
  - **Dhyana Vahini Playlists** — add a playlist for a year (paste the YouTube
    playlist URL; the playlist ID is auto-extracted). Save auto-syncs; a
    per-row **Sync Now** button re-syncs on demand.
  - **Dhyana Vahini Videos** — the synced/seeded videos (read-mostly).

### Sync

"Sync Now" fetches the playlist's videos from the **YouTube Data API v3**
(the public RSS feed was deprecated by YouTube and now returns 404). It:

- Adds new videos in the playlist
- Deactivates playlist videos removed on YouTube
- Leaves manually-added videos (source = manual) untouched

Requires `YOUTUBE_API_KEY` in `.env`. Without it, the page still shows the
seeded videos and Sync Now reports a clear "key not set" message.

### How to add next year's reflections

1. Go to http://127.0.0.1:8000/admin/ → **Dhyana Vahini Playlists** → Add
2. Enter the year (e.g. 2027) and paste the YouTube playlist URL → Save
3. Videos auto-sync. A new "2027 Participants Reflections..." section appears
   automatically below the existing years on the Video Reflections page.

### Written reflections

Written reflections are returned by:

```text
GET /api/dhyana-vahini/text/?year=2026
```

The response contains `id`, `name`, and `reflection`. Prepare one complete
CSV file per year with these columns:

```text
id,name,reflection
roll-001,Student Name,"The complete reflection text."
```

Written reflections can also be added individually from the Django Admin by
opening **Dhyana Vahini Text Reflections** and selecting **ADD**. To delete
records, select them in the list, choose **Delete selected** from the
**Action** dropdown, and confirm the deletion.

For many reflections, use the **Import CSV** button on the same Admin list
page. The importer validates the complete file before saving, updates matching
`year` + `id` records, creates new records, and can deactivate records missing
from a complete yearly file. There is no public POST endpoint.

Import it from the backend directory:

```powershell
python manage.py import_dhyana_vahini_text --year 2026 --file data/dhyana-vahini-2026.csv --complete
```

Use `--dry-run` to validate and preview the counts without changing the
database. The `--complete` option deactivates old records for that year that
are not present in the file.

### Developer command

```powershell
# Sync all active playlists (also available as "Sync Now" in admin)
python manage.py sync_dhyana_vahini

# Sync only one year
python manage.py sync_dhyana_vahini --year 2026
```

---

## Prerana Yearbook

The Prerana page displays year-wise yearbook editions. Each card links to the
PDF on Google Drive (opens in a new tab). Cover images, titles, and PDF links
are managed via the admin panel.

### API endpoint

```
GET /api/prerna/editions/
```

Response:
```json
[
  {
    "year": 2025,
    "title": "Prerana 2025",
    "description": "",
    "pdf_url": "https://drive.google.com/...",
    "cover_image_url": "/assets/prerna/prerana-2025.png"
  }
]
```

### How data is managed (admin / CMS)

- Initial data (6 editions: 2020–2025 with cover images) is seeded automatically
  via the data migration `0015_seed_prerna_editions.py` on `migrate`.
- All ongoing content is managed through the Django admin portal:
  - **Prerna Editions** — add year + title + PDF URL + cover image (upload or URL)
  - New cards appear on the website within 30 seconds (auto-refresh)

### How to add a new year's edition

1. Go to http://127.0.0.1:8000/admin/ → **Prerna Editions** → Add
2. Enter year, title, PDF URL, and upload/paste cover image → Save
3. Card appears automatically on the website. No code change needed.

### Cover image options

| Method | How |
|---|---|
| Upload file | Use the "Cover image" file chooser in admin |
| Paste URL | Put an external URL in "Cover image URL" field |
| Neither | Card shows the year number on a purple panel (fallback) |

Uploaded file takes priority over pasted URL.

### Performance

The PDF opens on Google Drive's servers (not yours). The website only serves
a small JSON list of editions (~1 KB). Cover images are static files cached
by the browser. Multiple concurrent users are handled without any server load.
