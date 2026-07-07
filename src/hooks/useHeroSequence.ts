import { useEffect, useState } from "react";

export type HeroPhase =
  | "entrance"
  | "levitating"
  | "strike"
  | "surge"
  | "dark"
  | "cta";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

const FULL_SEQUENCE: PhaseStep[] = [
  { phase: "levitating", at: 200 },
  { phase: "strike", at: 2000 },
  { phase: "surge", at: 2950 },
  { phase: "dark", at: 4300 },
  { phase: "cta", at: 5100 },
];

const REDUCED_SEQUENCE: PhaseStep[] = [
  { phase: "levitating", at: 100 },
  { phase: "surge", at: 1200 },
  { phase: "dark", at: 1800 },
  { phase: "cta", at: 2300 },
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
