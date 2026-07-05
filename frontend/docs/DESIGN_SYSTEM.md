# Leadership Website - Design System v1

## Objective

The goal of this document is to establish the foundational design system for the Leadership Through Self Transformation website.

This project is a content-first website. The focus is readability, maintainability, consistency and ease of development rather than flashy UI.

This design system should be treated as the single source of truth for all visual decisions.

---

# Core Design Philosophy

The website should feel:

- Calm
- Elegant
- Professional
- Trustworthy
- Spacious
- Easy to Read

Avoid:

- Heavy animations
- Bright gradients everywhere
- Startup-style UI
- Visual clutter
- Overly rounded designs

The content should always remain the primary focus.

---

# Mobile First (Highest Priority)

This project follows a Mobile First approach.

Every component should first be designed for mobile.

Responsive breakpoints should progressively enhance the layout for tablets and desktops.

Never build desktop first.

Recommended Tailwind Breakpoints

Mobile
Default (<640px)

Tablet
sm

Laptop
lg

Desktop
xl

---

# Theme Configuration

The entire theme must be configurable from one place.

Use Tailwind + shadcn semantic color tokens.

Never hardcode Tailwind colors inside components.

Example

❌ text-purple-700

✅ text-primary

Changing the brand color should require modifying only one location.

---

# Color Palette

Create semantic colors only.

Do NOT use direct color names inside components.

Required Tokens

primary

secondary

accent

background

surface

foreground

muted

muted-foreground

border

ring

destructive

success

warning

info

Current Design Intent

Primary

Royal Purple

Secondary

Soft Lavender

Accent

Warm Orange

Background

White

Surface

Very Light Gray

Muted

Soft Gray

Foreground

Dark Gray

---

# Gradient Usage

Gradients should be used very sparingly.

Allowed

- Highlight Cards
- Statistics Cards
- Feature Cards

Gradient

Light Pink

↓

Light Purple

↓

Soft Orange

Never use gradients on

- Navbar
- Footer
- Buttons
- Entire page backgrounds

---

# Typography

Font Family

Headings

Poppins

Body

Inter

Import fonts using Google Fonts.

---

# Typography Scale

Hero

Mobile

text-4xl

Tablet

text-5xl

Desktop

text-6xl

Page Heading

text-3xl

md:text-4xl

lg:text-5xl

Section Heading

text-2xl

md:text-3xl

lg:text-4xl

Card Heading

text-xl

md:text-2xl

Body

text-base

md:text-lg

Small Text

text-sm

Caption

text-xs

Developers should never invent new font sizes unless approved.

---

# Container

Create a reusable Container component.

Every page must use it.

Container Rules

Mobile

100% width

16px horizontal padding

Tablet

24px horizontal padding

Desktop

Maximum Width

1280px

32px horizontal padding

Never use random max-width classes.

---

# Section Component

Create a reusable Section component.

Every major section should use this component.

Section Padding

Mobile

py-12

Tablet

py-16

Desktop

py-24

---

# Spacing System

Use Tailwind spacing scale only.

Preferred spacing

2

4

6

8

12

16

Avoid arbitrary spacing values.

Never use

mt-[17px]

unless absolutely necessary.

---

# Border Radius

Default

rounded-xl

Large Cards

rounded-2xl

Avoid mixing many radius values.

---

# Shadows

Default

shadow-sm

Hover

shadow-md

Avoid

shadow-xl

shadow-2xl

unless explicitly required.

---

# Buttons

Use shadcn Button component.

Create variants

Primary

Secondary

Outline

Ghost

Primary Buttons

Brand Purple

Hover

Slightly darker purple

Transition

Orange should NOT be the primary button color.

---

# Hover Effects

Allowed

Color transition

Underline animation

Soft shadow

Small scale

Forbidden

Bounce

Rotation

Large transforms

Long animations

---

# Cards

Cards should feel clean.

Default

rounded-xl

shadow-sm

Optional Gradient

Hover

shadow-md

---

# Accessibility

Minimum touch target

44px

All images require alt text.

Buttons require focus states.

Maintain proper color contrast.

---

# Responsive Priority

Target Users

70%

Mobile

20%

Laptop/Desktop

10%

Tablet

The design should always prioritize the mobile experience.

---

# Design Tokens

Every component must consume semantic design tokens.

Never use raw colors.

Never use arbitrary spacing.

Never use arbitrary typography.

The design system should be easy to evolve by modifying one configuration.

---

# Expected Output

The implementation should configure

- Tailwind theme
- shadcn theme
- CSS variables
- Global styles
- Fonts
- Container component
- Section component

All future UI should automatically inherit these settings.