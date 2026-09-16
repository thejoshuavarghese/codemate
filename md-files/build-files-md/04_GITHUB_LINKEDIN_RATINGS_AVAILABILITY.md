# Workstream 4 — GitHub, LinkedIn, Availability & Ratings

**Owner:** Developer 4

## Own
`lib/github/`, profile evidence components, ratings, availability integration.

## Independent test
Demo profile/candidate data must render GitHub, LinkedIn, availability, and rating without waiting for other branches.

## GitHub — MVP
Do NOT implement OAuth.

Store a GitHub username and fetch public data server-side. Cache it.

Display:
`@username, repositories, followers, recent commits/activity, languages, View GitHub`

Repository:
```ts
interface GithubRepository {
  getSummary(username: string): Promise<GithubSummary>
}
```

Demo + real implementations.

GitHub activity is evidence of activity, not a skill score. Never imply `commit count = expertise`.

If API fails, show `GitHub activity unavailable`; profile must still work.

## LinkedIn — MVP
Store `linkedin_url` and render `View LinkedIn`.
Do NOT scrape LinkedIn or build LinkedIn OAuth during the sprint.

## Availability
MVP uses explicit date availability:
`available | busy`

Shared contract:
```ts
type Availability = {
  date: string
  status: "available" | "busy" | "unknown"
}
```

Real calendar OAuth is a stretch goal only after the core path works.

Never expose meeting titles, attendees, descriptions, or private events.

## Ratings
Only allow a rating when:
`valid match + same hackathon intent/date + date has passed`

API:
`POST /api/ratings`
```json
{"matchId":"...","revieweeId":"...","rating":5,"review":"Great teammate."}
```

Server verifies reviewer membership, reviewee, date, and duplicate-rating constraint.

Display:
`⭐ 4.7 · 18 ratings`
New users:
`New member · No ratings yet`

MVP uses simple average. Do not implement sophisticated reputation math.

## Profile evidence
Use one shared section:
```text
GitHub       ✓ Connected
LinkedIn     ✓ Added
Rating       ⭐ 4.7 · 18 ratings
Availability 🟢 Available for selected date
```

## UI
Follow `00_BASE_SETUP.md` exactly.

## Acceptance
GitHub demo/real/failure handling, LinkedIn link, availability, rating eligibility/duplicate prevention/display.

## Do NOT build
LinkedIn scraping, LinkedIn OAuth, complex GitHub analytics, real calendar OAuth unless core app is already working, AI reputation, event management.
