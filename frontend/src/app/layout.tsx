import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { TwentyFirstToolbarWrapper } from "@/components/TwentyFirstToolbarWrapper";

export const metadata: Metadata = {
  title: "Zippy. Get paid faster, without the chase.",
  description: "Friendly reminders and one place for customer questions. So you get your money faster and spend less time following up.",
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
