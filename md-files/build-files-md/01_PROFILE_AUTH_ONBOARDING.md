# Workstream 1 — Auth, Profile & Onboarding

**Owner:** Developer 1

## Own
`app/(auth)/`, `app/onboarding/`, `app/profile/`, `app/settings/`, `components/profile/`, `lib/supabase/`

## Independent test
With `NEXT_PUBLIC_DEMO_MODE=true`, `/onboarding` and `/profile` must work without discovery, chat, GitHub API, or calendar.

## Build
### Auth
Supabase email/password signup, login, logout, persistent session, protected routes. No custom JWT system.

### Profile
Fields:
`display_name, username, bio, avatar, city, locality, github_username, linkedin_url, skills, interests`

Required: name + 1 skill + 1 interest.

### Intent
Create:
`hackathon_date, mode, location_text, availability`

Modes: `in_person | online | either`
Availability: `available | busy`

This is a partner intent, **not an event**.

## UI
Follow `00_BASE_SETUP.md` exactly. Do not invent colors, fonts, icons, radii, or buttons.

Keep onboarding to four logical screens:
`About → Skills/Interests → GitHub/LinkedIn → Date/Availability`

## Repository
Use `ProfileRepository` and `IntentRepository`.
Demo implementations must work without Supabase auth.

## Validation
Reject invalid URLs, malformed usernames, past dates, invalid enums, and oversized text.

## Acceptance
- signup/login/logout
- demo mode
- profile create/edit/persist
- avatar
- skills/interests
- intent/date/availability
- responsive UI

## Do NOT build
Discovery, swiping, chat, ratings, GitHub API, calendar OAuth, event management.
