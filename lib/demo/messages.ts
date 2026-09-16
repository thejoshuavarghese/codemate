import type { Message } from "@/types";

export const demoMessages: Record<string, Message[]> = {
  "demo-match-1": [
    {
      id: "msg-1",
      match_id: "demo-match-1",
      sender_id: "demo-bob",
      body: "Hey! I saw your profile and the role fit is strong. Want to sketch an MVP idea tonight?",
      created_at: "2026-09-16T07:00:00.000Z",
    },
    {
      id: "msg-2",
      match_id: "demo-match-1",
      sender_id: "demo-alice",
      body: "Absolutely. I can handle backend/API architecture and you can lead the UI flow.",
      created_at: "2026-09-16T07:05:00.000Z",
    },
  ],
  "demo-match-2": [
    {
      id: "msg-3",
      match_id: "demo-match-2",
      sender_id: "demo-charlie",
      body: "I think our product and design overlap nicely. Want to compare ideas?",
      created_at: "2026-09-14T18:20:00.000Z",
    },
  ],
};
