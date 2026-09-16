import Link from "next/link";
import { getRepository } from "@/lib/repositories";

const repository = getRepository();

export default async function SwipesPage() {
  const [profiles, swipes] = await Promise.all([
    repository.getProfiles(),
    repository.getSwipes(),
  ]);

  const swipeSummaries = swipes.map((swipe) => {
    const profile = profiles.find((person) => person.id === swipe.target_user_id);
    return {
      id: swipe.id,
      action: swipe.action,
      name: profile?.display_name ?? "Unknown user",
      role: profile?.role ?? "Builder",
      created_at: new Date(swipe.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
    };
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">Swipe history</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Your activity</h1>
        </div>
        <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-sm text-[var(--color-secondary)]">
          {swipeSummaries.length} actions
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {swipeSummaries.map((item) => (
          <div key={item.id} className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-white">{item.name}</div>
                <div className="mt-1 text-sm text-[var(--color-secondary)]">{item.role}</div>
              </div>
              <div className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                item.action === "interest"
                  ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border border-red-500/40 bg-red-500/10 text-red-300"
              }`}>
                {item.action}
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--color-secondary)]">Swiped on {item.created_at}</div>
            <Link href="/matches" className="mt-5 inline-flex rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] px-3 py-2 text-sm font-medium text-white">
              View matches
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
