# Frontend Engineering Guide

> **Project:** Leadership Through Self Transformation Website
>
> This document defines the engineering standards, architectural rules, and development philosophy for the frontend application.
>
> Every developer and AI agent working on this project must follow these guidelines before implementing new features.

---

# 1. Project Philosophy

The project prioritizes:

- Simplicity over complexity
- Readability over cleverness
- Maintainability over premature optimization
- Consistency over personal preference
- Reusability over duplication
- Mobile-first development
- Content-first design

This is primarily a public informational website.

Avoid introducing unnecessary abstractions or enterprise-level architecture unless explicitly required.

---

# 2. Development Principles

## Keep It Simple

When multiple solutions exist, choose the simplest one that satisfies the requirements.

Avoid over-engineering.

---

## One Responsibility

Every file should have one clear responsibility.

Examples

Navbar changes

→ Navbar component

Projects API changes

→ Project service

Hero text changes

→ content/home.js

Project card layout changes

→ ProjectCard component

---

## Reuse Before Creating

Before creating a new component, ask:

- Does something similar already exist?
- Can an existing component be extended?
- Is this really reusable?

Avoid duplicate components.

---

# 3. Mobile First

This project follows a Mobile First approach.

Always build the mobile experience first.

Desktop layouts should enhance—not replace—the mobile layout.

Example

✅

```jsx
flex-col
md:flex-row
```

❌

```jsx
flex-row
md:flex-col
```

---

# 4. Design System

The project uses a centralized Design System.

Refer to:

```
docs/DESIGN_SYSTEM.md
```

Developers must never hardcode

- Colors
- Fonts
- Border radius
- Shadows
- Typography
- Design tokens

All visual styling must use the predefined theme tokens.

---

# 5. Folder Responsibilities

## components/ui

Reusable primitive UI components.

Examples

- Button
- Card
- Badge
- Input
- Dialog

No business logic.

---

## components/layout

Layout components responsible for page structure.

Examples

- Navbar
- Footer
- Container
- Section
- Mobile Menu

---

## components/shared

Reusable components shared across features.

Examples

- LoadingState
- ErrorState
- EmptyState
- PageHeader
- StatisticCard

---

## pages

Pages compose sections.

Pages should not contain business logic.

Pages should remain small and readable.

---

## features

Feature-specific components.

Examples

```
features/
    home/
    projects/
    gallery/
    magazine/
    apply/
```

Business logic belongs here.

---

## content

Single source of truth for static content.

Examples

```
content/
    home.js
    course.js
    faq.js
    navigation.js
    footer.js
```

Never hardcode large blocks of text inside components.

---

## services

Responsible for all API communication.

Components must never directly perform HTTP requests.

Future structure

```
services/
    api/
        client.js

    project.service.js
    gallery.service.js
    statistics.service.js
```

---

## hooks

Reusable global hooks.

Examples

- useMediaQuery
- useScrollToTop
- useDebounce

Feature-specific hooks should live inside their feature folder.

---

## utils

Pure helper functions.

No React code.

No API calls.

---

## constants

Application constants.

Examples

- Routes
- Navigation keys
- Application constants

---

## assets

Images

Icons

Logos

Fonts

Illustrations

---

# 6. Component Guidelines

## Use a Single File When

The component

- is small
- has one responsibility
- contains no child components
- is under approximately 150 lines

Example

```
Button.jsx

StatisticCard.jsx
```

---

## Use a Folder When

The component

- has child components
- owns hooks
- owns utilities
- becomes large
- exceeds approximately 150–200 lines

Example

```
ApplicationForm/

    ApplicationForm.jsx

    EducationSection.jsx

    ReviewSection.jsx

    index.js
```

---

# 7. Code Standards

Always

- Use absolute imports
- Keep components focused
- Extract repeated JSX
- Use meaningful names
- Prefer composition
- Keep files small
- Write readable JSX

Avoid

- Deeply nested JSX
- Large components
- Duplicate logic
- Magic numbers
- Inline styles

---

# 8. Static vs Dynamic Content

Static content

↓

```
content/
```

Dynamic content

↓

API

Future APIs include

- Projects
- Gallery
- Magazine
- Statistics
- Applications
- Feedback

---

# 9. API Rules

Components must never perform API requests directly.

All API communication belongs inside the Service Layer.

Future implementation

```
Component

↓

React Query Hook

↓

Service Layer

↓

Axios Client

↓

Backend
```

---

# 10. Error Handling

When API integration begins, every API feature should support

- Loading State
- Empty State
- Error State

Reusable components should be used whenever possible.

---

# 11. Naming Conventions

Components

```
Navbar.jsx

ProjectCard.jsx

StatisticCard.jsx
```

Hooks

```
useProjects.js

useGallery.js
```

Services

```
project.service.js

gallery.service.js
```

Content

```
home.js

course.js

faq.js
```

---

# 12. AI Development Rules

AI assistants must follow the existing architecture.

They must NOT

- Move folders
- Rename folders
- Introduce Redux
- Introduce Context unnecessarily
- Introduce TypeScript
- Create unnecessary abstractions
- Create files that are not immediately useful
- Change project conventions

Instead

- Extend the existing architecture
- Reuse existing components
- Follow the Design System
- Keep implementations simple
- Follow project naming conventions

---

# 13. Architecture Protection Rule

The current project architecture is considered stable.

AI assistants must not redesign the architecture unless explicitly instructed.

When unsure,

extend the existing structure rather than introducing a new pattern.

---

# 14. Future Features

These are intentionally excluded from the initial prototype.

- Authentication
- Admin Dashboard
- CMS
- Internationalization
- Analytics
- SEO Enhancements

The architecture should allow these features to be added later without influencing the current implementation.

---

# 15. Golden Rules

Every developer should remember these principles.

1. Mobile First
2. Keep It Simple
3. Reuse Before Creating
4. One Responsibility Per File
5. No Hardcoded Content
6. No Hardcoded Theme Values
7. Pages Compose, Features Implement
8. Components Never Call APIs
9. Follow the Design System
10. Write Code That a Junior Developer Can Understand

---

# Final Principle

> Build for today's requirements while leaving room for tomorrow's growth.

The objective is not to create the most sophisticated architecture.

The objective is to create a codebase that is easy to understand, easy to maintain, and easy for any developer or AI assistant to contribute to consistently.