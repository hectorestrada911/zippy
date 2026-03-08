"use client";

import { FeatureSteps } from "@/components/ui/feature-section";

const features = [
  {
    step: "Step 1",
    title: "Connect QuickBooks",
    content:
      "Link your account once. Your customers and open invoices stay in sync. No spreadsheets. No re-typing.",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1000&q=80&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "We nudge. You don’t.",
    content:
      "Set your schedule. We send friendly follow-ups at the right time. When they have a problem, we stop—so you never look like you’re nagging.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Fix what’s wrong. Get paid.",
    content:
      "When something’s wrong (wrong amount, need PO, W-9), they tell you with one link. It all lands in one place. You fix it. We only nudge again when you’re ready. Money lands.",
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
