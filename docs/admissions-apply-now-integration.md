# Admissions "Apply Now" Card — Backend Integration

## Overview

The **"Apply Now"** card is the floating lotus medallion shown in the bottom-right
corner of every page ("ADMISSIONS OPEN → APPLY NOW"). It links to the admission
application form (a Google Form or any URL).

Admissions are open only for part of the year, so this card must be easy to turn
on and off without a developer. This feature makes it **fully admin-controlled**
from the Django admin panel:

- An admin sets the **application URL** and flips a single **on/off toggle**.
- **ON** → the card shows on every page and links to that URL.
- **OFF** → the card is hidden across the whole site.

The card reads from the database on every visit, so changes take effect
automatically — no code change, no rebuild, no redeploy.

---

## How it works

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN WORKFLOW                                 │
│                                                                      │
│  Admin Panel (/admin/) → Website → Admissions                        │
│       │                                                              │
│       ├── Is active  [ ✓ / ✗ ]   ← the on/off toggle                 │
│       ├── Apply url  https://forms.gle/....                          │
│       ├── Headline   "Admissions Open"        (optional)             │
│       ├── Subtext    "Applications ... now open."  (optional)        │
│       │                                                              │
│       └── Save → reflects on the website automatically               │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        WEBSITE (every page)                           │
│                                                                      │
│  App loads → GET /api/apply/ → { is_active, apply_url, headline, ...} │
│       │                                                              │
│       ├── is_active = true  AND apply_url set → show the lotus card   │
│       │        (clicking "APPLY NOW" opens apply_url in a new tab)    │
│       │                                                              │
│       └── is_active = false (or no URL) → card hidden everywhere      │
└─────────────────────────────────────────────────────────────────────┘
```

There is exactly **one settings row** (a singleton). It is created automatically
(inactive) on `migrate`, so the card stays hidden until an admin turns it on.

---

## API Endpoint

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/apply/` | GET | Public (AllowAny) | The admissions card settings |

Read-only (no POST/PUT). All edits happen in the Django admin. Uses the flat
`/api/` convention — no versioning.

### GET /api/apply/

```json
{
  "is_active": true,
  "apply_url": "https://forms.gle/your-application-form",
  "headline": "Admissions Open",
  "subtext": "Applications for the upcoming batch are now open."
}
```

- **`is_active`** — the toggle. `true` shows the card, `false` hides it.
- **`apply_url`** — where "Apply Now" links (opens in a new tab).
- **`headline`** — the small heading on the card.
- **`subtext`** — the short message on the card.

If no settings row exists yet, the endpoint returns a safe default with
`is_active: false` (card hidden).

---

## Database Model

### AdmissionsSetting (singleton — one row only)

| Field | Type | Description |
|---|---|---|
| is_active | Boolean (default False) | The on/off toggle for the card |
| apply_url | URLField (blank) | The application form link |
| headline | CharField (default "Admissions Open") | Small heading on the card |
| subtext | CharField (default "Applications for the upcoming batch are now open.") | Short message |
| updated_at | DateTime | Last edited timestamp |

Behaviour:
- `save()` forces `pk = 1`, so there is always **exactly one** settings row.
- `load()` returns that row, creating it (inactive) if missing.
- Seeded inactive on `migrate`, so nothing shows until the admin acts.

---

## Admin Guide (what the admin needs to do)

Admin → **Website → Admissions**. There is a single entry (you cannot add or
delete rows — only edit the one settings record).

### To open admissions (show the card)
1. Open **Admissions**.
2. Paste the application form link into **Apply url** (e.g. the Google Form URL).
3. (Optional) Edit **Headline** and **Subtext** to change the card text.
4. Tick **Is active**.
5. Click **Save**.

The "Apply Now" card now appears on every page and links to your form.

### To close admissions (hide the card)
1. Open **Admissions**.
2. Untick **Is active**.
3. Click **Save**.

The card disappears from the whole site. The URL is kept, so re-opening later is
just a matter of ticking **Is active** again.

> The card only shows when **Is active is on AND an Apply url is set** — so an
> empty URL will never render a broken card.

---

## Files

**Backend**
```
website/models/apply.py                 # AdmissionsSetting singleton model
website/admin/apply.py                    # "Admissions" admin (edit-only, no add/delete)
website/api/serializers/apply.py          # AdmissionsSettingSerializer
website/api/views/apply.py                # get_apply (GET /api/apply/)
website/api/urls.py                       # path('apply/', get_apply, name='apply')
website/migrations/0019_admissionssetting.py       # create table
website/migrations/0020_seed_admissions_setting.py # seed one inactive row
```

**Frontend**
```
features/admissions/services/admissions.service.js  # getAdmissions() -> GET /apply/
features/admissions/hooks/useAdmissions.js           # TanStack Query hook
components/ui/admissions-lotus-card.jsx              # the card; now takes props
App.jsx                                              # renders card only when is_active && apply_url
```

### Rendering logic

- `App.jsx` calls `useAdmissions()` once (cached for the session) and renders
  `<AdmissionsLotusCard>` globally — outside `<Routes>`, so it appears on every
  page — only when `is_active` is true and `apply_url` is set.
- `AdmissionsLotusCard` takes `applyUrl`, `headline`, and `subtext` as props and
  opens the URL in a new tab (`target="_blank" rel="noopener noreferrer"`).

---

## Who sees what

| Situation | Result |
|---|---|
| Admin toggles ON on the **live** site | Card appears for all visitors immediately |
| Admin toggles OFF on the **live** site | Card hidden for all visitors immediately |
| A **new developer** clones + `migrate` | Gets the settings row (inactive) — card hidden by default |
| Fresh **production** deploy | Same — card stays hidden until an admin turns it on |

The settings live in the shared database, so on production a single admin change
is instantly visible to everyone. The database itself is not shared via git; the
initial (inactive) row is created by the seed migration on `migrate`.

---

## Pull and run (for developers)

```powershell
git fetch origin
git checkout feature/apply-now

cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate            # creates the settings row (inactive)
python manage.py createsuperuser    # if you don't have an admin login
python manage.py runserver

# frontend (second terminal)
cd frontend
npm install
npm run dev
```

Log in at `http://127.0.0.1:8000/admin/` → **Admissions**, set a URL, tick **Is
active**, Save → the "Apply Now" card appears on `http://localhost:5173/`.

---

## Summary

| Question | Answer |
|---|---|
| What is it? | The floating "Apply Now" admissions card, now admin-controlled |
| How does the admin show it? | Admin → Admissions → set Apply url + tick Is active → Save |
| How does the admin hide it? | Admin → Admissions → untick Is active → Save |
| Does it update automatically? | Yes — on the next page load, no code change |
| Where does it appear? | Bottom-right on every page |
| API endpoint | `GET /api/apply/` (public, read-only) |
| Data | A single settings row, seeded inactive on `migrate` |
| Default state | OFF (hidden) until an admin turns it on |
