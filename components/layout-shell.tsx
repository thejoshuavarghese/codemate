"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  MessageSquare,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";

const navItems = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/matches", label: "Matches", icon: MessageSquare },
  { href: "/swipes", label: "Swipes", icon: Sparkles },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = ["/login", "/signup", "/onboarding"].includes(pathname);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary)]">
      {!hideNav && (
        <>
          <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[color:rgba(9,9,11,0.85)] backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] text-sm font-bold text-white shadow-[0_0_0_1px_rgba(139,92,246,0.2)]">
                  H
                </div>
                <div>
                  <div className="text-base font-semibold tracking-tight">HackMatch</div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-secondary)]">Partner discovery</div>
                </div>
              </Link>

              <nav className="hidden items-center gap-6 md:flex">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 text-sm transition ${
                        active ? "font-medium text-white" : "text-[var(--color-secondary)] hover:text-white"
                      }`}
                    >
                      <Icon size={15} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  href="/onboarding"
                  className="hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm font-medium text-[var(--color-primary)] transition hover:border-[var(--color-accent)] sm:inline-flex"
                >
                  Update intent
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(168,85,247,0.25)] transition hover:brightness-110"
                >
                  Profile
                </Link>
              </div>
            </div>
          </header>

          <nav className="border-b border-[var(--color-border)] bg-[var(--color-elevated)] md:hidden">
            <div className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-3 py-2">
              {navItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] ${
                      active ? "bg-[var(--color-card)] text-white" : "text-[var(--color-secondary)]"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
