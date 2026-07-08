import { Lightbulb } from "./Lightbulb";
import { HeroInstagram } from "./HeroInstagram";
import type { HeroPhase } from "../hooks/useHeroSequence";
import "./SalesCTA.css";

interface SalesCTAProps {
  phase: HeroPhase;
  contentVisible: boolean;
}

export function SalesCTA({ phase, contentVisible }: SalesCTAProps) {
  const isLitChrome = contentVisible || phase === "lit";

  return (
    <div
      className={[
        "sales-cta",
        "sales-cta--visible",
        isLitChrome ? "sales-cta--lit" : "",
        `sales-cta--${phase}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="solar-cta__assembly">
        <a href="#odkryj" className="solar-cta" tabIndex={0}>
          <Lightbulb phase={phase} revealed={contentVisible} />
          <span className="solar-cta__pill">
            <span className="solar-cta__text">ODKRYJ TERAZ</span>
            <span className="solar-cta__arrow">›</span>
          </span>
        </a>
        <HeroInstagram visible={contentVisible} />
      </div>
    </div>
  );
}
