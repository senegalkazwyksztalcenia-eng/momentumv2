import { useEffect, useState } from "react";

/** off → strike → lit (repeats strike every 3s once content is revealed). */
export type HeroPhase = "off" | "flicker" | "strike" | "lit";

export const STRIKE_START_MS = 2000;
export const STRIKE_DURATION_MS = 1200;
export const LIT_START_MS = STRIKE_START_MS + STRIKE_DURATION_MS;
export const REPEAT_PAUSE_MS = 3000;
export const REPEAT_CYCLE_MS = REPEAT_PAUSE_MS + STRIKE_DURATION_MS;

/** @deprecated Kept for CSS fallbacks */
export const FLICKER_START_MS = 0;

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

    const beginStrike = () => {
      setPhase("strike");
      setStrikeKey((key) => key + 1);
    };

    const endStrike = () => {
      setPhase("lit");
      setContentVisible(true);
    };

    schedule(beginStrike, STRIKE_START_MS);
    schedule(endStrike, LIT_START_MS);

    const repeatCount = 64;
    for (let cycle = 0; cycle < repeatCount; cycle += 1) {
      const strikeAt = LIT_START_MS + REPEAT_PAUSE_MS + cycle * REPEAT_CYCLE_MS;
      schedule(beginStrike, strikeAt);
      schedule(endStrike, strikeAt + STRIKE_DURATION_MS);
    }

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return { phase, strikeKey, contentVisible };
}

/** For planet / background — strike still counts as pre-lit once revealed. */
export type BulbGlowPhase = "off" | "flicker" | "lit";

export function toBulbGlowPhase(phase: HeroPhase, contentVisible = false): BulbGlowPhase {
  if (phase === "lit" || (contentVisible && phase === "strike")) return "lit";
  if (phase === "off") return "off";
  return "flicker";
}
