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

## How to run the backend

Every time you want to start the backend, run:

```powershell
cd C:\Users\AndholeMoksha\Desktop\SSSLST\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

Then open:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/admin/

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

## Dhyana Vahini Video Reflections

The Dhyana Vahini page shows YouTube video reflections from participants,
grouped by year. It follows the same pattern as the Sathvam integration.

### API endpoints

```
GET /api/dhyana-vahini/years/
```

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

### Developer command

```powershell
# Sync all active playlists (also available as "Sync Now" in admin)
python manage.py sync_dhyana_vahini

# Sync only one year
python manage.py sync_dhyana_vahini --year 2026
```
