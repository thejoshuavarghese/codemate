# HackMatch 5-Hour Build Pack

Files:

- `00_BASE_SETUP.md` — shared architecture, schema, repo contract, and sprint plan
- `01_PROFILE_AUTH_ONBOARDING.md` — Developer 1
- `02_DISCOVERY_MATCHING_SWIPES.md` — Developer 2
- `03_MATCHES_CHAT.md` — Developer 3
- `04_GITHUB_LINKEDIN_RATINGS_AVAILABILITY.md` — Developer 4

## Recommended branch plan

```text
main
├── feature/profile
├── feature/discovery
├── feature/chat
└── feature/integrations
```

## First 30 minutes

One person creates the Next.js/Supabase project and commits the base scaffold.

Everyone then clones/pulls the same repository and works on their assigned branch.

## Merge order

1. Base/schema
2. Profile/auth
3. Discovery
4. Matches/chat
5. Integrations/ratings

Resolve conflicts by keeping the shared database/types contract in `00_BASE_SETUP.md` authoritative.

## MVP rule

If something is not required for:

```text
signup → profile → intent/date → discover → interest → match → chat
```

it is secondary.

Do not spend the final hour polishing edge features while the core path is broken.
