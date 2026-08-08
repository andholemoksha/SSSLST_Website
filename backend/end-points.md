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


POST /dhyana-vahini/text

Request:
{
  "id": "roll-number",
  "name": "string",
  "reflection": "string",
  "year": 2026
}

Response:
{
  "status": "ok"
}


4. DHYANA VAHINI - VIDEOS
-------------------------

GET /dhyana-vahini/videos?year=2026

Response:
[
  "video-link-1",
  "video-link-2",
  "video-link-3"
]


POST /dhyana-vahini/videos

Request:
{
  "videoLink": "string",
  "year": 2026
}

Response:
{
  "status": "ok"
}

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

