# Dhyana Vahini Page Backend Integration

## Overview

The Dhyana Vahini programme page presents the meditation journey (about,
gallery, and reflections) and links to two dedicated reflection pages:

- **Video Reflections** — YouTube videos from participants, grouped by year
- **Text Reflections** — written reflections

This document covers the **Video Reflections** integration, which mirrors the
Sathvam architecture: a facade YouTube-card grid for performance, YouTube data
synced through the Django admin, and initial data seeded via a data migration.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Dhyana Vahini Playlists                     │
│       │                                                              │
│       ├── Add playlist (paste YouTube URL + year) → Save             │
│       │       └── Auto-syncs videos immediately                      │
│       │                                                              │
│       └── "Sync Now" button on an existing playlist                  │
│               └── Fetches latest videos via YouTube Data API v3       │
│               └── Adds new videos                                    │
│               └── Deactivates videos removed on YouTube              │
│               └── Leaves manual videos untouched                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  /programme/dhyana-vahini (main page)                                │
│       │  "A glimpse of the journey" → two cards:                     │
│       │     • Video Reflections → /video-reflections                 │
│       │     • Text Reflections  → /text-reflections                  │
│       │                                                              │
│       └── Click "Video Reflections"                                  │
│               │                                                      │
│               v                                                      │
│  /programme/dhyana-vahini/video-reflections                          │
│       │                                                              │
│       │  GET /api/dhyana-vahini/years/   → [2026, 2027, ...]         │
│       │  GET /api/dhyana-vahini/videos/?year=<y> per year            │
│       │                                                              │
│       └── Renders one section PER YEAR, oldest first:                │
│              "2026 Participants Reflections On Their                  │
│               Dhyana Vahini Journey."                                 │
│              [facade thumbnail grid]                                  │
│              "2027 Participants Reflections ..."  ← auto-appears      │
│              [facade thumbnail grid]                                  │
│                                                                      │
│           Each thumbnail loads its YouTube iframe only on click.     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

| Endpoint | Method | Description | Response |
|---|---|---|---|
| `/api/dhyana-vahini/years/` | GET | Years with active videos (desc) | `[2026]` |
| `/api/dhyana-vahini/videos/?year=2026` | GET | Active videos for a year | Array of video objects |

### GET /api/dhyana-vahini/years/

```json
[2026]
```

### GET /api/dhyana-vahini/videos/?year=2026

Returns active videos for the year, ordered by `order`.

```json
[
  {
    "video_id": "Gs8jtgJGsrw",
    "title": "Dhyana Vahini Video Reflection 1",
    "published_at": null,
    "order": 101
  }
]
```

Returns `400` if `year` is missing or not an integer.

---

## Database Models

### DhyanaVahiniPlaylist

| Field | Type | Description |
|---|---|---|
| year | Integer (unique) | Year the playlist belongs to |
| playlist_url | URL | Full YouTube playlist URL (admin pastes this) |
| playlist_id | CharField (auto) | Auto-extracted from URL on save |
| is_active | Boolean | Whether to include in sync |
| last_synced_at | DateTime | Last successful sync timestamp |

The model's `save()` parses the `list=` query parameter from `playlist_url`
into `playlist_id`, raising a `ValidationError` if it is missing.

### DhyanaVahiniVideo

| Field | Type | Description |
|---|---|---|
| year | Integer | Year the video belongs to |
| video_id | CharField (unique) | YouTube video ID |
| title | CharField | Video title |
| published_at | Date | Publish date (nullable) |
| order | Integer | Display order |
| source | Choice | `playlist` (synced) or `manual` (hand-added) |
| is_active | Boolean | Whether to show on the website |

The `source` field is important: sync only touches `playlist`-sourced videos,
so manually added reflections are never removed by a sync.

---

## Initial Data — Data Migration (not a seed command)

Initial data is seeded through the data migration
`website/migrations/0007_seed_dhyana_vahini_data.py` using `RunPython`. Running
`python manage.py migrate` populates:

- The 2026 Dhyana Vahini playlist (with auto-extracted `playlist_id`)
- 9 manual video reflections (`source = manual`)

There is **no** `seed_dhyana_vahini` management command. This matches the
reviewed Sathvam pattern: initial data lives in migrations, ongoing content is
managed through the admin portal.

---

## Sync — How It Works

```
Step 1: Read playlist_id from the DhyanaVahiniPlaylist record

Step 2: Call YouTube Data API v3
        Endpoint: playlistItems.list?playlistId={id}&key={YOUTUBE_API_KEY}
        (Free tier: 10,000 units/day; ~1 unit per playlist page of 50 videos)

Step 3: Parse JSON, extract video_id / title / published_at (paginated 50/page),
        skipping "Private video" / "Deleted video" entries

Step 4: Reconcile with the database:
        ┌───────────────────────────────────────┐
        │ In API + in DB          │ Update if changed  │
        │ In API + not in DB      │ Create (is_active=True, source=playlist) │
        │ Not in API + in DB      │ Deactivate (playlist-sourced only) │
        │ Manual videos           │ Never touched              │
        └───────────────────────────────────────┘

Step 5: Stamp last_synced_at
```

