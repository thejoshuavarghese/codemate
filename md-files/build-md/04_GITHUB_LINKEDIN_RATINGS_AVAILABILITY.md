# Workstream 4 — GitHub, LinkedIn, Availability & Ratings

## Owner

Developer 4

## Goal

Add credibility and collaboration signals to profiles without building heavy integrations.

## Own these areas

```text
lib/github/
app/profile/
components/profile/
ratings/
availability/
```

Coordinate with Developer 1 because profile rendering is shared.

## Priority order

If time gets tight:

```text
1. GitHub username + recent public activity
2. LinkedIn URL
3. Availability for selected date
4. Ratings
5. Fancy GitHub charts
```

Do not sacrifice the core swipe/match flow.

# GitHub

## MVP approach

Do NOT implement GitHub OAuth.

Ask user for their GitHub username.

Example:

```text
GitHub username:
arjunkumar
```

Fetch public data from GitHub's API server-side.

Display:

```text
GitHub
@arjunkumar

Repositories: 24
Followers: 128
Recent commits: 18
Primary languages:
Python · TypeScript · Go

[View GitHub]
```

## Important

GitHub commit count is a signal, not a skill score.

Do not say:

```text
18 commits = expert
```

Instead:

```text
Active GitHub contributor
```

## API

Create:

```text
GET /api/github/:username
```

Server-side only.

Cache the result briefly to avoid rate limits.

Suggested normalized response:

```ts
type GithubSummary = {
  username: string
  avatarUrl: string
  publicRepos: number
  followers: number
  recentCommits: number
  languages: string[]
  lastActivityAt: string | null
}
```

If GitHub fails, profile still works.

Show:

```text
GitHub activity unavailable
```

Do not fail the entire profile.

# LinkedIn

MVP:

```text
linkedin_url
```

Store the user's LinkedIn URL.

Render:

```text
LinkedIn
[View profile]
```

Do not scrape LinkedIn.

Do not build LinkedIn OAuth during the five-hour sprint.

# Availability

The original product wants calendar availability.

For the five-hour MVP, implement explicit availability instead of OAuth.

User chooses:

```text
October 17
🟢 Available
```

or:

```text
October 17
🔴 Busy
```

The selected intent references that date.

Candidate card shows:

```text
🟢 Available Oct 17
```

or:

```text
🔴 Unavailable Oct 17
```

If calendar integration is later added, preserve the same API contract:

```ts
type Availability = {
  date: string
  status: "available" | "busy" | "unknown"
}
```

Then Google/Outlook can become the implementation behind it.

# Ratings

Ratings are allowed only after a matched collaboration date has passed.

For MVP, a rating can be submitted manually after the date.

Fields:

```text
rating: 1..5
review: optional
```

Display:

```text
⭐ 4.7
18 ratings
```

New users:

```text
New member
No ratings yet
```

Do NOT display:

```text
⭐ 0
```

because zero looks like a bad rating.

## Rating API

```text
POST /api/ratings
```

Payload:

```json
{
  "matchId": "...",
  "revieweeId": "...",
  "rating": 5,
  "review": "Great teammate."
}
```

Server verifies:

```text
authenticated reviewer
match membership
reviewee is other participant
date has passed
one rating per reviewer/reviewee/match
```

## Rating aggregation

Simple average is acceptable for MVP.

Later consider Bayesian weighting because:

```text
5.0 from 1 rating
```

should not necessarily outrank:

```text
4.8 from 40 ratings
```

But do not spend the five-hour sprint implementing sophisticated reputation math.

# Profile evidence section

Render:

```text
GitHub
✓ Connected

LinkedIn
✓ Added

Rating
⭐ 4.7 · 18 ratings

Availability
🟢 Available for selected date
```

These are evidence/signals, not endorsements.

# Acceptance tests

GitHub:
- Username can be saved.
- Public GitHub data appears.
- GitHub failure does not break profile.

LinkedIn:
- URL saves.
- Link opens correctly.

Availability:
- User can mark selected date available/busy.
- Discovery can read availability.
- No private calendar details are exposed.

Ratings:
- Eligible match can be rated.
- Duplicate rating is rejected.
- Rating appears on profile.
- New users show no rating instead of 0.

# Stretch goal: real calendar

Only attempt this if the entire core app already works.

Possible future flow:

```text
Google OAuth
   ↓
Free/busy API
   ↓
Normalize to Availability
   ↓
Cache briefly
   ↓
Show available/busy only
```

Never expose event titles or attendees.

Do not let calendar integration block the demo.
