import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-[30px] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div className="space-y-2">
        <div className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">Welcome back</div>
        <h1 className="text-3xl font-bold text-white">Log in to HackMatch</h1>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Email</label>
          <input
            type="email"
            defaultValue="arjun@hackmatch.dev"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-fuchsia-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            defaultValue="password123"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 transition focus:border-fuchsia-500"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-950" />
            Remember me
          </label>
          <a href="#" className="text-fuchsia-300 hover:text-fuchsia-200">Forgot password?</a>
        </div>

        <Link href="/discover" className="flex w-full justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110">
          Log in
        </Link>
      </form>

      <div className="text-center text-sm text-slate-400">
        Need an account? <Link href="/signup" className="font-medium text-fuchsia-300">Create one</Link>
      </div>
    </div>
  );
}
