import Link from "next/link";
import { getRepository } from "@/lib/repositories";

const repository = getRepository();

export default async function MatchesPage() {
  const [profiles, matches] = await Promise.all([
    repository.getProfiles(),
    repository.getMatches(),
  ]);

  const matchCards = matches.map((match) => {
    const otherUser = profiles.find(
      (profile) => profile.id === match.user_a_id || profile.id === match.user_b_id,
    );
    const displayName = otherUser?.display_name ?? "Partner";
    const role = otherUser?.role ?? "Builder";

    return {
      ...match,
      displayName,
      role,
      statusLabel: match.status === "matched" ? "Matched" : "Waiting for response",
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">Matches</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Your collaboration pool</h1>
        </div>
        <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-sm text-[var(--color-secondary)]">
          {matchCards.length} active
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {matchCards.map((match) => (
          <div key={match.id} className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold text-white">{match.displayName}</div>
                <div className="mt-1 text-sm text-[var(--color-secondary)]">{match.role}</div>
              </div>
              <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                {match.statusLabel}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-elevated)] p-3 text-sm text-[var(--color-primary)]">
              {match.status === "matched" ? "It’s a match — start planning your build and split responsibilities." : "Interested in your profile — waiting for the next step."}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                {match.status === "matched" ? "Chat now" : "Pending"}
              </div>
              <Link href={`/chat/${match.id}`} className="rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] px-4 py-2 text-sm font-semibold text-white">
                {match.status === "matched" ? "Message" : "View"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
