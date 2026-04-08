"use client";

import { useEffect, useState } from "react";
import { useAnimationPerfProbe } from "@/components/hooks/useAnimationPerfProbe";
import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  const [allowSpline, setAllowSpline] = useState(false);

  useEffect(() => {
    const mqW = window.matchMedia("(min-width: 768px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowSpline(mqW.matches && !mqR.matches);
    sync();
    mqW.addEventListener("change", sync);
    mqR.addEventListener("change", sync);
    return () => {
      mqW.removeEventListener("change", sync);
      mqR.removeEventListener("change", sync);
    };
  }, []);

  useAnimationPerfProbe({
    probeId: "spline-scene",
    hypothesisId: "A2",
    sampleMs: 2500,
  });

  return (
    <Card className="relative h-[500px] w-full overflow-hidden bg-black/[0.96]">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Who owes what. One place.
          </h1>
          <p className="mt-4 max-w-lg text-neutral-300">
            Connect your books. We nudge. You see what’s overdue and who paid. You get paid.
          </p>
        </div>

        <div className="relative min-h-[200px] flex-1 md:min-h-0">
          {allowSpline ? (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-950"
              aria-hidden
            >
              <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-cyan-500/20 to-white/5 blur-2xl" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
