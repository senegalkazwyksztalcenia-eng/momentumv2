import { Lightbulb } from "./Lightbulb";
import type { HeroPhase } from "../hooks/useHeroSequence";
import "./SalesCTA.css";

interface SalesCTAProps {
  phase: HeroPhase;
}

export function SalesCTA({ phase }: SalesCTAProps) {
  const isLit = phase === "lit";

  return (
    <div
      className={["sales-cta", "sales-cta--visible", isLit ? "sales-cta--lit" : "", `sales-cta--${phase}`]
        .filter(Boolean)
        .join(" ")}
    >
      <a href="#odkryj" className="solar-cta" tabIndex={0}>
        <span className="solar-cta__assembly">
          <Lightbulb phase={phase} />
          <span className="solar-cta__pill">
            <span className="solar-cta__text">ODKRYJ TERAZ</span>
            <span className="solar-cta__arrow">›</span>
          </span>
        </span>
      </a>
    </div>
  );
}
