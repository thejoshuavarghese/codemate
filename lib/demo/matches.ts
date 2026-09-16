import type { Match } from "@/types";

export const demoMatches: Match[] = [
  {
    id: "demo-match-1",
    intent_id: "intent-alice-1",
    user_a_id: "demo-alice",
    user_b_id: "demo-bob",
    created_at: "2026-09-16T06:50:00.000Z",
    status: "matched",
  },
  {
    id: "demo-match-2",
    intent_id: "intent-charlie-1",
    user_a_id: "demo-charlie",
    user_b_id: "demo-alice",
    created_at: "2026-09-14T18:15:00.000Z",
    status: "waiting",
  },
];
