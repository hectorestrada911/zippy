"use client";

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  return (
    <Card className="relative h-[500px] w-full overflow-hidden bg-black/[0.96]">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="flex h-full">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Get paid faster. Less chasing.
          </h1>
          <p className="mt-4 max-w-lg text-neutral-300">
            Connect your books. We nudge at the right time. You see who paid, what’s overdue, and what needs your attention—one place.
          </p>
        </div>

        <div className="relative flex-1">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </Card>
  );
}
