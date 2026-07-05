# Leadership Course Website - Frontend Architecture

## Overview

This project is the frontend for a Leadership Through Self Transformation course website.

The frontend should be simple, maintainable, and easy for junior developers to understand. This is **not** a SaaS application or dashboard. It is primarily a public-facing content website.

The architecture should prioritize readability over abstraction.

---

# Goals

- Easy to understand within 15 minutes
- Consistent folder structure
- Easy to add new pages
- Easy to update content
- Easy to migrate static content to APIs later
- Avoid over-engineering
- Keep business logic separated from UI

---

# Tech Stack

- React
- React Router
- Tailwind CSS
- shadcn/ui
- React Query
- Axios
- React Hook Form
- JavaScript (No TypeScript)

---

# Architecture Principles

## 1. UI should never know where data comes from.

A component should consume data through hooks.

Good

HomePage
→ useHomeContent()

Bad

HomePage
→ axios.get()

---

## 2. Separate Static Content from Dynamic Content

Static content is owned by the frontend.

Dynamic content is owned by Django.

---

## Static Content

Static content includes:

- Homepage copy
- Course details
- FAQ
- Contact information
- Navigation
- Footer
- Labels
- Static sections

Static content should live inside

src/content/

Split content into multiple files.

Never create one large content.js file.

Example

content/
    home.js
    faq.js
    course.js
    contact.js
    navigation.js
    footer.js

---

## Dynamic Content

Initially these should be API-ready.

- Projects
- Gallery
- Magazine
- Statistics
- Course Applications
- Feedback

These should use

Component
→ Hook
→ Service
→ API Client

---

# Folder Philosophy

Feature-specific code stays inside its feature.

Reusable UI stays inside shared components.

Avoid dumping everything inside components/.

---

# Components

Small reusable components

components/ui/

Examples

Button
Card
Badge
Accordion
Loader

Layout components

components/layout/

Examples

Navbar
Footer
Container
Section
PageHeader

Large feature-specific components

features/home/components/

features/projects/components/

etc.

---

# Hooks

Hooks should hide the implementation.

Today

return static content

Tomorrow

return React Query data

The component should never change.

---

# Services

Every API should have a service.

Example

project.service.js

Only services communicate with Axios.

---

# API Layer

Create a single Axios client.

No component may import Axios directly.

---

# React Query

Create feature hooks.

Example

useProjects()

useGallery()

useStatistics()

Never call React Query directly inside pages.

---

# Forms

Use

React Hook Form

---

# Images

Do not hardcode URLs.

Use assets for local images.

Dynamic images should later come from Django.

---

# Import Convention

Always use absolute imports.

Example

@/components/ui/Button

Never

../../../Button

---

# Coding Philosophy

Prefer explicit code.

Avoid unnecessary abstraction.

Create folders only when needed.

A new developer should understand the project quickly.

Readability is more important than saving a few lines of code.
