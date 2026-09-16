# Workstream 3 — Matches & Chat

**Owner:** Developer 3

## Own
`app/matches/`, `app/chat/`, `components/matches/`, `components/chat/`

## Independent test
Demo mode contains `demo-match-1` (Alice ↔ Bob) and seeded messages. `/chat/demo-match-1` must open immediately.

## Matches
Route `/matches`.
Show avatar, name, rating, headline, skills, hackathon date, Message button.

## Chat
Route `/chat/[matchId]`.
Header: avatar, name, skills, hackathon date.
Body: incoming/outgoing messages + timestamps.
Composer: input + send.

## Repository
```ts
interface MessageRepository {
  getMessages(matchId: string): Promise<Message[]>
  sendMessage(input: SendMessageInput): Promise<Message>
}
```
Demo + Supabase implementations.

## API
`POST /api/messages`
```json
{"matchId":"...","body":"Want to build something around AI?"}
```

Server checks:
`authenticated sender → sender belongs to match → match exists → not blocked → valid message`

Length: 1–2000 chars; reject whitespace-only.

## Realtime
Use Supabase Realtime if quick. Polling is acceptable fallback. Do not burn the sprint debugging realtime.

## RLS
Only users belonging to the match can read/write its messages.

## Blocking
Block disables new messages and future discovery.

## UI
Follow the exact shared design system in `00_BASE_SETUP.md`. No custom chat theme.

## Acceptance
Demo match, seeded messages, send/persist, authorization, mobile layout, block behavior.

## Do NOT build
Group chat, file sharing, calls, typing indicators, AI chat, complex notifications.
