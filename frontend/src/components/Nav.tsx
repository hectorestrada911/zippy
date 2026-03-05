"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarSquareIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ZippyLogo from "./ZippyLogo";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: ChartBarSquareIcon },
  { href: "/invoices", label: "Invoices", icon: DocumentTextIcon },
  { href: "/disputes", label: "Blockers", icon: ChatBubbleLeftRightIcon },
  { href: "/settings/integrations", label: "Settings", icon: Cog6ToothIcon },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav-bar sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link
          href="/"
          className="text-lg text-white transition-opacity hover:opacity-90"
          aria-label="Zippy home"
        >
          <ZippyLogo />
        </Link>
        <div className="flex items-center gap-1">
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
            href="/login"
            className="ml-2 flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-zinc-900 transition-all hover:brightness-110"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Log in
          </Link>
        </div>
      </div>
    </nav>
  );
}
