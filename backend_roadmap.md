

---

# Phase 1 — Project Setup (Current Sprint)

### ✅ Completed

* Backend folder structure
* Feature branch (`feature/backend-setup`)
* Project architecture

### Next

#### 1. Create a Django project

```bash
django-admin startproject config .
```

This will populate:

* `manage.py`
* `config/settings.py` (you'll later split into `base.py`, `development.py`, `production.py`)
* `config/urls.py`
* `config/asgi.py`
* `config/wsgi.py`

---

#### 2. Create the `website` app

```bash
python manage.py startapp website
```

Since you've already created the folder, you'll mainly use this to generate Django's required files (or manually ensure they exist and are configured).

---

#### 3. Install dependencies

Start with only the essentials:

```text
Django
djangorestframework
psycopg2-binary
python-decouple
django-cors-headers
Pillow
```

Don't install Wagtail, Celery, Redis, S3, etc. yet.

---

#### 4. Configure settings

Move to:

```text
settings/
    base.py
    development.py
    production.py
```

Configure:

* Installed Apps
* Middleware
* CORS
* Static
* Media
* Database (temporarily SQLite or PostgreSQL)
* Environment variables

---

#### 5. Configure `.env`

Example

```text
SECRET_KEY=
DEBUG=True

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

---

#### 6. Run Django

```bash
python manage.py runserver
```

If the Django welcome page appears, your foundation is complete.

---

# Phase 2 — Database

Move from SQLite (or directly start with PostgreSQL if your team has decided).

Configure:

* PostgreSQL
* Connection
* Test migrations

---

# Phase 3 — Authentication

Before building APIs:

* Custom User Model
* Django Admin login
* JWT authentication

Even if the website is mostly public, it's better to set this up early.

---

# Phase 4 — First Feature (Projects)

Since your frontend already has a Projects page, start here.

Build:

```
Project Model

↓

Serializer

↓

View

↓

Endpoint

↓

React Fetches Data
```

---

# Phase 5 — Gallery

Images

Videos

PDFs

---

# Phase 6 — Programmes

Include:

* Curriculum
* Dhyana Vahini
* Sathvam
* Weekly Sessions

---

# Phase 7 — Testimonials

Simple CRUD.

---

# Phase 8 — Contact

POST endpoint

Store messages

Email notification (optional)

---

# Phase 9 — Admissions

Forms

Documents

Status

---

# Phase 10 — Media

Connect:

```
Cloudflare R2

or

AWS S3
```

---

# Phase 11 — Wagtail

Only after everything else is working.

---

# Development Order

```text
Backend Setup
        ↓
Django Configuration
        ↓
PostgreSQL
        ↓
Authentication
        ↓
Projects API
        ↓
Gallery API
        ↓
Programmes API
        ↓
Testimonials API
        ↓
Contact API
        ↓
Admissions API
        ↓
Cloudflare R2
        ↓
Wagtail CMS
```

---

# How I would manage Git branches

Instead of doing everything on `feature/backend-setup`, keep that branch focused on the setup.

Example workflow:

```
develop
│
├── feature/backend-setup
│
├── feature/backend-auth
│
├── feature/backend-projects
│
├── feature/backend-gallery
│
├── feature/backend-programmes
│
├── feature/backend-testimonials
│
├── feature/backend-contact
│
├── feature/backend-admissions
│
└── feature/backend-wagtail
```

Each feature gets its own PR, making reviews much easier.

---

# Before writing any code

One thing I'd do before implementing models is spend a little time on the data design.

Create an **ER (Entity Relationship) diagram** showing:

* Project ↔ Category
* Project ↔ Gallery Images
* Programme ↔ Curriculum
* Testimonial
* Contact
* Admission
* Media relationships

Once the relationships are clear, creating Django models and REST APIs becomes much smoother, and you'll avoid having to redesign the database later. I would make the ER diagram the next deliverable before building the first feature.
