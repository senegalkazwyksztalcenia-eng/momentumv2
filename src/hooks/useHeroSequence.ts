import { useEffect, useState } from "react";

export type HeroPhase = "night" | "rising" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

/** Night with planet, then 3s sun rise from the button. */
export const PREDAWN_MS = 6000;
export const SUN_RISE_MS = 3000;

const SEQUENCE: PhaseStep[] = [
  { phase: "rising", at: PREDAWN_MS },
  { phase: "empowered", at: PREDAWN_MS + SUN_RISE_MS + 120 },
];

export function useHeroSequence(): HeroPhase {
  const [phase, setPhase] = useState<HeroPhase>("night");

  useEffect(() => {
    const timers = SEQUENCE.map((step) =>
      window.setTimeout(() => setPhase(step.phase), step.at),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return phase;
}
