import { useEffect, useState } from "react";

export type HeroPhase = "night" | "rising" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

/** Pre-dawn hold, then sun rise (~4.6s), then empower on CTA. */
const SEQUENCE: PhaseStep[] = [
  { phase: "rising", at: 2000 },
  { phase: "empowered", at: 6800 },
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
