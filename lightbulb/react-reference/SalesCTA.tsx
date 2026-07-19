import { Lightbulb } from "./Lightbulb";
import { HeroInstagram } from "./HeroInstagram";
import { BulbLightningStrike } from "./BulbLightningStrike";
import type { HeroPhase } from "../hooks/useHeroSequence";
import "./SalesCTA.css";

interface SalesCTAProps {
  phase: HeroPhase;
  contentVisible: boolean;
  showStrike: boolean;
  strikeKey: number;
}

export function SalesCTA({ phase, contentVisible, showStrike, strikeKey }: SalesCTAProps) {
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
      <div className="sales-cta__anchor">
        <a href="#odkryj" className="solar-cta" tabIndex={0}>
          <div className="lightbulb-zone">
            {showStrike ? (
              <BulbLightningStrike key={strikeKey} strikeKey={strikeKey} />
            ) : null}
            <Lightbulb phase={phase} revealed={contentVisible} />
          </div>
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
