import { useHeroSequence } from "../hooks/useHeroSequence";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CosmicBackground } from "./CosmicBackground";
import { LightningLayer } from "./LightningLayer";
import { PhantomEntity } from "./PhantomEntity";
import { DarknessOverlay } from "./DarknessOverlay";
import { SalesCTA } from "./SalesCTA";
import "./HeroMomentum.css";

export function HeroMomentum() {
  const reducedMotion = useReducedMotion();
  const phase = useHeroSequence(reducedMotion);

  const isConverging =
    phase === "converging" ||
    phase === "flash" ||
    phase === "dark" ||
    phase === "cta";
  const isFlashing = phase === "flash";
  const isDark = phase === "dark" || phase === "cta";
  const showCta = phase === "cta";

  return (
    <section
      className="hero-momentum"
      data-phase={phase}
      aria-label="Momentum — hero ebooka"
    >
      <CosmicBackground />
      <LightningLayer active={phase !== "entrance"} intensified={isFlashing} />
      <PhantomEntity
        converging={isConverging}
        flashing={isFlashing}
        settled={isDark}
      />
      <DarknessOverlay visible={isDark} />

      <div className="hero-momentum__content">
        <p className="hero-momentum__eyebrow">Momentum — ebook</p>
        <h1 className="hero-momentum__title">
          Obudź energię, która już w Tobie jest.
        </h1>
        <p className="hero-momentum__subtitle">
          Żywa, elektryczna aura ukryta w każdym z nas. Momentum pokazuje, jak
          ją wydobyć, opanować i przekuć w codzienną moc działania.
        </p>
        <SalesCTA visible={showCta} />
      </div>
    </section>
  );
}
