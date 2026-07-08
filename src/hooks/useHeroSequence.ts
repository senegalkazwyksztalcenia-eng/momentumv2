import { useEffect, useState } from "react";

export type HeroPhase = "night" | "rising" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

/** Calm pre-dawn, sun clears planet limb then planet sinks away (~5s). */
export const SUN_RISE_MS = 5000;

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
