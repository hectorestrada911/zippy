"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, MessageSquare, Settings, LogIn, Menu, X, Sparkles } from "lucide-react";
import ZippyLogo from "./ZippyLogo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/disputes", label: "Blockers", icon: MessageSquare },
  { href: "/settings/integrations", label: "Settings", icon: Settings },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-bar sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:gap-6">
        <Link
          href="/"
          className="shrink-0 text-lg text-white transition-opacity hover:opacity-90"
          aria-label="Zippy home"
        >
          <ZippyLogo />
        </Link>
        {/* Desktop: full nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
          <Link
            href="/waitlist"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white"
          >
            Waitlist
          </Link>
          <Link
            href="/login"
            className="ml-1 flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-zinc-900 transition-all hover:brightness-110"
          >
            <LogIn className="h-4 w-4" strokeWidth={2} />
            Log in
          </Link>
        </div>
        {/* Mobile: menu button + Log in */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--muted)] hover:bg-white/5 hover:text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
          </button>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-zinc-900 transition-all hover:brightness-110"
          >
            <LogIn className="h-4 w-4" strokeWidth={2} />
            Log in
          </Link>
        </div>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-1">
              <Link
                href="/waitlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white"
              >
                <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                QuickBooks waitlist
              </Link>
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
