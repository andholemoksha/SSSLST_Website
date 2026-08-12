# Sathvam Page Backend Integration

## Overview

The Sathvam (Satsangatve Nissangatvam) page displays YouTube satsang videos organized by year. It uses a **facade pattern** for performance — showing lightweight thumbnails instead of heavy YouTube iframes until the user clicks play.

The backend auto-syncs video data from YouTube playlists via free RSS feeds. No YouTube API key required, no cost, no quota limits.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW                                 │
│                                                                      │
│  Admin Panel (/admin/)                                               │
│       │                                                              │
│       ├── Add new playlist (paste YouTube URL + year) --> Save        │
│       │       └── Auto-syncs all videos from that playlist           │
│       │                                                              │
│       └── Click "Sync Now" on existing playlist                      │
│               └── Fetches latest videos from YouTube RSS             │
│               └── Adds new videos                                    │
│               └── Removes deleted videos                             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  /satsang (hub page)                                                 │
│       │                                                              │
│       │  GET /api/sathvam/years/ --> [2026, 2025, 2024, ...]         │
│       │  Renders year cards dynamically                              │
│       │                                                              │
│       └── User clicks "2026" card                                    │
│               │                                                      │
│               v                                                      │
│  /satsang/2026 (year page)                                           │
│       │                                                              │
│       │  GET /api/sathvam/videos/?year=2026                          │
│       │  Returns: [{ video_id, title, published_at, order }, ...]    │
│       │                                                              │
│       └── Renders thumbnail grid (facade pattern)                    │
│               │                                                      │
│               └── User clicks thumbnail --> YouTube iframe loads     │
│                   (only THAT video loads, not all)                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

| Endpoint | Method | Description | Response |
|---|---|---|---|
| `/api/sathvam/years/` | GET | List of years with active videos | `[2026, 2025, 2024, ...]` |
| `/api/sathvam/videos/?year=2026` | GET | Videos for a specific year | Array of video objects |

### GET /api/sathvam/years/

Returns years in descending order (newest first). Only years with at least one active video are included.

```json
[2026, 2025, 2024, 2023, 2022, 2021, 2020]
```

### GET /api/sathvam/videos/?year=2026

Returns all active videos for the given year, ordered chronologically.

```json
[
  {
    "video_id": "lm9OumywtKg",
    "title": "Resonating With The Voice Within - Sri Girish Krishnamurthy",
    "published_at": "2026-04-24",
    "order": 1
  },
  {
    "video_id": "xRj42cJdZaQ",
    "title": "ANTARJYOTI - Awakening the Flame Within - Sri Narayan Sethuramon",
    "published_at": "2026-05-10",
    "order": 2
  }
]
```

---

## Database Models

### SathvamPlaylist

Stores the YouTube playlist URL for each year. The admin manages this.

| Field | Type | Description |
|---|---|---|
| year | Integer (unique) | Year the playlist belongs to |
| playlist_url | URL | Full YouTube playlist URL (admin pastes this) |
| playlist_id | CharField (auto) | Auto-extracted from URL on save |
| is_active | Boolean | Whether to include in sync |
| last_synced_at | DateTime | Last successful sync timestamp |

### SathvamVideo

Individual video records. Managed automatically by sync, not manually.

| Field | Type | Description |
|---|---|---|
| year | Integer | Year the video belongs to |
| video_id | CharField (unique) | YouTube video ID |
| title | CharField | Video title |
| published_at | Date | When the video was published |
| order | Integer | Display order (chronological) |
| is_active | Boolean | Whether to show on website |

---

## Sync Now — How It Works

### What happens when admin clicks "Sync Now":

```
Step 1: Read playlist_id from the SathvamPlaylist record

Step 2: Fetch YouTube RSS feed
        URL: https://youtube.com/feeds/videos.xml?playlist_id={id}
        (Free, no API key, no quota, no cost)

Step 3: Parse XML response, extract video entries:
        - video_id
        - title
        - published_at

Step 4: Compare with existing database records:

        ┌─────────────────────────────┐
        │ Video in RSS + in DB        │ --> Update title if changed
        │ Video in RSS + NOT in DB    │ --> Create new record (is_active=True)
        │ Video NOT in RSS + in DB    │ --> Deactivate (is_active=False)
        └─────────────────────────────┘

Step 5: Update last_synced_at timestamp

Step 6: Frontend automatically shows updated data on next page load
```

### Why RSS instead of YouTube Data API?

| Factor | YouTube Data API | YouTube RSS Feed (what we use) |
|---|---|---|
| API key needed? | Yes | No |
| Costs money? | Free tier limited | Always free |
| Quota limits? | 10,000 units/day | Unlimited |
| When called? | Would be every page load | Only when admin clicks Sync |
| If YouTube is down? | Website breaks | Website still works (uses cached DB data) |

---

## Admin Guide — Adding a New Year

### Scenario: It's 2027 and a new playlist has been created on YouTube.

**Steps:**

1. Open the admin panel: `http://yoursite.com/admin/`
2. Login with your credentials
3. In the left sidebar, click **"Sathvam Playlists"**
4. Click **"ADD SATHVAM PLAYLIST"** button (top right)
5. Fill in the form:
   - **Year**: `2027`
   - **Playlist URL**: Copy the full URL from YouTube
     (e.g. `https://youtube.com/playlist?list=PLqbrDbtQp9JrNewPlaylist&si=xyz`)
   - **Is active**: checked
6. Click **"Save"**

**Result:** The backend auto-extracts the playlist ID, fetches all videos from YouTube, stores them in the database. The frontend's `/satsang` page automatically shows a new "2027" card. Clicking it shows all the videos.

