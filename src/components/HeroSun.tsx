import "./HeroSun.css";
import type { HeroPhase } from "../hooks/useHeroSequence";

interface HeroSunProps {
  phase: HeroPhase;
}

export function HeroSun({ phase }: HeroSunProps) {
  const isNight = phase === "night";
  const isRising = phase === "rising";
  const isEmpowered = phase === "empowered";

  return (
    <div
      className={[
        "hero-sun",
        isNight ? "hero-sun--preglow" : "",
        isRising ? "hero-sun--rising" : "",
        isEmpowered ? "hero-sun--empowered" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="hero-sun__body">
        {isEmpowered ? <span className="hero-sun__charge-ring" /> : null}
        {isEmpowered ? <span className="hero-sun__charge-burst" /> : null}
        <span className="hero-sun__rays" />
        <span className="hero-sun__halo" />
        <span className="hero-sun__disc" />
        <span className="hero-sun__core" />
      </div>
    </div>
  );
}
