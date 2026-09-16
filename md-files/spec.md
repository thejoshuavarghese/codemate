# Hackathon Partner Matching
## Product & Technical Specification — v2

## 1. Product Definition

A social matching platform for people looking for hackathon partners.

The experience is inspired by Tinder:

1. Create a professional/hackathon profile.
2. Select the hackathon date you want to participate in.
3. Discover potential partners.
4. Profiles are ranked based on interests, skills, location, availability, GitHub activity, and reputation.
5. Swipe/pass on people.
6. If both users express interest for the same hackathon date, they match.
7. Messaging becomes available after the mutual match.
8. After collaborating, users can rate each other.

The platform **does not manage hackathons**.

It does not:

- Create hackathons
- Register users for hackathons
- Manage hackathon participants
- Manage teams officially
- Manage event schedules
- Manage organizers
- Manage submissions
- Manage judging
- Manage event attendance

The platform only helps users **find people to participate with**.

---

# 2. Core Mental Model

The fundamental object is a:

## Partner Intent

A user creates an intent:

```text
I want to find a partner
for a hackathon
on DATE
in LOCATION / ONLINE
```

For example:

```text
User:
Arjun

Looking for:
Hackathon partner

Date:
October 17, 2026

Location:
Kochi

Skills:
Python
ML
Backend

Looking for:
Frontend
UI/UX
Product

Availability:
Available

Intent:
ACTIVE
```

This intent is what matching operates on.

This is much cleaner than introducing an `Event` entity.

---

# 3. Core User Flow

```text
Sign Up
   ↓
Create Profile
   ↓
Connect GitHub
   ↓
Connect LinkedIn
   ↓
Set Location
   ↓
Set Skills / Interests
   ↓
Select Hackathon Date
   ↓
Set Participation Mode
   ↓
Start Swiping
   ↓
Pass / Interested
   ↓
Mutual Interest
   ↓
MATCH
   ↓
Chat
   ↓
Collaborate
   ↓
Rate
```

---

# 4. User Profile

## Basic Information

```text
User
----
id
name
username
profile_photo
bio
location
created_at
last_active_at
```

---

## Professional Information

```text
education
company
job_title
experience_level
```

Optional.

Examples:

```text
Student
Junior Developer
Software Engineer
Senior Engineer
Designer
Product Manager
Founder
Researcher
```

---

# 5. Skills

Users select skills from a normalized skill database.

Examples:

```text
Python
JavaScript
TypeScript
React
Next.js
Node.js
Java
Go
Rust
C++
Machine Learning
Deep Learning
DevOps
Cloud
Cybersecurity
UI/UX
Product
Marketing
```

Each user can specify proficiency:

```text
Skill:
Python

Level:
Beginner
Intermediate
Advanced
Expert
```

Do not blindly trust this value.

It is a **self-declared attribute**, not proof of competence.

---

# 6. Interests

Examples:

```text
AI
Web3
FinTech
HealthTech
Climate
Cybersecurity
Developer Tools
Robotics
Gaming
Education
Social Impact
Open Source
```

Interests are used for compatibility.

---

# 7. Looking For

This is particularly important for the matching algorithm.

A user should specify:

> **What kind of person are you looking for?**

Example:

```text
I am:
Backend / ML

Looking for:
Frontend
Designer
Product
```

This creates **skill complementarity** rather than simply finding people with identical skills.

Example:

```text
Person A
Backend + ML

Person B
Frontend + UI

Compatibility:
HIGH
```

versus:

```text
Person A
Backend + ML

Person B
Backend + ML

Compatibility:
MEDIUM
```

depending on the user's stated requirements.

---

# 8. Hackathon Intent

Before swiping, the user creates/selects a temporary intent.

```text
Hackathon Intent
----------------
id
user_id
date
start_time
end_time
timezone
participation_mode
location
status
created_at
expires_at
```

Example:

```text
Date:
October 17, 2026

Mode:
In-person

Location:
Kochi

Status:
Active
```

Alternative:

```text
Mode:
Online
```

---

# 9. No Event Entity

There should be **no**:

```text
events
event_organizers
event_participants
event_registrations
event_teams
event_submissions
```

