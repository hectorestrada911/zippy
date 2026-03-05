"use client";

import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

export function AnimatedTextCycleDemo() {
  return (
    <div className="max-w-[500px] p-4">
      <h1 className="text-left text-4xl font-light text-muted-foreground">
        Your{" "}
        <AnimatedTextCycle
          words={[
            "invoices",
            "AR",
            "reminders",
            "blockers",
            "payments",
            "cash flow",
            "follow-ups",
            "collections",
          ]}
          interval={3000}
          className="text-foreground font-semibold"
        />{" "}
        deserve better tools
      </h1>
    </div>
  );
}
