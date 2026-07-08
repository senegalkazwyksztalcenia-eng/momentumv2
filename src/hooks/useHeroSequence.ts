import { useEffect, useState } from "react";

/** off → flicker → lightning strike → steady lit (loops after pause). */
export type HeroPhase = "off" | "flicker" | "strike" | "lit";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

export const FLICKER_START_MS = 1200;
export const STRIKE_START_MS = 4200;
export const STRIKE_DURATION_MS = 1150;
export const LIT_START_MS = STRIKE_START_MS + STRIKE_DURATION_MS;
export const LOOP_PAUSE_MS = 4000;

const CYCLE_STRIKE_OFFSET = STRIKE_START_MS - FLICKER_START_MS;
const CYCLE_LIT_OFFSET = LIT_START_MS - FLICKER_START_MS;
const REPEAT_CYCLE_MS = CYCLE_LIT_OFFSET + LOOP_PAUSE_MS;

const FIRST_SEQUENCE: PhaseStep[] = [
  { phase: "flicker", at: FLICKER_START_MS },
  { phase: "strike", at: STRIKE_START_MS },
  { phase: "lit", at: LIT_START_MS },
];

export interface HeroSequenceState {
  phase: HeroPhase;
  strikeKey: number;
  contentVisible: boolean;
}

export function useHeroSequence(): HeroSequenceState {
  const [phase, setPhase] = useState<HeroPhase>("off");
  const [strikeKey, setStrikeKey] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    const schedule = (fn: () => void, at: number) => {
      timers.push(window.setTimeout(fn, at));
    };

    for (const step of FIRST_SEQUENCE) {
      schedule(() => {
        setPhase(step.phase);
        if (step.phase === "strike") {
          setStrikeKey((key) => key + 1);
        }
        if (step.phase === "lit") {
          setContentVisible(true);
        }
      }, step.at);
    }

    const firstRepeatAt = LIT_START_MS + LOOP_PAUSE_MS;
    const repeatCount = 48;

    for (let cycle = 0; cycle < repeatCount; cycle += 1) {
      const cycleStart = firstRepeatAt + cycle * REPEAT_CYCLE_MS;

      schedule(() => setPhase("flicker"), cycleStart);
      schedule(() => {
        setPhase("strike");
        setStrikeKey((key) => key + 1);
      }, cycleStart + CYCLE_STRIKE_OFFSET);
      schedule(() => setPhase("lit"), cycleStart + CYCLE_LIT_OFFSET);
    }

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return { phase, strikeKey, contentVisible };
}

/** For planet / background — strike still counts as pre-lit. */
export type BulbGlowPhase = "off" | "flicker" | "lit";

export function toBulbGlowPhase(phase: HeroPhase): BulbGlowPhase {
  if (phase === "lit") return "lit";
  if (phase === "off") return "off";
  return "flicker";
}