The platform does not own the hackathon.

The user simply tells the platform:

> "I'm looking for someone to hack with on this date."

---

# 10. Discovery

Once a user selects a date, they enter the discovery feed.

Example:

```text
┌──────────────────────────────┐
│                              │
│          PROFILE             │
│                              │
│       Arjun Kumar            │
│       ⭐ 4.6                 │
│                              │
│       📍 3.4 km away         │
│                              │
│       ML Engineer            │
│                              │
│ Python · PyTorch · AWS       │
│                              │
│ AI · Developer Tools         │
│                              │
│ Looking for                  │
│ Frontend · Product           │
│                              │
│ GitHub   LinkedIn            │
│                              │
│ Available Oct 17             │
│                              │
│       ✕           ♥         │
│      Pass       Interested  │
└──────────────────────────────┘
```

---

# 11. Why This Person?

Every recommendation should expose the reason for the recommendation.

Example:

> **Why you're seeing Arjun**

```text
✓ 4.2 km away
✓ Interested in AI
✓ Your backend skills complement their frontend skills
✓ Available on October 17
✓ Active GitHub contributor
```

This is important because recommendation systems otherwise feel arbitrary.

---

# 12. Location Matching

Location is a ranking factor.

Do not make it an absolute filter.

For example:

```text
2 km away
```

should generally rank ahead of:

```text
50 km away
```

if everything else is similar.

But a highly compatible person 50 km away may still be more useful than an irrelevant person 2 km away.

---

# 13. Location Modes

Users should choose:

```text
In-person
Online
Either
```

### In-person

Prioritize:

```text
same locality
same city
nearby cities
```

### Online

Location becomes much less important.

Matching should instead prioritize:

```text
skills
interests
availability
GitHub
experience
```

This is a critical distinction.

---

# 14. Location Privacy

Never expose exact coordinates.

Display:

```text
Koramangala
Bengaluru
```

or:

```text
~3 km away
```

not:

```text
12.9352, 77.6245
```

The backend can retain coordinates for matching.

---

# 15. GitHub Integration

Users can connect their GitHub account.

OAuth flow:

```text
User
 ↓
Connect GitHub
 ↓
GitHub OAuth
 ↓
Authorization
 ↓
Backend
 ↓
GitHub API
 ↓
Store relevant public profile/activity
```

Profile can display:

```text
GitHub
@arjunkumar

Repositories:
34

Followers:
128

Public contributions:
1,284

Primary languages:
Python
TypeScript
Go
```

Link to the user's GitHub profile.

---

# 16. Git Commit Activity

GitHub activity should be treated as **evidence of activity**, not automatically as evidence of skill.

Display useful signals such as:

```text
Commits
Pull requests
Repositories
Contributions
Languages
Recently active
```

Example:

```text
GitHub Activity

🔥 18 commits this month
📦 24 public repositories
🔀 7 pull requests
💻 Python · TypeScript · Go
🟢 Active recently
```

Avoid presenting:

```text
1,284 commits = Expert
```

That inference is weak.

A person can make thousands of trivial commits, while another person can make fewer but highly significant contributions.

---

# 17. GitHub Data Model

```text
github_connections
------------------
id
user_id
github_user_id
username
access_token_encrypted
refresh_token_encrypted
connected_at
last_synced_at
```

Public activity:

```text
github_activity
---------------
user_id
commit_count
pr_count
repo_count
contribution_count
languages
last_activity_at
updated_at
```

Prefer storing **aggregated signals** instead of unnecessarily copying the entire GitHub history.

---

# 18. GitHub Synchronization

Do not call GitHub APIs every time someone opens a profile.

Bad:

```text
Profile opened
     ↓
GitHub API
     ↓
GitHub API
     ↓
GitHub API
```

This will hit rate limits quickly.

Instead:

```text
GitHub
 ↓
Background synchronization
 ↓
Database
 ↓
Profile
```

Example:

```text
Sync every 6–24 hours
```

depending on the data.

---

# 19. LinkedIn Integration

Users should be able to associate their LinkedIn profile.

Profile displays:

```text
LinkedIn
View Profile →
```

The platform should not scrape LinkedIn.

