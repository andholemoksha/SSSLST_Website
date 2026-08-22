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
