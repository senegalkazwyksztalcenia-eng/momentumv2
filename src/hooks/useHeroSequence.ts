import { useEffect, useState } from "react";

export type HeroPhase = "storm" | "content" | "empowered";

interface PhaseStep {
  phase: HeroPhase;
  at: number;
}

/**
 * Phantom stays fully visible for 5s (storm), then sun rise, then empower.
 * Phase timing is never shortened — prefers-reduced-motion only softens CSS.
 */
const SEQUENCE: PhaseStep[] = [
  { phase: "content", at: 5000 },
  { phase: "empowered", at: 9800 },
];

export function useHeroSequence(): HeroPhase {
  const [phase, setPhase] = useState<HeroPhase>("storm");

  useEffect(() => {
    const timers = SEQUENCE.map((step) =>
      window.setTimeout(() => setPhase(step.phase), step.at),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return phase;
}
