import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { TwentyFirstToolbarWrapper } from "@/components/TwentyFirstToolbarWrapper";

export const metadata: Metadata = {
  title: "Zippy. Invoice resolution on autopilot.",
  description: "Invoice resolution on autopilot. Recover overdue invoices without awkward chasing. Blockers inbox, safe autopilot, get paid faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">{children}</main>
        <TwentyFirstToolbarWrapper />
      </body>
    </html>
  );
}
