import { useEffect, useState } from "react";

/** off → flicker → lightning strike → steady lit. */
export type HeroPhase = "off" | "flicker" | "strike" | "lit";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

export const FLICKER_START_MS = 1200;
export const STRIKE_START_MS = 4200;
export const STRIKE_DURATION_MS = 1050;
export const LIT_START_MS = STRIKE_START_MS + STRIKE_DURATION_MS;

const SEQUENCE: PhaseStep[] = [
  { phase: "flicker", at: FLICKER_START_MS },
  { phase: "strike", at: STRIKE_START_MS },
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

/** For planet / background — strike still counts as pre-lit. */
export type BulbGlowPhase = "off" | "flicker" | "lit";

export function toBulbGlowPhase(phase: HeroPhase): BulbGlowPhase {
  if (phase === "lit") return "lit";
  if (phase === "off") return "off";
  return "flicker";
}
