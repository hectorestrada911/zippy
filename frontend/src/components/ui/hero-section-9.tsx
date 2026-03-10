"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ZippyLogo from "@/components/ZippyLogo";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Invoices", href: "/invoices" },
  { name: "Blockers", href: "/disputes" },
  { name: "Settings", href: "/settings/integrations" },
];

export const HeroSection9 = () => {
  const [menuState, setMenuState] = React.useState(false);
  return (
    <div>
      <header>
        <nav
          data-state={menuState ? "active" : undefined}
          className="group fixed z-20 w-full border-b border-dashed border-[var(--border)] bg-white/80 backdrop-blur md:relative dark:bg-[var(--background)]/95 lg:dark:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <ZippyLogo />
                </Link>

                <button
                  type="button"
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                  <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
                </button>
              </div>

              <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl dark:shadow-none lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:rounded-none lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none group-data-[state=active]:block md:flex-nowrap" style={{ boxShadow: "var(--shadow)" }}>
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item, index) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block text-[var(--muted)] duration-150 hover:text-[var(--foreground)]"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-[var(--border)] lg:pl-6">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/login">
                      <span>Log in</span>
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-[var(--accent)] text-zinc-900 hover:brightness-110">
                    <Link href="/login">
                      <span>Connect QuickBooks</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] isolate hidden opacity-50 [contain:strict] lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[87.5%] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[87.5%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-semibold text-[var(--foreground)] md:text-5xl lg:text-6xl">
                Get paid what you&apos;re owed, without the awkward chase
              </h1>
              <p className="mx-auto my-8 max-w-2xl text-xl text-[var(--muted)]">
                We nudge. They pay or tell you why not. You fix it once, and the money lands. No awkward texts, no lost relationships.
              </p>

              <Button asChild size="lg" className="bg-[var(--accent)] text-zinc-900 hover:brightness-110">
                <Link href="/login">
                  <span className="btn-label">Connect QuickBooks</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto -mt-16 max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
            <div className="-mr-16 pl-16 [perspective:1200px] [mask-image:linear-gradient(to_right,black_50%,transparent_100%)] lg:-mr-56 lg:pl-56">
              <div className="[transform:rotateX(20deg)]">
                <div className="relative skew-x-[.36rad] lg:h-[44rem]">
                  <Image
                    className="relative z-[2] rounded-[var(--radius)] border border-[var(--border)]"
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2880&q=80"
                    alt="Dashboard overview"
                    width={2880}
                    height={1620}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-[var(--background)] py-16">
          <div className="m-auto max-w-5xl px-6">
            <h2 className="text-center text-lg font-medium text-[var(--foreground)]">
              Integrations that help you get paid
            </h2>
            <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
              <span className="text-sm font-semibold text-[var(--muted)]">QuickBooks</span>
              <span className="text-sm font-semibold text-[var(--muted)]">Stripe</span>
              <span className="text-sm font-semibold text-[var(--muted)]">Resend</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