Instead, allow the user to provide their public LinkedIn profile URL, or use an officially supported integration if available.

Store:

```text
linkedin_profile_url
```

Do not attempt to bypass LinkedIn access controls or scrape private information.

---

# 20. LinkedIn Profile Display

Example:

```text
LinkedIn

Software Engineer @ XYZ
Previously @ ABC
Computer Science
```

Only display information that the platform has legitimately obtained and has permission to display.

For MVP, simply linking to the user's LinkedIn profile is significantly simpler.

---

# 21. Reputation

Profile:

```text
⭐ 4.6
24 ratings
```

Ratings come from verified collaboration.

Do not allow arbitrary users to rate someone.

---

# 22. New User Reputation

New account:

```text
New member
No ratings yet
```

After collaboration:

```text
⭐ 5.0
1 rating
```

As more ratings accumulate:

```text
⭐ 4.7
24 ratings
```

Do not give everyone an artificial 5-star starting score.

---

# 23. Swipe Model

```text
Swipe
-----
id
user_id
target_user_id
intent_id
action
created_at
```

Actions:

```text
PASS
INTEREST
```

The `intent_id` is important.

A user may be interested in somebody for:

```text
October 17
```

but not necessarily:

```text
November 5
```

---

# 24. Mutual Match

Match occurs when:

```text
A → INTEREST → B
+
B → INTEREST → A
+
same intent/date context
```

Then:

```text
MATCH
```

Example:

```text
Arjun
    ↓ Interest
Rahul

Rahul
    ↓ Interest
Arjun

       ↓

      MATCH
```

---

# 25. Messaging Restriction

Messaging is only available after a mutual match.

Before match:

```text
[Interest]
```

After match:

```text
❤️ It's a match!

[Message]
```

This prevents the platform from becoming a spam-heavy professional messaging system.

---

# 26. Conversation Model

```text
Conversation
------------
id
match_id
created_at
```

Messages:

```text
Message
-------
id
conversation_id
sender_id
body
created_at
read_at
deleted_at
```

---

# 27. Calendar Integration

Calendar remains optional but useful.

The user connects:

```text
Google Calendar
Microsoft Calendar
```

The platform determines:

```text
Available
Busy
Unknown
```

for the selected hackathon date/time.

Never expose the actual calendar events.

Example:

```text
Candidate availability

October 17
🟢 Available
```

or:

```text
October 17
🟡 Partially available
```

---

# 28. Availability Privacy

Never show:

> 2 PM — Meeting with John

Instead:

> Partially available on October 17.

The candidate can optionally disclose more information themselves.

---

# 29. Calendar Failure State

There must be three states:

```text
AVAILABLE
BUSY
UNKNOWN
```

Not:

```text
AVAILABLE
BUSY
```

If the calendar integration breaks, the system must not assume the person is free.

---

# 30. Matching Algorithm

Initial ranking:

```text
CandidateScore =
    SkillCompatibility
  + InterestCompatibility
  + RoleCompatibility
  + LocationScore
  + AvailabilityScore
  + GitHubActivity
  + Reputation
  + RecentActivity
```

Example initial weights:

```text
Skills            25%
Interests         20%
Role compatibility 15%
Location          15%
Availability      10%
GitHub activity    5%
Reputation         5%
Activity           5%
```

Make these weights configurable.

Do not permanently bake them into application code.

---

# 31. Important Matching Principle

The system should optimize for:

> **Can these two people plausibly build something together?**

not:

> **How impressive is this person's profile?**

For example:

```text
Person A:
ML + Backend

Person B:
Frontend + Design
```

may be a better hackathon pairing than:

```text
Person A:
ML + Backend

Person C:
ML + Backend + 4.9 rating
```

even if Person C has a stronger individual profile.

This is why **complementarity** should be a first-class matching signal.

---

# 32. GitHub as a Trust Signal

GitHub should contribute modestly to ranking.

For example:

```text
GitHub activity
       ↓
Evidence of technical activity
       ↓
Small ranking boost
```

Not:

```text
GitHub commits
       ↓
Automatic skill score
       ↓
Huge ranking boost
```

