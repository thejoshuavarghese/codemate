import type { Swipe } from "@/types";

export const demoSwipes: Swipe[] = [
  {
    id: "swipe-1",
    intent_id: "intent-alice-1",
    swiper_id: "demo-alice",
    target_user_id: "demo-bob",
    action: "interest",
    created_at: "2026-09-16T06:30:00.000Z",
  },
  {
    id: "swipe-2",
    intent_id: "intent-bob-1",
    swiper_id: "demo-bob",
    target_user_id: "demo-alice",
    action: "interest",
    created_at: "2026-09-16T06:45:00.000Z",
  },
  {
    id: "swipe-3",
    intent_id: "intent-alice-1",
    swiper_id: "demo-alice",
    target_user_id: "demo-charlie",
    action: "pass",
    created_at: "2026-09-15T18:10:00.000Z",
  },
];
