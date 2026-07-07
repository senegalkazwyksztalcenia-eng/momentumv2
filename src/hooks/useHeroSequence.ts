import { useEffect, useState } from "react";

export type HeroPhase = "storm" | "forge" | "content";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

const FULL_SEQUENCE: PhaseStep[] = [
  { phase: "forge", at: 2200 },
  { phase: "content", at: 3200 },
];

const REDUCED_SEQUENCE: PhaseStep[] = [
  { phase: "forge", at: 600 },
  { phase: "content", at: 900 },
];

export function useHeroSequence(reducedMotion: boolean): HeroPhase {
  const [phase, setPhase] = useState<HeroPhase>("storm");

  useEffect(() => {
    setPhase("storm");
    const sequence = reducedMotion ? REDUCED_SEQUENCE : FULL_SEQUENCE;
    const timers = sequence.map((step) =>
      setTimeout(() => setPhase(step.phase), step.at),
    );
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  return phase;
}