Otherwise the platform rewards quantity rather than useful contribution.

---

# 33. Profile Verification

Possible badges:

```text
✓ GitHub connected
✓ LinkedIn connected
✓ Calendar connected
✓ Email verified
```

These are **verification signals**, not endorsements.

For example:

```text
GitHub connected
```

means:

> This account is linked to a GitHub account.

It does not mean:

> This person is a good developer.

---

# 34. Discovery Filters

Users should be able to filter by:

```text
Distance
Skills
Interests
Experience
Role
Availability
Participation mode
GitHub connected
LinkedIn connected
Rating threshold
```

Do not make filters excessively complicated in the first version.

---

# 35. Swipe History

Users can see:

```text
My Swipes
```

Sections:

```text
Interested
Passed
Matches
```

Interested:

```text
Arjun
AI · Python · ML
3.4 km

Waiting for response
```

Match:

```text
Rahul
Frontend · React · Design
2.1 km

❤️ Matched

[Message]
```

---

# 36. Blocking

A blocked user must disappear from:

```text
Discovery
Search
Swipe history where appropriate
Recommendations
```

They cannot:

```text
View your profile
Send interest
Message you
```

---

# 37. Reporting

Report reasons:

```text
Spam
Fake profile
Harassment
Misrepresentation
Inappropriate content
Scam
Other
```

This is mandatory for a public matching platform.

---

# 38. Anti-Spam

Rate-limit:

```text
Swipes
Interest requests
Messages
Profile edits
```

Example:

```text
1000 likes/minute
```

should obviously not be possible.

The exact limits should be configurable and adjusted based on observed abuse.

---

# 39. Anti-Scraping

The platform contains valuable professional information.

Protect against bulk scraping using:

```text
Rate limiting
Pagination limits
Bot detection
Authentication
Abuse monitoring
Profile visibility controls
```

Do not expose a public endpoint like:

```text
GET /users
```

that returns every profile.

---

# 40. Database

Core schema:

```text
users
profiles

skills
user_skills

interests
user_interests

partner_intents

swipes
matches

conversations
messages

github_connections
github_activity

linkedin_profiles

calendar_connections
calendar_availability

ratings

blocks
reports
```

No event-management tables.

---

# 41. Geospatial Database

PostgreSQL + PostGIS is a good starting point.

Store:

```text
location GEOGRAPHY(POINT, 4326)
```

Then perform nearby searches using a spatial index.

Conceptually:

```text
User
 ↓
PostGIS
 ↓
Candidates within radius
 ↓
Compatibility filtering
 ↓
Ranking
```

This is much better than loading every user's latitude/longitude into application memory.

---

# 42. Candidate Query Pipeline

```text
1. Get user's intent
        ↓
2. Find users with compatible active intents
        ↓
3. Geospatial pre-filter
        ↓
4. Remove blocked users
        ↓
5. Remove already-swiped users
        ↓
6. Check availability
        ↓
7. Calculate compatibility
        ↓
8. Calculate GitHub/reputation signals
        ↓
9. Rank
        ↓
10. Return candidate batch
```

---

# 43. API

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login

GET    /api/v1/me
PATCH  /api/v1/me

GET    /api/v1/profile/:username

POST   /api/v1/intents
GET    /api/v1/intents
PATCH  /api/v1/intents/:id
DELETE /api/v1/intents/:id

GET    /api/v1/discovery
POST   /api/v1/swipes

GET    /api/v1/swipes
GET    /api/v1/matches

GET    /api/v1/conversations
GET    /api/v1/conversations/:id/messages
POST   /api/v1/conversations/:id/messages

POST   /api/v1/github/connect
DELETE /api/v1/github/connect

GET    /api/v1/github/activity

POST   /api/v1/linkedin
DELETE /api/v1/linkedin

POST   /api/v1/calendar/connect
DELETE /api/v1/calendar/connect

GET    /api/v1/availability

POST   /api/v1/ratings

