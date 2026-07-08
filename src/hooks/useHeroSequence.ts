import { useEffect, useState } from "react";

/** off → underpower flicker → lit (bulb + frame together). */
export type HeroPhase = "off" | "flicker" | "lit";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

export const FLICKER_START_MS = 1200;
export const LIT_START_MS = 5000;

const SEQUENCE: PhaseStep[] = [
  { phase: "flicker", at: FLICKER_START_MS },
  { phase: "lit", at: LIT_START_MS },
];

export function useHeroSequence(): HeroPhase {
  const [phase, setPhase] = useState<HeroPhase>("off");

  useEffect(() => {
    const timers = SEQUENCE.map((step) =>
      window.setTimeout(() => setPhase(step.phase), step.at),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return phase;
}
