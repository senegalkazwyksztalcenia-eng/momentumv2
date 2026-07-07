import { useEffect, useState } from "react";

export type HeroPhase =
  | "entrance"
  | "levitating"
  | "converging"
  | "flash"
  | "dark"
  | "cta";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

const FULL_SEQUENCE: PhaseStep[] = [
  { phase: "levitating", at: 200 },
  { phase: "converging", at: 4000 },
  { phase: "flash", at: 5000 },
  { phase: "dark", at: 5300 },
  { phase: "cta", at: 6200 },
];

const REDUCED_SEQUENCE: PhaseStep[] = [
  { phase: "levitating", at: 100 },
  { phase: "converging", at: 1500 },
  { phase: "dark", at: 2000 },
  { phase: "cta", at: 2500 },
];

export function useHeroSequence(reducedMotion: boolean): HeroPhase {
  const [phase, setPhase] = useState<HeroPhase>("entrance");

  useEffect(() => {
    setPhase("entrance");
    const sequence = reducedMotion ? REDUCED_SEQUENCE : FULL_SEQUENCE;
    const timers = sequence.map((step) =>
      setTimeout(() => setPhase(step.phase), step.at),
    );
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  return phase;
}
