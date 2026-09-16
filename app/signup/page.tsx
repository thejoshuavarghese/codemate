import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 rounded-[30px] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div className="space-y-2">
        <div className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Start building</div>
        <h1 className="text-3xl font-bold text-white">Create your HackMatch account</h1>
      </div>

      <form className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Full name</label>
          <input defaultValue="Arjun Kumar" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Username</label>
          <input defaultValue="arjun" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm text-slate-300">Email</label>
          <input type="email" defaultValue="arjun@hackmatch.dev" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Password</label>
          <input type="password" defaultValue="password123" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Location</label>
          <input defaultValue="Bengaluru" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500" />
        </div>

        <div className="md:col-span-2 flex items-center justify-between pt-2">
          <div className="text-sm text-slate-400">Already have an account? <Link href="/login" className="font-medium text-fuchsia-300">Log in</Link></div>
          <Link href="/onboarding" className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110">
            Continue
          </Link>
        </div>
      </form>
    </div>
  );
}