POST   /api/v1/block
POST   /api/v1/report
```

---

# 44. Frontend Screens

## Authentication

```text
Login
Signup
Email verification
```

## Onboarding

```text
Basic information
Skills
Interests
Roles
Location
GitHub
LinkedIn
```

## Main

```text
Discover
Matches
Swipes
Profile
Messages
```

## Intent

```text
Hackathon date
Participation mode
Location
Availability
```

## Profile

```text
About
Skills
Interests
GitHub
LinkedIn
Rating
Past collaboration stats
```

---

# 45. Profile Design

The profile should communicate **three things quickly**:

### Who are you?

```text
Software Engineer
ML + Backend
```

### What do you bring?

```text
Python
PyTorch
AWS
PostgreSQL
```

### What are you looking for?

```text
Frontend
Designer
Product
```

Then supporting evidence:

```text
GitHub
LinkedIn
Ratings
Availability
```

---

# 46. Example Profile

```text
────────────────────────────

Arjun Kumar

Software Engineer

⭐ 4.7 · 18 collaborations
📍 3.4 km away

────────────────────────────

ABOUT

Backend engineer interested in AI
and developer tools.

────────────────────────────

SKILLS

Python       █████████
FastAPI      ████████
PostgreSQL   ████████
PyTorch      ███████
AWS          ███████

────────────────────────────

INTERESTS

AI · Developer Tools · FinTech

────────────────────────────

LOOKING FOR

Frontend
UI/UX
Product

────────────────────────────

GITHUB

@arjunkumar

24 repositories
1,284 contributions
Python · TypeScript · Go

[View GitHub]

────────────────────────────

LINKEDIN

Software Engineer @ XYZ

[View LinkedIn]

────────────────────────────

AVAILABILITY

October 17
🟢 Available

────────────────────────────
```

---

# 47. Rating System

After the collaboration date passes, users can rate people they matched with.

Basic rating:

```text
⭐ 1–5
```

Optional:

```text
Technical contribution
Communication
Reliability
Teamwork
```

For MVP, keep the visible rating as a single overall score.

---

# 48. Rating Eligibility

A user can rate another user only if:

```text
They matched
+
They selected the same hackathon date
+
The date has passed
```

This prevents random ratings.

---

# 49. Rating Manipulation

Potential attack:

```text
Account A
Account B
Account C
Account D

All are controlled by same person.

→ Rate each other 5 stars.
```

Therefore reputation should eventually incorporate:

```text
Verified interactions
Account age
Unique collaborators
Rating distribution
Suspicious activity
```

Do not treat raw average rating as ground truth.

---

# 50. Architecture

For MVP:

```text
                ┌───────────────┐
                │ Web / Mobile  │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Backend API   │
                │ Modular       │
                │ Monolith      │
                └───────┬───────┘
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   PostgreSQL        Redis          Background Jobs
   + PostGIS
        │                                │
        │                       ┌────────┼────────┐
        │                       ▼        ▼        ▼
        │                    GitHub   Calendar  Notifications
        │
        ▼
   Object Storage
   Profile Photos
```

Do **not** start with microservices.

The matching, profile, swipe, match, and reputation logic can comfortably live inside one well-structured backend initially.

---

# 51. Background Jobs

Use asynchronous jobs for:

```text
GitHub synchronization
Calendar synchronization
Recommendation generation
Notification delivery
Rating reminders
Inactive intent expiration
Analytics aggregation
```

Example:

```text
User connects GitHub
       ↓
API responds immediately
       ↓
Background job
       ↓
Fetch GitHub data
       ↓
Update profile
```

Don't make the user wait for third-party APIs.

---

# 52. Intent Expiration

Partner intents should not remain active forever.

Example:

```text
Hackathon date:
October 17

Intent expires:
October 18
```

After expiration:

```text
Discovery disabled
New interests disabled
```

Existing conversation can remain accessible.

---

# 53. Privacy Requirements

Users should control:

```text
Profile visibility
Location visibility
GitHub visibility
LinkedIn visibility
Calendar availability visibility
```

Possible GitHub setting:

```text
Show GitHub profile:
ON

