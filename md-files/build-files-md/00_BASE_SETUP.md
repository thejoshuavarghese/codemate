# HackMatch — Base Setup, Demo Mode & Shared UI Contract

## Goal
4 developers, 5 hours. Build a Tinder-style web app for finding hackathon partners.

**No event management:** no organizers, event creation, registration, judging, submissions, or official team management.

Core flow:
`Profile → Hackathon intent/date → Discover → Pass/Interest → Mutual Match → Chat → Rate`

## Stack
- Next.js App Router + TypeScript
- Supabase: Auth, PostgreSQL, RLS, Storage, Realtime
- PostGIS for geospatial queries
- Tailwind CSS + shadcn/ui
- Lucide icons
- Vercel
- GitHub public API
- LinkedIn URL only for MVP
- Explicit availability for MVP; real calendar OAuth is stretch

Do **not** add Express, MongoDB, Redis, microservices, custom auth, or a custom websocket server.

## Repo structure
```text
app/
  (auth)/login/ signup/
  onboarding/
  discover/
  matches/
  swipes/
  chat/[matchId]/
  profile/
  settings/
components/
  ui/
  layout/
  profile/
  discovery/
  matches/
  chat/
lib/
  supabase/
  repositories/
  demo/
  github/
  matching/
  validation/
types/index.ts
supabase/migrations/
public/
```

## Independent development is mandatory

Every feature must run without another unfinished feature.

Use:
```text
UI → repository interface → DemoRepository OR SupabaseRepository
```

Set:
```env
NEXT_PUBLIC_DEMO_MODE=true
```

Demo mode uses deterministic seed data. Real mode uses Supabase.

Create:
```text
lib/demo/
  profiles.ts
  intents.ts
  swipes.ts
  matches.ts
  messages.ts
  ratings.ts
```

Demo identities:
`demo-alice`, `demo-bob`, `demo-charlie`, `demo-diana`, `demo-erin`, `demo-frank`

Seed at least one match:
`demo-match-1` = Alice ↔ Bob

## Shared types
Keep domain types in `types/index.ts`. Do not redefine them per feature.

```ts
type Mode = "in_person" | "online" | "either"
type AvailabilityStatus = "available" | "busy" | "unknown"
type SwipeAction = "pass" | "interest"
```

## Core DB tables
```text
profiles
skills
user_skills
interests
user_interests
partner_intents
availability
swipes
matches
messages
ratings
blocks
reports
github_activity
```

There are **no event-management tables**.

### profiles
```sql
id uuid primary key references auth.users(id)
display_name text not null
username text unique
bio text
avatar_url text
city text
locality text
location geography(Point,4326)
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

### availability
```sql
id uuid primary key
user_id uuid references profiles(id)
available_date date not null
status text check (status in ('available','busy'))
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
Unique: `(intent_id, swiper_id, target_user_id)`

### matches
```sql
id uuid primary key
intent_id uuid references partner_intents(id)
user_a_id uuid references profiles(id)
user_b_id uuid references profiles(id)
created_at timestamptz default now()
```
Add a uniqueness constraint for normalized user pair + intent.

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

## Security
- Frontend visibility is not authorization.
- Users can modify only their own profile.
- Users can swipe only as themselves.
- Only match members can read/send messages.
- Only eligible collaborators can rate.
- Blocks remove interaction.
- Never expose exact coordinates.
- Never expose private calendar details.
- Never expose Supabase service-role keys client-side.

## Shared UI design system — mandatory

The whole app must look like one product.

### Direction
Modern, dark, minimal, premium developer-tool aesthetic:
- dark background
- high-contrast typography
- subtle borders
- rounded cards
- restrained accent
- minimal gradients

Avoid glassmorphism, random gradients, cartoon styling, excessive shadows, and page-specific visual systems.

### Tokens
```text
Background #09090B
Card #111113
Elevated #18181B
Border #27272A
Primary text #FAFAFA
Secondary #A1A1AA
Muted #71717A
Accent #8B5CF6
Success #22C55E
Danger #EF4444
Warning #F59E0B
```
Put these in global CSS variables; do not scatter hex values through components.

### Typography
Use Geist (Next default) or Inter. Pick one and keep it everywhere.
- Page title: 28–32px semibold
- Section title: 18–20px semibold
- Card title: 18px semibold
- Body: 14–16px
- Metadata: 12–13px

### Components
Use shadcn/ui shared components. Standard:
- cards: `rounded-2xl`
- buttons/inputs: `rounded-xl`
- tags: `rounded-full`
- avatars: `rounded-full`
- consistent `p-4/p-5/p-6`, `gap-3/gap-4/gap-6`

Use Lucide only for icons.

### Navigation
Desktop: shared top navigation.
Mobile: `Discover | Matches | Swipes | Profile`

### Candidate card order
`Image → Name/verification → Rating → Distance → Headline → Bio → Skills → Interests → Looking for → GitHub/LinkedIn → Availability → Actions`

Do not reorder fields per feature.

## Repository interfaces
Example:
```ts
interface ProfileRepository {
  getProfile(userId: string): Promise<Profile>
  updateProfile(profile: Profile): Promise<void>
}
interface DiscoveryRepository {
  getCandidates(intentId: string): Promise<Candidate[]>
}
interface MessageRepository {
  getMessages(matchId: string): Promise<Message[]>
  sendMessage(input: SendMessageInput): Promise<Message>
}
```

Each feature has demo and real implementations.

## Git workflow
Branches:
`feature/profile`, `feature/discovery`, `feature/chat`, `feature/integrations`

Before PR:
```bash
npm run lint
npm run build
```

Merge order:
`base/schema → profile → discovery → chat → integrations`

## Five-hour plan
`0:00–0:30 base/schema/design → 0:30–2:45 parallel → 2:45–3:30 integration → 3:30–4:15 E2E → 4:15–4:45 bug/demo data → 4:45–5:00 deploy/rehearse`

## Definition of done
A demo user can:
`Sign up → Profile → Date → Availability → Discover → GitHub/LinkedIn → Interest → Match → Chat → Rating`
