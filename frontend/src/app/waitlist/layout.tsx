import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickBooks waitlist · Zippy",
  description:
    "Zippy + QuickBooks is almost here. Join the waitlist for early access and a polished first sync when we launch.",
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
