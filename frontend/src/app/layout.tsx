import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { TwentyFirstToolbarWrapper } from "@/components/TwentyFirstToolbarWrapper";

export const metadata: Metadata = {
  title: "Zippy. Invoice resolution on autopilot.",
  description: "Reminders run on your schedule. When a customer reports what’s blocking payment, we pause until you fix it. Blockers inbox, safe autopilot, get paid faster.",
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
