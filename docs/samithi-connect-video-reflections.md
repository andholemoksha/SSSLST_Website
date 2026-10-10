# Samithi Connect Video Reflections

Samithi Connect video records are separate from Dhyana Vahini videos. They are
served by `GET /api/samithi-connect/videos/` in admin-configured order.

Manage records in Django Admin under **Samithi Connect Videos**. Add the
YouTube video ID and title, set an order, and leave **Is active** enabled to
publish a video. The thumbnail and player URLs are generated from the video ID.

The initial migration adds these records:

| Video ID | Admin title | Order | Published date |
| --- | --- | ---: | --- |
| `6V7zg9Scggc` | Samithi Connect Video Reflection 1 | 1 | Not supplied |
| `uTHZ16ibW0k` | Samithi Connect Video Reflection 2 | 2 | Not supplied |

The titles are temporary labels because the model requires a title. No year or
publication date was provided, so neither is stored as invented metadata.