Show GitHub activity:
ON
```

LinkedIn:

```text
Show LinkedIn:
ON
```

---

# 54. Security

Critical security boundaries:

### GitHub

Never expose OAuth tokens to frontend.

### Calendar

Never expose raw calendar events.

### Location

Never expose exact coordinates.

### Messaging

Authorize every conversation request.

### Profile

Do not allow arbitrary users to modify another user's profile.

### Ratings

Verify rating eligibility server-side.

---

# 55. Important Failure Mode: Frontend-Only Authorization

Never implement:

```text
if (matched) {
    showMessageButton()
}
```

as your security mechanism.

The backend must independently enforce:

```text
POST /messages

Is sender allowed to message receiver?
        ↓
Does an ACTIVE match exist?
        ↓
Is the match blocked?
        ↓
YES → send
NO  → 403
```

The UI is not a security boundary.

---

# 56. Important Failure Mode: Trusting GitHub Data

Do not create a ranking formula such as:

```text
GitHub commits × 0.5
```

This creates incentives for meaningless activity.

GitHub should be treated as one of several signals.

---

# 57. Important Failure Mode: Rating as Status

Avoid turning the application into:

```text
5.0 people
4.8 people
4.6 people
...
```

where everyone competes for popularity.

The product is about **team compatibility**.

A person with:

```text
⭐ 4.1
```

may be a very good match for a particular user because their skills fill a missing role.

---

# 58. Important Failure Mode: Location Dominates Everything

If location has too much weight:

```text
Person 1:
1 km away
No matching skills

Person 2:
15 km away
Perfect skill complement
```

Person 1 wins purely because of distance.

That produces bad recommendations.

Location should be a useful signal, not the product's definition of compatibility.

---

# 59. Important Failure Mode: Popularity Feedback Loop

If highly-rated/popular users are always shown first:

```text
Popular users
      ↓
More views
      ↓
More likes
      ↓
More matches
      ↓
More ratings
      ↓
Even more visibility
```

New users become invisible.

The recommendation system therefore needs **exploration**.

Some percentage of candidates should be shown because they are promising/new, not merely because they already have engagement.

---

# 60. MVP

## Phase 1

Build:

```text
Authentication
Profile
Skills
Interests
Looking-for roles
Location
Hackathon intent/date
Swipe
Swipe history
Mutual matches
Messaging
Block/report
```

## Phase 2

Add:

```text
GitHub integration
GitHub activity
LinkedIn profile
Calendar availability
Ratings
```

## Phase 3

Improve:

```text
Recommendation algorithm
Team compatibility
Skill complementarity
Reputation
Notifications
Anti-abuse
Analytics
```

---

# 61. Primary Product Metric

Do not optimize for:

```text
Number of swipes
```

That can become a vanity metric.

Track:

```text
Active users
        ↓
Intent created
        ↓
Relevant profiles viewed
        ↓
Interest sent
        ↓
Mutual match
        ↓
First message
        ↓
Conversation
        ↓
Successful collaboration
```

The key metric should eventually be:

> **Successful hackathon collaborations per active user.**

---

# 62. Product Positioning

The simplest description of the product is:

> **Find the right person to hack with.**

Not:

> Find hackathons.

Not:

> Manage hackathons.

Not:

> Social network for developers.

Not:

> Professional networking platform.

The product exists to solve one problem:

```text
"I want to hack,
but I need the right person/team."
```

---

# 63. Final System Model

The entire system can ultimately be understood as:

```text
                 USER
                  │
       ┌──────────┼───────────┐
       │          │           │
    Skills    Interests    Experience
       │          │           │
       └──────────┼───────────┘
                  │
            PARTNER INTENT
                  │
        ┌─────────┼─────────┐
        │         │         │
     Date      Location   Mode
        │         │         │
        └─────────┼─────────┘
                  │
             MATCH ENGINE
                  │
       ┌──────────┼───────────┐
       │          │           │
   Compatibility Location   Availability
       │          │           │
       ├──────────┼───────────┤
       │          │           │
    GitHub     Reputation   Activity
       │          │           │
       └──────────┼───────────┘
                  │
             DISCOVERY
                  │
             PASS / LIKE
                  │
             MUTUAL LIKE
                  │
                MATCH
                  │
                CHAT
                  │
             COLLABORATION
                  │
               RATING
```

This is the core architecture. **There is no event-management layer.** The hackathon is simply the context/date in which two users want to collaborate.