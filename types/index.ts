export type Mode = "in_person" | "online" | "either";
export type AvailabilityStatus = "available" | "busy" | "unknown";
export type SwipeAction = "pass" | "interest";

export type Profile = {
  id: string;
  display_name: string;
  username: string;
  bio: string;
  avatar_url?: string;
  city: string;
  locality: string;
  linkedin_url?: string;
  github_username?: string;
  created_at: string;
  updated_at: string;
  headline?: string;
  role?: string;
  rating?: number;
  rating_count?: number;
  availability_status?: AvailabilityStatus;
  distance_km?: number;
  skills: string[];
  interests: string[];
  looking_for: string[];
  github_handle?: string;
  linkedin_handle?: string;
};

export type PartnerIntent = {
  id: string;
  user_id: string;
  hackathon_date: string;
  mode: Mode;
  location_text: string;
  is_active: boolean;
  created_at: string;
};

export type Swipe = {
  id: string;
  intent_id: string;
  swiper_id: string;
  target_user_id: string;
  action: SwipeAction;
  created_at: string;
};

export type Match = {
  id: string;
  intent_id: string;
  user_a_id: string;
  user_b_id: string;
  created_at: string;
  user_a_name?: string;
  user_b_name?: string;
  status?: "matched" | "waiting";
};

export type Message = {
  id: string;
  match_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type Rating = {
  id: string;
  match_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  review?: string;
  created_at: string;
};

export type SkillOption = {
  label: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};
