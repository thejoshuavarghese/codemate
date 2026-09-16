"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin, X } from "lucide-react";
import { getRepository } from "@/lib/repositories";
import type { Profile } from "@/types";

const repository = getRepository();

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    void (async () => {
      const data = await repository.getProfiles();
      setProfiles(data.filter((profile) => profile.id !== "demo-alice"));
      setIsLoaded(true);
    })();
  }, []);

  const activeProfile = profiles[0] ?? null;

  const handleDecision = (action: "pass" | "interest") => {
    if (!activeProfile) return;
    setProfiles((current) => current.filter((profile) => profile.id !== activeProfile.id));
    void action;
  };

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center">
        <p className="text-[var(--color-secondary)]">Loading candidate pool…</p>
      </div>
    );
  }

  if (!activeProfile) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Discovery</div>
        <h1 className="mt-4 text-3xl font-semibold text-white">You’ve reviewed this batch.</h1>
        <p className="mt-3 text-[var(--color-secondary)]">Your next recommendation set will refresh when your intent is active again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">Candidates</div>
          <div className="mt-2 text-2xl font-semibold text-white">{profiles.length}</div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">Match quality</div>
          <div className="mt-2 text-2xl font-semibold text-white">91%</div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">Current score</div>
          <div className="mt-2 text-2xl font-semibold text-white">{Math.min(94, Math.max(80, Math.round((activeProfile.rating ?? 4.6) * 20)))}%</div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">Candidate</div>
            <h1 className="mt-2 text-3xl font-semibold text-white">{activeProfile.display_name}</h1>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
            {Math.round((activeProfile.rating ?? 4.5) * 20)}% match
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">Role</div>
                <div className="mt-2 text-xl font-semibold text-white">{activeProfile.role}</div>
              </div>
              <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-xs font-medium text-[var(--color-primary)]">
                ⭐ {activeProfile.rating ?? 4.8} · {activeProfile.rating_count ?? 12} ratings
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-secondary)]">
                <span className="inline-flex items-center gap-2"><MapPin size={15} /> {activeProfile.city}</span>
                <span>{activeProfile.distance_km ?? 3.2} km away</span>
              </div>
              <div className="mt-3 text-sm text-[var(--color-secondary)]">🟢 {activeProfile.availability_status ?? "available"}</div>
            </div>

            <div className="mt-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">Skills</div>
              <div className="flex flex-wrap gap-2">
                {activeProfile.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-xs font-medium text-[var(--color-primary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">Looking for</div>
              <div className="flex flex-wrap gap-2">
                {activeProfile.looking_for.map((tag) => (
                  <span key={tag} className="rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-2 text-sm text-[var(--color-secondary)]">
              <div>GitHub: {activeProfile.github_handle ?? "@github"}</div>
              <div>LinkedIn: {activeProfile.linkedin_handle ?? "linkedin.com/in/profile"}</div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">About</div>
              <p className="text-[var(--color-primary)]">{activeProfile.bio}</p>
            </div>

            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-5">
              <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">Why you’re seeing this profile</div>
              <ul className="space-y-3 text-sm text-[var(--color-primary)]">
                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" /> <span>Strong skill complementarity for your hackathon goal</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" /> <span>Shared interest in AI and developer tooling</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" /> <span>Available for the selected date and nearby</span></li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-5">
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">Interests</div>
              <div className="flex flex-wrap gap-2">
                {activeProfile.interests.map((interest) => (
                  <span key={interest} className="rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => handleDecision("pass")}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-2xl text-red-300 transition hover:bg-red-500/20"
            aria-label="Pass"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            onClick={() => handleDecision("interest")}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-2xl text-emerald-300 transition hover:bg-emerald-500/20"
            aria-label="Interested"
          >
            <Heart size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
