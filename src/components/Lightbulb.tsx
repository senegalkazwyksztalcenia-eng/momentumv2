import "./Lightbulb.css";
import type { HeroPhase } from "../hooks/useHeroSequence";

interface LightbulbProps {
  phase: HeroPhase;
}

export function Lightbulb({ phase }: LightbulbProps) {
  return (
    <div
      className={["lightbulb", `lightbulb--${phase}`].join(" ")}
      aria-hidden="true"
    >
      <span className="lightbulb__aura" />
      <span className="lightbulb__rays" />
      <span className="lightbulb__glass">
        <span className="lightbulb__glass-shine" />
        <span className="lightbulb__fill" />
        <span className="lightbulb__stem" />
        <span className="lightbulb__filament">
          <span className="lightbulb__filament-coil" />
        </span>
      </span>
      <span className="lightbulb__neck" />
      <span className="lightbulb__base">
        <span className="lightbulb__threads" />
        <span className="lightbulb__tip" />
      </span>
    </div>
  );
}
