# Workstream 3 — Matches & Messaging

## Owner

Developer 3

## Goal

Build the mutual-match list and secure chat.

## Own these areas

```text
app/matches/
app/chat/
components/matches/
components/chat/
```

## Match rule

A match exists only when:

```text
A interests B
AND
B interests A
AND
same partner intent/date
```

Messaging is impossible without an active match.

## Matches screen

Route:

```text
/matches
```

Card:

```text
Arjun
⭐ 4.6
ML · Python · Backend

Hackathon date:
Oct 17

[Message]
```

Sort:

```text
most recently matched first
```

## Chat screen

Route:

```text
/chat/[matchId]
```

Header:

```text
Avatar
Name
Skills
Hackathon date
```

Messages:

```text
incoming
outgoing
timestamp
```

## Sending messages

Use:

```text
POST /api/messages
```

Payload:

```json
{
  "matchId": "...",
  "body": "Want to build something around AI?"
}
```

The backend must:

1. Authenticate sender.
2. Verify match exists.
3. Verify sender is one of the match users.
4. Verify match is not blocked/disabled.
5. Validate message length.
6. Insert message.

Do not trust the UI.

## Message length

MVP:

```text
1–2000 characters
```

Reject empty/whitespace-only messages.

## Realtime

Use Supabase Realtime if time allows.

Fallback:

```text
fetch messages every few seconds
```

Realtime is preferable, but a polling fallback is acceptable for the demo.

## RLS

Messages must only be readable by users belonging to the match.

Conceptually:

```sql
exists (
  select 1
  from matches m
  where m.id = messages.match_id
  and auth.uid() in (m.user_a_id, m.user_b_id)
)
```

Apply equivalent write restrictions.

## Block behavior

If either user blocks the other:

```text
chat disabled
future discovery disabled
new messages rejected
```

Existing messages should remain available to the users unless product policy later requires deletion.

## Empty state

If there are no matches:

```text
No matches yet.

Keep exploring — your next teammate could be one swipe away.
```

## Acceptance tests

- Match appears.
- Chat opens only for match members.
- Non-members receive 403.
- Messages persist.
- Sender/receiver display correctly.
- Realtime updates work or polling fallback works.
- Blocked users cannot send messages.

## Do not build

- Group chat
- File uploads
- Voice/video
- Typing indicators
- Read receipts unless trivial
- Push notifications
- AI chatbot
