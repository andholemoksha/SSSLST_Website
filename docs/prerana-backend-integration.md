# Prerana Page Backend Integration

## Overview

Prerana is the official yearbook of the Sri Sathya Sai Leadership Through
Self-Transformation (SSSLST). Each year's edition is a PDF document containing
articles, reflections, and personal stories from that batch's participants.

The Prerana page displays year-wise edition cards. Clicking a card opens the
yearbook (hosted on Google Drive) in a new browser tab. Cover images, titles,
and PDF links are managed entirely through the Django admin panel.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW (CMS)                           │
│                                                                      │
│  Admin Panel (/admin/) → Prerna Editions                             │
│       │                                                              │
│       ├── Add edition (year + title + PDF URL) → Save                │
│       │       └── Card appears on website automatically              │
│       │                                                              │
│       ├── Upload cover image (file upload) → Save                    │
│       │       └── Card shows the uploaded cover                      │
│       │                                                              │
│       └── Or paste an external image URL → Save                      │
│               └── Card shows that image                              │
│                                                                      │
│  No code changes needed. No deploy needed.                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        USER EXPERIENCE                                │
│                                                                      │
│  /prerna                                                             │
│       │                                                              │
│       │  Light pink/lavender gradient hero section                    │
│       │  + Swami accent image (right side)                           │
│       │                                                              │
│       │  GET /api/prerna/editions/ → list of active editions         │
│       │  Renders year cards dynamically (newest first)               │
│       │                                                              │
│       └── User clicks a card                                         │
│               │                                                      │
│               └── Opens the Google Drive PDF link in a new tab       │
│                   (Google's PDF viewer — fast, no server load)        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoint

### GET /api/prerna/editions/

Returns all active Prerana editions, newest year first.

```json
[
  {
    "year": 2025,
    "title": "Prerana 2025",
    "description": "",
    "pdf_url": "https://drive.google.com/drive/folders/...",
    "cover_image_url": "/assets/prerna/prerana-2025.png"
  },
  {
    "year": 2024,
    "title": "Prerana 2024",
    "description": "",
    "pdf_url": "https://drive.google.com/drive/folders/...",
    "cover_image_url": "/assets/prerna/prerana-2024.png"
  }
]
```

The `cover_image_url` field returns:
- An uploaded file path (`/media/prerna/covers/...`) if admin uploaded a file
- A static asset path (`/assets/prerna/prerana-2025.png`) from the seed migration
- An external URL (`https://...`) if admin pasted one
- Empty string if no cover is set (card shows the year number on a purple panel)

---

## Database Model

### PrernaEdition

| Field | Type | Description |
|---|---|---|
| year | Integer (unique) | Year this edition belongs to |
| title | CharField | Display title (e.g. "Prerana 2025") |
| description | CharField (optional) | Short description (currently unused in UI) |
| pdf_url | URLField | Google Drive link — opened when user clicks the card |
| cover_image | ImageField (optional) | Upload a cover image file directly |
| cover_image_url | URLField (optional) | Or paste an external image URL |
| is_active | Boolean | Show/hide toggle |

**Cover image priority:** uploaded file > pasted URL > fallback (year number on purple panel)

---

## Initial Data — Seed Migration

Initial data (6 editions: 2020–2025) is seeded via the data migration
`0015_seed_prerna_editions.py` using `RunPython`. Running `python manage.py migrate`
populates:

- 6 editions with titles and the parent Google Drive folder link
- Cover image URLs pointing to static assets in `frontend/public/assets/prerna/`

There is no seed command. This follows the same pattern as Sathvam and Dhyana
Vahini — initial data lives in migrations, ongoing content is managed through
the admin portal.

---

## Admin Guide

### Adding a new year's edition

1. Go to `http://yoursite.com/admin/` → **Prerna Editions** → **Add**
2. Fill in:
   - **Year:** `2027`
   - **Title:** `Prerana 2027`
   - **PDF URL:** paste the Google Drive shareable link for the yearbook
   - **Cover image:** upload the cover photo (or paste URL in "Cover image URL")
3. Click **Save**

The new card appears on the website within 30 seconds (auto-refresh).

### Updating a cover image

1. Go to **Prerna Editions** → click the edition
2. Under "Cover image" → click **Choose File** → select the new image
3. Click **Save**

The card immediately shows the new cover.

### Hiding/showing an edition

Toggle the **Is active** checkbox. Inactive editions don't appear on the website.

---

## Performance & Multiple Users

- The Prerana page itself serves a small JSON response (~1 KB for 7 editions)
- Cover images are served as static files (CDN-cacheable in production)
- When a user clicks a card, **Google Drive serves the PDF** — zero load on your server
- Even 1000+ concurrent users won't slow the website because the heavy work (PDF rendering) happens on Google's infrastructure

---

## Frontend Structure

```
frontend/src/
├── content/prerna.js                              # Hero text, editions section copy, about text
├── features/prerna/
│   ├── hooks/usePrernaEditions.js                 # Fetches editions, auto-refreshes every 30s
│   └── services/prerna.service.js                 # GET /api/prerna/editions/
├── pages/PrernaPage.jsx                           # Light hero + editions grid + about section
└── public/assets/prerna/
    ├── prerana-hero.png                           # Hero accent image
    ├── prerana-2020.png                           # Cover images (committed to git)
    ├── prerana-2021.png
    ├── prerana-2022.png
    ├── prerana-2023.png
    ├── prerana-2024.png
    └── prerana-2025.png
```

### Key Frontend Decisions

- **Custom light hero** (not the shared dark `HeroSection`): uses `bg-gradient-highlight` (the site's pink→lavender→peach gradient token) with dark text for readability
- **TileCard with external link support**: when `to` starts with `http`, it renders an `<a target="_blank">` instead of a React Router `<Link>`, so PDFs open in a new tab
- **Auto-refresh (30s polling)**: the hook refetches editions every 30 seconds so admin changes appear without manual browser refresh
- **Fallback for missing covers**: if no cover image is set, the card shows the year number on the brand-colored (purple) panel

---

## Backend Structure

```
backend/website/
├── models/prerna.py                               # PrernaEdition model (with cover_url property)
├── admin/prerna.py                                # Admin panel (file upload + URL option)
├── api/
│   ├── urls.py                                    # /prerna/editions/ route
│   ├── views/prerna.py                            # prerna_editions view
│   └── serializers/prerna.py                      # Serializer (handles uploaded file vs URL)
├── services/prerna_service.py                     # get_all_editions()
└── migrations/
    ├── 0014_prerna_edition.py                     # Schema
    ├── 0015_seed_prerna_editions.py               # Seed data (6 editions + cover paths)
    └── 0016_prerna_cover_image.py                 # Added cover_image upload field
```

---

## How Cover Images Work (3 methods)

| Method | How | Who sees it |
|---|---|---|
| **Static asset** (seed migration) | Image in `public/assets/prerna/`, path stored in DB via migration | Everyone (committed to git) |
| **Admin upload** (ImageField) | Admin uploads via admin panel, stored in `media/prerna/covers/` | All users on that server (production = everyone; local = just that dev) |
| **External URL** (pasted) | Admin pastes a URL (e.g. Google Drive image link) | Everyone (URL is public) |

Priority: uploaded file > static URL > empty (fallback to year number)

---

## Vite Dev Server Configuration

The frontend dev server proxies both `/api` and `/media` to the backend, so
uploaded images display correctly in local development:

```javascript
// vite.config.js
server: {
  proxy: {
    "/api": { target: "http://127.0.0.1:8000", changeOrigin: true },
    "/media": { target: "http://127.0.0.1:8000", changeOrigin: true },
  }
}
```

---

## How to Pull and Run Locally

```powershell
# Backend
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate          # auto-seeds 6 editions with cover images
python manage.py createsuperuser
python manage.py runserver

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173/prerna` — 6 edition cards with covers.

---

## Summary

| Question | Answer |
|---|---|
| Does admin need to write code? | No |
| Does admin need a developer to add a new year? | No — just add via admin panel |
| When does the new card appear? | Within 30 seconds (auto-refresh) |
| Where does the PDF open? | New browser tab (Google Drive viewer) |
| Does it slow the website? | No — Google serves the PDF, not your server |
| Cover image options | Upload file, paste URL, or leave blank (year number shown) |
| Initial data | Seeded via migration (2020–2025 with covers) |
| Navigation | Digital Archives → Prerana |
| Design | Light pink/lavender gradient hero, matching site tokens |
