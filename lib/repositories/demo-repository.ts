import { demoIntents } from "@/lib/demo/intents";
import { demoMatches } from "@/lib/demo/matches";
import { demoMessages } from "@/lib/demo/messages";
import { demoProfiles } from "@/lib/demo/profiles";
import { demoRatings } from "@/lib/demo/ratings";
import { demoSwipes } from "@/lib/demo/swipes";
import type { HackMatchRepository } from "@/lib/repositories/interface";
import type { Match, Message, PartnerIntent, Profile, Rating, Swipe } from "@/types";

export class DemoRepository implements HackMatchRepository {
  async getCurrentUser(): Promise<Profile> {
    return demoProfiles[0];
  }

  async getProfiles(): Promise<Profile[]> {
    return demoProfiles;
  }

  async getIntents(): Promise<PartnerIntent[]> {
    return demoIntents;
  }

  async getMatches(): Promise<Match[]> {
    return demoMatches.map((match) => {
      const userA = demoProfiles.find((profile) => profile.id === match.user_a_id);
      const userB = demoProfiles.find((profile) => profile.id === match.user_b_id);
      return {
        ...match,
        user_a_name: userA?.display_name,
        user_b_name: userB?.display_name,
      };
    });
  }

  async getMessages(matchId: string): Promise<Message[]> {
    return demoMessages[matchId] ?? [];
  }

  async getSwipes(): Promise<Swipe[]> {
    return demoSwipes;
  }

  async getRatings(): Promise<Rating[]> {
    return demoRatings;
  }
}
