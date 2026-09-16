# HackMatch — Base Setup & Shared Contract

## Goal

Build a Tinder-style hackathon-partner discovery app in 5 hours with 4 developers.

**Product boundary:** We do NOT manage hackathons. There are no organizers, event creation, registrations, submissions, judging, or event-management screens.

The user creates a temporary **hackathon intent**:

- date
- in-person/online
- location
- what skills they have
- what skills they want in a partner

Then they swipe through compatible people. A mutual interest creates a match. Messaging is allowed only after the match and only in the context of the selected hackathon date.

## Tech stack

Use one web app and one managed backend:

- **Next.js App Router + TypeScript**
- **Supabase** for Auth + PostgreSQL + Realtime + Storage
- **PostGIS** for location queries
- **Tailwind CSS + shadcn/ui** for UI
- **Lucide** for icons
- **Vercel** for deployment
- **GitHub public API** for GitHub profile/recent activity
- **LinkedIn URL** stored on profile for MVP
- **External calendar OAuth is NOT required for the 5-hour MVP.** Use explicit availability for the selected date. Calendar integration is a stretch goal.

Supabase officially provides a Next.js starter with cookie-based Auth, TypeScript, and Tailwind. Supabase also supports PostGIS for indexed geospatial queries. See:
- https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- https://supabase.com/docs/guides/database/extensions/postgis

## Why this stack

Do NOT build:

- Express backend
- separate React frontend
- separate PostgreSQL server
- Redis
- microservices
- custom auth
- custom WebSocket server

You only have 5 hours. Those choices create deployment and integration work without improving the demo.

Supabase gives us database, auth, storage, RLS, and realtime in one place.

## Repository structure

```text
hackmatch/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── onboarding/
│   ├── discover/
│   ├── matches/
│   ├── swipes/
│   ├── chat/
│   │   └── [matchId]/
│   ├── profile/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── profile/
│   ├── discovery/
│   ├── matches/
│   └── chat/
├── lib/
│   ├── supabase/
│   ├── github/
│   ├── matching/
│   ├── validation/
│   └── utils.ts
├── types/
│   └── database.ts
├── supabase/
│   └── migrations/
│       └── 001_initial.sql
├── public/
├── .env.example
├── package.json
└── README.md
```

## Shared database model

Use these core tables:

```text
profiles
skills
user_skills
interests
user_interests
partner_intents
swipes
matches
messages
ratings
blocks
reports
github_activity
```

Do NOT create event-management tables.

### profiles

```sql
id uuid primary key references auth.users(id)
display_name text not null
username text unique
bio text
avatar_url text
city text
locality text
location geography(Point, 4326)
linkedin_url text
github_username text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### partner_intents

```sql
id uuid primary key
user_id uuid references profiles(id)
hackathon_date date not null
mode text check (mode in ('in_person','online','either'))
location_text text
is_active boolean default true
created_at timestamptz default now()
```

### swipes

```sql
id uuid primary key
intent_id uuid references partner_intents(id)
swiper_id uuid references profiles(id)
target_user_id uuid references profiles(id)
action text check (action in ('pass','interest'))
created_at timestamptz default now()
```

Enforce:

```text
unique(intent_id, swiper_id, target_user_id)
```

### matches

```sql
id uuid primary key
intent_id uuid references partner_intents(id)
user_a_id uuid references profiles(id)
user_b_id uuid references profiles(id)
created_at timestamptz default now()
```

Normalize the user pair so A/B and B/A cannot create duplicate matches.

### messages

```sql
id uuid primary key
match_id uuid references matches(id)
sender_id uuid references profiles(id)
body text not null
created_at timestamptz default now()
```

### ratings

```sql
id uuid primary key
match_id uuid references matches(id)
reviewer_id uuid references profiles(id)
reviewee_id uuid references profiles(id)
rating integer check (rating between 1 and 5)
review text
created_at timestamptz default now()
```

### availability

For the 5-hour MVP, add:

```sql
user_id uuid references profiles(id)
available_date date not null
status text check (status in ('available','busy'))
```

This is a product simplification. Do not pretend this is real calendar synchronization.

## Matching contract

Discovery should call:

```ts
getCandidates(intentId: string): Promise<Candidate[]>
```

Candidate ranking should consider:

1. skill complementarity
2. shared interests
3. location distance
4. selected-date availability
5. GitHub activity
6. rating
7. recent activity

For the demo, a simple weighted score is enough:

```text
25% skills
20% interests
15% role/skill complementarity
15% location
10% availability
5% GitHub activity
5% rating
5% recent activity
```

Make the implementation easy to change.

## Critical security rules

- Never trust the frontend for authorization.
- Users can only edit their own profile.
- Users can only create swipes for themselves.
- Messaging requires a valid mutual match.
- Ratings require a valid match.
- Blocked users cannot appear in discovery.
- Do not expose exact coordinates.
- Do not expose private calendar data.
- Never put Supabase service-role keys in browser code.
- Validate all user input.

## Shared UX

Bottom navigation:

```text
Discover | Matches | Swipes | Profile
```

Main discovery card:

```text
photo
name
rating
distance
bio
skills
interests
GitHub
LinkedIn
availability
```

Actions:

```text
PASS     INTEREST
```

## Git workflow

Before coding:

```bash
git clone <repo>
cd hackmatch
npm install
```

Each developer works on a branch:

```text
feature/profile
feature/discovery
feature/messaging
feature/integrations
```

Do NOT edit the same files unnecessarily.

Before merge:

```bash
npm run lint
npm run build
```

Commit small, working changes.

## Five-hour execution plan

### Hour 0–0.5
Everyone pulls repo, installs dependencies, verifies Supabase env.

### Hour 0.5–1
Base schema + shared UI + auth.

### Hour 1–3
Parallel feature development.

### Hour 3–4
Integration.

### Hour 4–4.5
Bug fixing + seed/demo data.

### Hour 4.5–5
Deployment + demo rehearsal.

## Definition of done

A demo user can:

1. Sign up.
2. Create a profile.
3. Select a hackathon date.
4. Set availability.
5. See nearby compatible people.
6. See GitHub/LinkedIn.
7. Pass or interest.
8. Get a mutual match.
9. Open chat only after match.
10. Send a message.
11. Rate a collaborator.

If a feature is not required for this path, it is lower priority.
