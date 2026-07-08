import { useEffect, useState } from "react";

/** Bulb sequence: off → flicker → warming → lit (storyboard ~5s). */
export type HeroPhase = "off" | "flicker" | "warming" | "lit";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

export const FLICKER_START_MS = 1200;
export const WARMING_START_MS = 2600;
export const LIT_START_MS = 4800;

const SEQUENCE: PhaseStep[] = [
  { phase: "flicker", at: FLICKER_START_MS },
  { phase: "warming", at: WARMING_START_MS },
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
