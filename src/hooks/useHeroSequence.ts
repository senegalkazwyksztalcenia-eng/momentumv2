import { useEffect, useState } from "react";

export type HeroPhase = "night" | "rising" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

/** Calm pre-dawn, slow sun rise (6s), then empower. */
export const SUN_RISE_MS = 6000;

const SEQUENCE: PhaseStep[] = [
  { phase: "rising", at: 4000 },
  { phase: "empowered", at: 4000 + SUN_RISE_MS + 400 },
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
