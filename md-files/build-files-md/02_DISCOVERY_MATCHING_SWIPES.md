# Workstream 2 — Discovery, Matching & Swipes

**Owner:** Developer 2

## Own
`app/discover/`, `app/swipes/`, `components/discovery/`, `lib/matching/`

## Independent test
With `NEXT_PUBLIC_DEMO_MODE=true` and current user `demo-alice`, `/discover` immediately shows seeded candidates. Do not depend on Developer 1's finished UI.

## Candidate card
Show:
`avatar, name, rating, distance, headline, bio, skills, interests, looking-for, GitHub, LinkedIn, availability`

Actions:
`Pass`, `Interest`

Use buttons even if drag gestures are added.

## Candidate repository
```ts
interface DiscoveryRepository {
  getCandidates(intentId: string): Promise<Candidate[]>
}
```
Implement demo + Supabase versions.

## Ranking
Start deterministic:
```text
25% skills
20% interests
15% complementarity
15% location
10% availability
5% GitHub activity
5% rating
5% recent activity
```
Normalize each component to 0..1.

Complementarity matters: backend+ML looking for frontend should strongly match a frontend+React candidate.

For in-person:
`0–2km 1.0, 2–5km .8, 5–15km .6, 15–30km .3, 30km+ .1`
For online, location contributes little/zero.

## Why this person
Show 2–4 deterministic reasons:
`3.4 km away`, `available`, `skills complement`, `shared AI interest`.

No LLM.

## Swipe
`POST /api/swipes`
```json
{"intentId":"...","targetUserId":"...","action":"interest"}
```
Derive swiper from authenticated session. Never trust a client-provided swiper ID.

## Match
After an interest:
`find reciprocal interest → same intent → create match`
Return `{matched, matchId?}`.

Use DB uniqueness constraints so simultaneous likes cannot create duplicate matches.

## Demo data
Seed varied users:
- nearby + complementary + available
- nearby + unavailable
- new user/no rating
- farther + excellent compatibility

Seed `demo-alice ↔ demo-bob` for chat testing.

## Acceptance
Discovery, exclusion, ranking, pass, interest, swipe history, reciprocal match, duplicate prevention, reason display, mobile layout.

## Do NOT build
Chat, GitHub API, calendar OAuth, ratings, event management, AI matching, super likes, paid boosts.
