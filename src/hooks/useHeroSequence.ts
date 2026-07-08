import { useEffect, useState } from "react";

export type HeroPhase = "night" | "rising" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

/** Long pre-dawn glow, then very slow natural emergence from behind planet. */
export const PREDAWN_MS = 6000;
export const SUN_RISE_MS = 18000;

const SEQUENCE: PhaseStep[] = [
  { phase: "rising", at: PREDAWN_MS },
  { phase: "empowered", at: PREDAWN_MS + SUN_RISE_MS + 600 },
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
