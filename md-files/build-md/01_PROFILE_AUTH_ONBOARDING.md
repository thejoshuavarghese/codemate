# Workstream 1 — Auth, Profile & Onboarding

## Owner

Developer 1

## Goal

Build the complete user identity/profile flow so the other three developers can assume an authenticated user with a complete profile.

## Own these areas

```text
app/(auth)/
app/onboarding/
app/profile/
components/profile/
lib/supabase/
```

Avoid changing discovery, chat, or matching components unless required by a shared type.

## Features

### 1. Authentication

Implement:

- Email/password signup
- Login
- Logout
- Auth session persistence
- Redirect unauthenticated users to `/login`

Use Supabase Auth.

Do not build JWT handling manually.

### 2. Profile creation

Fields:

```text
display_name
username
bio
avatar
city
locality
github_username
linkedin_url
skills
interests
```

### 3. Skills

Use a fixed seed list for the MVP.

Example:

```text
React
Next.js
Node.js
Python
Java
Go
Rust
C++
Machine Learning
AI
DevOps
Cloud
Cybersecurity
UI/UX
Product
```

Store IDs, not arbitrary display strings.

### 4. Interests

Seed:

```text
AI
FinTech
HealthTech
Climate
Web3
Cybersecurity
Robotics
Gaming
Developer Tools
Open Source
Education
```

### 5. Location

For the 5-hour demo, collect:

```text
city
locality
```

Optionally collect browser geolocation and store approximate coordinates.

Never show exact coordinates.

If browser geolocation is rejected, the profile still works.

### 6. Intent creation

After profile creation, user creates:

```text
hackathon_date
mode
location_text
availability
```

Modes:

```text
in_person
online
either
```

Availability:

```text
available
busy
```

The intent must be active before discovery works.

## UI

Onboarding should be short.

Do not create a 12-step wizard.

Suggested:

```text
Step 1 — About you
Step 2 — Skills + interests
Step 3 — GitHub + LinkedIn
Step 4 — Hackathon date + availability
```

Use shadcn components.

## Validation

Required:

```text
display_name
at least 1 skill
at least 1 interest
hackathon_date
availability
```

Optional:

```text
bio
avatar
GitHub
LinkedIn
```

Validate LinkedIn URL if present.

Validate GitHub username format.

## Acceptance tests

- New user can register.
- User can log in/out.
- Profile survives refresh.
- Profile can be edited.
- Avatar uploads to Supabase Storage.
- Skills/interests persist.
- Intent persists.
- Other developers can query the profile and intent.

## Shared contract

Export/use:

```ts
type Profile = {
  id: string
  display_name: string
  username: string | null
  bio: string | null
  avatar_url: string | null
  city: string | null
  locality: string | null
  linkedin_url: string | null
  github_username: string | null
}

type PartnerIntent = {
  id: string
  user_id: string
  hackathon_date: string
  mode: "in_person" | "online" | "either"
  location_text: string | null
  is_active: boolean
}
```

## Do not build

- Event management
- Organizer accounts
- Team management
- Calendar OAuth
- Chat
- Recommendation algorithm
