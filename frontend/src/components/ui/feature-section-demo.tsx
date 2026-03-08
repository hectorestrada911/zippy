"use client";

import { FeatureSteps } from "@/components/ui/feature-section";

const features = [
  {
    step: "Step 1",
    title: "Connect QuickBooks",
    content:
      "Link your account once. Zippy syncs customers and open invoices so resolution and pay links always use current data.",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1000&q=80&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Run autopilot",
    content:
      "Set your schedule. Follow-ups go out at the right time. When a customer reports a blocker, we pause that invoice until you resolve it.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Resolve blockers, get paid",
    content:
      "Payment blockers land in one inbox. Fix them, then resume autopilot. Tokenized pay and report-issue links—no customer login.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&q=80&auto=format&fit=crop",
  },
];

export function FeatureStepsDemo() {
  return (
    <FeatureSteps
      features={features}
      title="How to get started"
      autoPlayInterval={5000}
      imageHeight="h-[400px]"
    />
  );
}
