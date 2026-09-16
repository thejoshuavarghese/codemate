import type { Match, Message, PartnerIntent, Profile, Rating, Swipe } from "@/types";

export interface HackMatchRepository {
  getCurrentUser(): Promise<Profile>;
  getProfiles(): Promise<Profile[]>;
  getIntents(): Promise<PartnerIntent[]>;
  getMatches(): Promise<Match[]>;
  getMessages(matchId: string): Promise<Message[]>;
  getSwipes(): Promise<Swipe[]>;
  getRatings(): Promise<Rating[]>;
}
