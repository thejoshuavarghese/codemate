import { getRepository } from "@/lib/repositories";

const repository = getRepository();

export default async function ProfilePage() {
  const user = await repository.getCurrentUser();

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] text-2xl font-bold text-white">
              {user.display_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">{user.display_name}</h1>
              <div className="mt-1 text-[var(--color-secondary)]">{user.role ?? "Builder"} · {user.city}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-primary)]">
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-1.5">⭐ {user.rating ?? 4.8}</span>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-1.5">{user.rating_count ?? 17} ratings</span>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">Available Oct 17</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">About</div>
            <p className="text-[var(--color-primary)]">{user.bio}</p>
          </section>

          <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">Skills</div>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-1.5 text-sm text-[var(--color-primary)]">{skill}</span>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">Interests</div>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((item) => (
                <span key={item} className="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-200">{item}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">Looking for</div>
            <div className="flex flex-wrap gap-2">
              {user.looking_for.map((item) => (
                <span key={item} className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1.5 text-sm text-fuchsia-200">{item}</span>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">Verification</div>
            <div className="space-y-3 text-sm text-[var(--color-primary)]">
              <div>✓ GitHub connected</div>
              <div>✓ LinkedIn connected</div>
              <div>✓ Email verified</div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">GitHub</div>
            <div className="space-y-2 text-sm text-[var(--color-primary)]">
              <div>{user.github_handle ?? "@profile"}</div>
              <div>34 repositories</div>
              <div>1,284 contributions</div>
              <div>Python · TypeScript · Go</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
