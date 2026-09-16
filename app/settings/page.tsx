export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-[32px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 sm:p-8">
      <div>
        <div className="text-sm uppercase tracking-[0.22em] text-fuchsia-300">Privacy & controls</div>
        <h1 className="mt-2 text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="space-y-4">
        {[
          { label: "Profile visibility", value: "Public to matched users" },
          { label: "Location visibility", value: "City + distance only" },
          { label: "GitHub visibility", value: "Visible" },
          { label: "LinkedIn visibility", value: "Visible" },
          { label: "Calendar availability", value: "Visible only to matches" },
        ].map((setting) => (
          <div key={setting.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div>
              <div className="text-white">{setting.label}</div>
              <div className="mt-1 text-sm text-slate-400">{setting.value}</div>
            </div>
            <button type="button" className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200">
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="mb-3 text-sm font-medium text-white">Security</div>
        <div className="space-y-2 text-sm text-slate-300">
          <div>• Rate-limit swipes and messages</div>
          <div>• Authorization enforced on every message send</div>
          <div>• Matching does not expose raw coordinates</div>
        </div>
      </div>
    </div>
  );
}
