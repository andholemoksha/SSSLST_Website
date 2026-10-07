API ENDPOINTS
=============


1. PUBLICATIONS
---------------

GET /publications

Response:
{
  "netritvam": "string",
  "monthlyMagazine": "string"
}


2. APPLY NOW
------------

GET /apply

Response:
{
  "enable": true,
  "link": "string"
}


PUT /apply

Request:
{
  "enable": true,
  "link": "string"
}

Response:
{
  "status": "ok"
}

3. DHYANA VAHINI - TEXT
-----------------------

GET /dhyana-vahini/text?year=2026

Response:
[
  {
    "id": "roll-number",
    "name": "string",
    "reflection": "string"
  }
]

The application route includes the `/api/` prefix and trailing slash:
`GET /api/dhyana-vahini/text/?year=2026`.

Written reflections are added through the yearly CSV importer or Django admin;
there is no public POST endpoint.


4. DHYANA VAHINI - VIDEOS
-------------------------

GET /dhyana-vahini/videos?year=2026

Response:
[
  {
    "video_id": "youtube-video-id",
    "title": "Video title",
    "published_at": "2026-01-01",
    "order": 1
  }
]

5. SATHVAM
----------

GET /sathvam?year=2026

Response:
{
  "playlistLink": "https://www.youtube.com/playlist?list=..."
}


POST /sathvam

Request:
{
  "playlistLink": "https://www.youtube.com/playlist?list=...",
  "year": 2026
}

Response:
{
  "status": "ok"
}


6. PHOTO GALLERY
----------------

GET /photo-gallery?year=2026

Response:
[
  "image-path-1",
  "image-path-2",
  "image-path-3"
]


POST /photo-gallery

Request:
{
  "year": 2026,
  "path": "string"
}

Response:
{
  "status": "ok"
}

7. SAMITHI CONNECT
------------------

### Text reflections

GET /samithi-connect/text?year=2026

The application route includes the `/api/` prefix and trailing slash:
`GET /api/samithi-connect/text/?year=2026`.

Response:
[
  {
    "id": "roll-number",
    "name": "string",
    "reflection": "string"
  }
]

Only active reflections for the requested year are returned. The `year`
query parameter is required and must be an integer. There is no public POST
endpoint; records are managed through Django Admin.

GET /samithi-connect?wing=string&activity=string

Response:
[
  "image-path-1",
  "image-path-2",
  "image-path-3"
]


POST /samithi-connect

Request:
{
  "wing": "string",
  "activity": "string",
  "path": "string"
}

Response:
{
  "status": "ok"
}



8. PROJECTS ARCHIVE
-------------------

GET /projects

Application route (with the `/api/` prefix and trailing slash):
`GET /api/projects/`

Query parameters (all optional):
  search     text matched (case-insensitive) against title OR description.
  year       integer; repeatable (?year=2024&year=2023) -> OR within the type.
  state      state name; repeatable; must match the backend State choices.
  gender     "Mahila" | "Gents"; repeatable.
  category   wing slug; repeatable. One of:
             spiritual, service, education, youth, medical, rural,
             environment, other.
  page       1-based page number (page_size is fixed at 12, max 60).
  page_size  optional override of the page size (<= 60).

Filtering: different parameter types are AND-ed together; repeated values of the
same type are OR-ed. Only active projects are returned.

Sort (decreasing priority, no client control):
  1. search relevance (title match ranks above description-only) — only when a
     search term is present.
  2. year descending (the default).
  3. state ascending (alphabetical).

Response (DRF page-number pagination):
{
  "count": 418,
  "next": "http://.../api/projects/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Healthy Women, Strong Society",
      "year": 2024,
      "state": "Haryana",
      "gender": "Mahila",
      "category": "medical",
      "category_label": "Medical / Healthcare",
      "description": "Health awareness and screening camps for women.",
      "document_url": "https://example.com/projects/demo-2.pdf"
    }
  ]
}

Projects are managed through Django Admin (dropdowns for state/gender/category)
or bulk-loaded with the `import_projects` management command
(CSV columns: title,year,state,gender,category,description,document_url).
There is no public write endpoint.
