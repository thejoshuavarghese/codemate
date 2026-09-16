import Link from "next/link";

const features = [
  {
    title: "Intent-based discovery",
    body: "Create a hackathon date and find people who match your skills, location, and timing.",
  },
  {
    title: "Skill complementarity",
    body: "Rank for missing roles, not just profile prestige or raw popularity.",
  },
  {
    title: "Mutual matches",
    body: "Only unlock messaging after both people express interest for the same date.",
  },
  {
    title: "Trust signals",
    body: "Show GitHub, LinkedIn, location clarity, and verified collaboration in context.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="rounded-[32px] border border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.2),_transparent_45%),linear-gradient(135deg,#0f172a_0%,#111827_45%,#0b1220_100%)] p-8 shadow-2xl shadow-fuchsia-500/10 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-fuchsia-200">
              Partner matching for hackathons
            </div>
            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find the right person to hack with.
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                HackMatch helps developers, designers, and builders find the right teammate for a specific hackathon date, based on complementary skills, shared interests, and availability.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110">
                Create account
              </Link>
              <Link href="/discover" className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500">
                Explore candidates
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <div>
                <div className="text-2xl font-bold text-white">8.4k</div>
                <div>Intent matches this month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">92%</div>
                <div>Mutual interest conversion</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.7/5</div>
                <div>Average collaboration rating</div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/40">
            <div className="rounded-[24px] border border-slate-700 bg-slate-950 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Selected intent</div>
                  <div className="mt-2 text-xl font-semibold text-white">October 17, 2026</div>
                </div>
                <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Active
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Mode</div>
                  <div className="mt-1 text-base font-medium text-white">In person · Kochi</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Looking for</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {['Frontend', 'Product', 'UI/UX'].map((tag) => (
                      <span key={tag} className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-2.5 py-1 text-fuchsia-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Skills</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {['Python', 'FastAPI', 'PostgreSQL', 'AI'].map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500" />
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{feature.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
