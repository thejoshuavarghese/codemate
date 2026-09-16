# Workstream 2 — Discovery, Matching & Swipes

## Owner

Developer 2

## Goal

Build the Tinder-style discovery experience and mutual-match logic.

## Own these areas

```text
app/discover/
app/swipes/
components/discovery/
lib/matching/
```

## Core flow

```text
Current user's active intent
        ↓
Fetch eligible candidates
        ↓
Rank candidates
        ↓
Display one card
        ↓
PASS / INTEREST
        ↓
Persist swipe
        ↓
Check reciprocal interest
        ↓
Create match
```

## Candidate eligibility

Exclude:

```text
current user
blocked users
users who blocked current user
inactive intents
users with incompatible date
users already swiped for this intent
```

Do not expose exact location.

## Candidate card

Show:

```text
avatar
name
rating
distance
bio
top skills
interests
looking-for skills
GitHub activity
GitHub link
LinkedIn link
availability
```

Example:

```text
Arjun
⭐ 4.6 · 18 ratings

📍 3.4 km away

ML Engineer

Python · PyTorch · AWS

AI · Developer Tools

Looking for:
Frontend · UI/UX

GitHub:
1,200 contributions

🟢 Available Oct 17
```

## Ranking

Implement a simple deterministic score first.

```ts
score =
  skillScore * 0.25 +
  interestScore * 0.20 +
  complementScore * 0.15 +
  locationScore * 0.15 +
  availabilityScore * 0.10 +
  githubScore * 0.05 +
  ratingScore * 0.05 +
  activityScore * 0.05
```

Every component must be normalized to `0..1`.

### Skill score

Calculate overlap between the candidate's skills and the current user's desired skills.

### Complement score

Reward candidates whose skills fill gaps in the current user's profile.

Example:

```text
User:
backend + ML

Looking for:
frontend

Candidate:
frontend + React
```

High complement score.

### Interest score

Use Jaccard similarity:

```text
intersection / union
```

### Location score

For in-person:

```text
0-2km   = 1.0
2-5km   = 0.8
5-15km  = 0.6
15-30km = 0.3
30km+   = 0.1
```

For online, location should contribute little or zero.

## Swipe endpoint

Implement:

```text
POST /api/swipes
```

Payload:

```json
{
  "intentId": "...",
  "targetUserId": "...",
  "action": "interest"
}
```

Server must derive the authenticated user from Supabase auth.

Never accept:

```json
{
  "swiperId": "..."
}
```

from the browser as authoritative identity.

## Mutual match

After inserting an `interest` swipe:

1. Search for reciprocal interest.
2. Confirm same intent/date context.
3. Create match.
4. Return match status.

Response:

```json
{
  "matched": true,
  "matchId": "..."
}
```

or:

```json
{
  "matched": false
}
```

## Database race condition

Two users can like each other at nearly the same time.

Do not rely only on:

```text
if reciprocal then insert match
```

Use a database unique constraint for normalized user pair + intent.

## Swipe history

Create UI:

```text
/swipes
```

Tabs:

```text
Interested
Passed
Matched
```

## UX

Use buttons as the reliable interaction:

```text
✕ Pass
♥ Interested
```

Optional drag/swipe gesture is nice, but do not waste the five-hour window debugging gesture physics.

## Acceptance tests

- Discovery loads candidates.
- Current user never appears.
- Blocked users never appear.
- Candidates are ranked.
- Pass persists.
- Interest persists.
- Reciprocal interest creates exactly one match.
- Duplicate requests do not create duplicate matches.
- Swipes appear in history.
- Match appears in Matches.

## Do not build

- Event creation
- Organizer functionality
- AI/LLM matching
- Complex ML recommendation model
- Infinite-scroll optimization
- Super-like
- Paid boosts
