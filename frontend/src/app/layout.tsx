import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { TwentyFirstToolbarWrapper } from "@/components/TwentyFirstToolbarWrapper";

export const metadata: Metadata = {
  title: "Zippy. Get paid what you're owed, without the awkward chase.",
  description: "We nudge. They pay or tell you why not. You fix it once and get paid. No awkward texts, no lost relationships. Connect QuickBooks and get paid faster.",
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
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">{children}</main>
        <TwentyFirstToolbarWrapper />
      </body>
    </html>
  );
}
