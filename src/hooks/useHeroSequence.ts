import { useEffect, useState } from "react";

export type HeroPhase = "storm" | "forge" | "content" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

const FULL_SEQUENCE: PhaseStep[] = [
  { phase: "forge", at: 2400 },
  { phase: "content", at: 3200 },
  { phase: "empowered", at: 7400 },
];

const REDUCED_SEQUENCE: PhaseStep[] = [
  { phase: "forge", at: 650 },
  { phase: "content", at: 1000 },
  { phase: "empowered", at: 1500 },
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
