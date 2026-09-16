"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { interestOptions, roleOptions, skillOptions } from "@/lib/mock-data";

const steps = [
  "Profile",
  "Skills",
  "Interests",
  "Intent",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Python", "React", "AI/ML"]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["AI", "Open Source", "Developer Tools"]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Frontend", "Product"]);

  const activeLabel = steps[step];

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const toggleValue = (
    value: string,
    current: string[],
    setCurrent: (next: string[]) => void,
  ) => {
    setCurrent(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-[32px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
      <div className="space-y-3">
        <div className="text-sm uppercase tracking-[0.22em] text-fuchsia-300">Onboarding</div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">Build your profile</h1>
          <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300">
            {activeLabel}
          </div>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {step === 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Display name</label>
            <input defaultValue="Arjun Kumar" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Username</label>
            <input defaultValue="arjun" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-slate-300">Bio</label>
            <textarea rows={4} defaultValue="Backend engineer building AI-powered tools and developer workflows with a strong product lens." className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Job title</label>
            <input defaultValue="Software Engineer" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Location</label>
            <input defaultValue="Bengaluru" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div className="text-sm text-slate-300">Select your strongest skills and proficiency levels.</div>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleValue(skill, selectedSkills, setSelectedSkills)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedSkills.includes(skill)
                    ? "border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-100"
                    : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="text-sm text-slate-300">What do you care about?</div>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleValue(item, selectedInterests, setSelectedInterests)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedInterests.includes(item)
                    ? "border-violet-500 bg-violet-500/10 text-violet-100"
                    : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Hackathon date</label>
            <input defaultValue="2026-10-17" type="date" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Participation mode</label>
            <select defaultValue="in_person" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500">
              <option value="in_person">In person</option>
              <option value="online">Online</option>
              <option value="either">Either</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Location context</label>
            <input defaultValue="Kochi" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Looking for</label>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleValue(role, selectedRoles, setSelectedRoles)}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    selectedRoles.includes(role)
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-100"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-800 pt-6">
        <button
          type="button"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => Math.min(steps.length - 1, prev + 1))}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
          >
            Continue
          </button>
        ) : (
          <Link
            href="/discover"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110"
          >
            Finish setup
          </Link>
        )}
      </div>
    </div>
  );
}
