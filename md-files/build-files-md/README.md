# HackMatch — 5-Hour Build Pack

## Goal
Build a Tinder-style hackathon partner finder, not an event-management platform.

## Stack
Next.js + TypeScript + Supabase + PostgreSQL/PostGIS + Tailwind + shadcn/ui + Vercel.

## Independent development
Set:
```env
NEXT_PUBLIC_DEMO_MODE=true
```

Each developer gets seeded data and repository abstractions so their route works independently.

## Workstreams
- Developer 1 → `01_PROFILE_AUTH_ONBOARDING.md`
- Developer 2 → `02_DISCOVERY_MATCHING_SWIPES.md`
- Developer 3 → `03_MATCHES_CHAT.md`
- Developer 4 → `04_GITHUB_LINKEDIN_RATINGS_AVAILABILITY.md`

## Shared contract
Read `00_BASE_SETUP.md` first. It is authoritative for:
- database model
- shared types
- repository boundaries
- demo mode
- UI design system
- security rules
- Git workflow

## Branches
```text
feature/profile
feature/discovery
feature/chat
feature/integrations
```

## Before PR
```bash
npm run lint
npm run build
```

## Demo path
```text
signup
→ profile
→ date
→ availability
→ discover
→ interest
→ mutual match
→ chat
→ rating
```

If the core path works, stop adding features.
