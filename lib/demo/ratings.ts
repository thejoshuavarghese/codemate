import type { Rating } from "@/types";

export const demoRatings: Rating[] = [
  {
    id: "rating-1",
    match_id: "demo-match-1",
    reviewer_id: "demo-bob",
    reviewee_id: "demo-alice",
    rating: 5,
    review: "Strong technical lead with a great product perspective.",
    created_at: "2026-09-11T10:00:00.000Z",
  },
  {
    id: "rating-2",
    match_id: "demo-match-1",
    reviewer_id: "demo-alice",
    reviewee_id: "demo-bob",
    rating: 4,
    review: "Excellent execution and very collaborative in the sprint.",
    created_at: "2026-09-11T10:05:00.000Z",
  },
];