**No code changes. No developer needed.**

---

## Admin Guide — Syncing New Videos

### Scenario: A new episode was uploaded to the 2026 playlist on YouTube.

**Steps:**

1. Open admin panel → **"Sathvam Playlists"**
2. Find the 2026 row
3. Click the **"Sync Now"** button on that row
4. A green success message appears: `Synced 2026: +1 added, ~0 updated, -0 deactivated`

**Result:** The new video immediately appears on the website.

---

## Admin Guide — Handling Deleted Videos

### Scenario: A video was removed from the YouTube playlist.

**Steps:**

1. Open admin panel → **"Sathvam Playlists"**
2. Click **"Sync Now"** for that year
3. Success message: `Synced 2026: +0 added, ~0 updated, -1 deactivated`

**Result:** The deleted video no longer shows on the website. It's not hard-deleted from the database — just marked `is_active=False` so it can be recovered if needed.

---

## Frontend Structure

```
frontend/src/
├── features/sathvam/
│   ├── services/
│   │   └── sathvam.service.js          # API calls (getSathvamYears, getSathvamVideos)
│   ├── hooks/
│   │   ├── useSathvamYears.js           # Hook: fetch available years
│   │   └── useSathvamVideos.js          # Hook: fetch videos for a year
│   └── components/
│       ├── SathvamYearTabs.jsx          # Year selector pills (used on /programme/sathvam)
│       ├── SathvamVideoGrid.jsx         # Responsive video grid with loading states
│       └── YouTubeCard.jsx              # Facade pattern: thumbnail → iframe on click
├── features/satsang/
│   └── components/
│       └── SatsangYearGrid.jsx          # Hub page grid (fetches years from API)
└── pages/
    └── SatsangYearPage.jsx              # /satsang/:year route (shows video grid)
```

### Facade Pattern (YouTubeCard)

```
BEFORE CLICK:                          AFTER CLICK:
┌──────────────────────┐              ┌──────────────────────┐
│  ┌────────────────┐  │              │  ┌────────────────┐  │
│  │   Thumbnail    │  │              │  │  YouTube       │  │
│  │   (20 KB img)  │  │   Click -->  │  │  iframe        │  │
│  │      ▶         │  │              │  │  (autoplay)    │  │
│  └────────────────┘  │              │  └────────────────┘  │
│  Video Title         │              │  Video Title         │
└──────────────────────┘              └──────────────────────┘

Only the clicked video loads the heavy iframe.
Other videos remain as lightweight images.
```

---

## Backend Structure

```
backend/website/
├── models/sathvam.py                    # SathvamPlaylist + SathvamVideo models
├── admin/sathvam.py                     # Admin panel with Sync Now button
├── api/
│   ├── urls.py                          # /api/sathvam/years/ and /api/sathvam/videos/
│   ├── views/sathvam.py                 # View functions (sathvam_videos, sathvam_years)
│   └── serializers/sathvam.py           # DRF serializer for video response
├── services/sathvam_service.py          # Business logic (get_videos_by_year, get_available_years)
└── management/commands/
    ├── seed_sathvam.py                  # Initial data seeder (development)
    └── sync_sathvam.py                  # YouTube RSS sync command + helper
```

---

## Developer Commands

```powershell
# Seed initial video data (first-time setup)
python manage.py seed_sathvam

# Sync all playlists from YouTube
python manage.py sync_sathvam

# Sync only one year
python manage.py sync_sathvam --year 2026
```

---

## How to Pull This Branch and Test Locally

### Already have the repo cloned:

```powershell
# 1. Fetch and switch to the branch
git fetch origin
git checkout feature/sathvam-video-integration
git pull origin feature/sathvam-video-integration

# 2. Backend setup
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_sathvam

# 3. Frontend setup
cd ..\frontend
npm install

# 4. Create env file (one-time only)
echo VITE_API_BASE_URL=http://127.0.0.1:8000/api > .env.development
```

### Fresh clone:

```powershell
# 1. Clone and switch branch
git clone https://github.com/andholemoksha/SSSLST_Website.git
cd SSSLST_Website
git checkout feature/sathvam-video-integration

# 2. Backend setup
cd backend
py -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_sathvam
python manage.py createsuperuser

# 3. Frontend setup
cd ..\frontend
npm install
echo VITE_API_BASE_URL=http://127.0.0.1:8000/api > .env.development
```

### Run (two terminals):

```powershell
# Terminal 1 — Backend
cd backend
.\venv\Scripts\Activate.ps1
python manage.py runserver

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### Verify:

| URL | What you should see |
|---|---|
| http://localhost:5173/satsang | Year cards (2020-2026) |
| http://localhost:5173/satsang/2026 | Video thumbnails for 2026 |
| http://127.0.0.1:8000/admin/ | Django admin with Sync Now button |
| http://127.0.0.1:8000/api/sathvam/years/ | `[2026, 2025, 2024, 2023, 2022, 2021, 2020]` |
| http://127.0.0.1:8000/api/sathvam/videos/?year=2026 | Video list JSON |

---

## Summary

| Question | Answer |
|---|---|
| Does admin need to write code? | No |
| Does admin need to know video IDs? | No — just paste the playlist URL |
| New video added to YouTube? | Click "Sync Now" |
| Video deleted from YouTube? | Click "Sync Now" — it disappears from website |
| New year (2027)? | Add playlist in admin → Save → auto-syncs |
| Frontend shows new year card automatically? | Yes — fetches years from API |
| Cost? | Zero (uses free YouTube RSS) |
| YouTube API key needed? | No |