### Why YouTube Data API v3 (not RSS)

The original design used YouTube's public RSS feed (no API key). YouTube
deprecated that endpoint — it now returns 404 for playlist feeds — so the
official Data API v3 is used instead.

| Factor | YouTube Data API v3 (now used) | RSS Feed (deprecated) |
|---|---|---|
| API key needed? | Yes (free) | No |
| Status | Official, stable | Broken (404) |
| Cost | Free (10,000 units/day) | Was free |
| If YouTube is down? | Website still works (cached DB data) | Same |

---

## Admin Guide — Adding Next Year's Reflections

Scenario: it's 2027 and a new playlist has been created on YouTube.

1. Open the admin panel: `http://yoursite.com/admin/`
2. Click **Dhyana Vahini Playlists** → **Add**
3. Enter:
   - **Year**: `2027`
   - **Playlist URL**: the full YouTube playlist URL
4. Click **Save** — videos auto-sync immediately

Result: the backend extracts the playlist ID, fetches the videos, and stores
them under year 2027. On the Video Reflections page, a new section
**"2027 Participants Reflections On Their Dhyana Vahini Journey."** appears
automatically below the 2026 section. No code changes required.

To re-sync after new videos are uploaded to an existing playlist, click the
**Sync Now** button on that year's row.

---

## Frontend Structure

```
frontend/src/
├── features/dhyana-vahini/
│   ├── services/
│   │   └── dhyanaVahiniVideo.service.js   # API calls (years, videos)
│   ├── hooks/
│   │   └── useDhyanaVahiniVideos.js        # useDhyanaVahiniYears,
│   │                                       # useDhyanaVahiniVideos(year),
│   │                                       # useDhyanaVahiniVideosByYear (grouped)
│   └── components/
│       ├── DhyanaVahiniGallery.jsx         # "glimpse of journey" cards
│       └── DhyanaVahiniVideos.jsx          # per-year stacked video sections
└── pages/
    ├── DhyanaVahiniPage.jsx                # main programme page
    ├── DhyanaVahiniVideoReflectionsPage.jsx
    └── DhyanaVahiniTextReflectionsPage.jsx
```

### Per-year stacked rendering

`useDhyanaVahiniVideosByYear` fetches every available year and its videos,
sorts years ascending (oldest first), and drops empty years. The component
renders one titled section per year, so newly added years appear below the
existing ones automatically.

### Facade YouTube card

Each video shows a lightweight thumbnail (`img.youtube.com/vi/<id>/mqdefault.jpg`)
with a play button. The heavy YouTube iframe (`youtube.com/embed/<id>?autoplay=1`)
loads only when the user clicks — keeping the page fast even with many videos.
Individual card titles are intentionally hidden (title is retained only for
accessibility labels).

---

## Backend Structure

```
backend/website/
├── models/dhyana_vahini_videos.py          # DhyanaVahiniPlaylist + DhyanaVahiniVideo
├── admin/dhyana_vahini_videos.py           # Admin + Sync Now button + auto-sync on save
├── api/
│   ├── urls.py                             # /years/ and /videos/ routes
│   ├── views/dhyana_vahini_videos.py       # dhyana_vahini_years, dhyana_vahini_videos
│   └── serializers/dhyana_vahini_videos.py # DhyanaVahiniVideoSerializer
├── services/dhyana_vahini_videos_service.py # get_*_by_year + YouTube Data API v3 sync
├── management/commands/
│   └── sync_dhyana_vahini.py               # sync command (backs the Sync Now button)
└── migrations/
    └── 0007_seed_dhyana_vahini_data.py     # initial data (playlist + 9 videos)
```

---

## Developer Commands

```powershell
# Sync all active playlists from YouTube
python manage.py sync_dhyana_vahini

# Sync only one year
python manage.py sync_dhyana_vahini --year 2026
```

---

## Summary

| Question | Answer |
|---|---|
| Does admin need to write code? | No |
| Does admin need to know video IDs? | No — just paste the playlist URL |
| New video added to YouTube? | Click "Sync Now" |
| Video deleted from YouTube? | Click "Sync Now" — playlist videos deactivate; manual videos stay |
| New year (2027)? | Add playlist in admin → Save → auto-syncs |
| Frontend shows the new year automatically? | Yes — a new titled section appears below existing years |
| Initial data | Seeded via data migration `0007_seed_dhyana_vahini_data.py` |
| Cost? | Free (YouTube Data API v3 — 10,000 units/day) |
| YouTube API key needed? | Yes — one-time free key set as `YOUTUBE_API_KEY` in `.env` |
