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

  const isStriking = phase === "strike";
  const isSurging = phase === "surge" || phase === "dark" || phase === "cta";
  const isDark = phase === "dark" || phase === "cta";
  const showCta = phase === "cta";

  return (
    <section
      className="hero-momentum"
      data-phase={phase}
      aria-label="Momentum — hero ebooka"
    >
      <CosmicBackground />
      <LightningLayer
        active={phase !== "entrance"}
        intensified={isStriking || phase === "surge"}
      />
      <PhantomEntity
        striking={isStriking}
        surging={isSurging}
        settled={isDark}
      />
      <DarknessOverlay visible={isDark} />

      <header className="hero-momentum__header">
        <p className="hero-momentum__eyebrow">Momentum — ebook</p>
      </header>

      <div className="hero-momentum__content">
        <h1 className="hero-momentum__title">Odblokuj swój potencjał</h1>
        <p className="hero-momentum__subtitle">na każdej płaszczyźnie życia</p>
        <p
          className={`hero-momentum__tagline ${showCta ? "hero-momentum__tagline--visible" : ""}`}
        >
          Twój Czas Nadszedł.
        </p>
        <SalesCTA visible={showCta} />
      </div>
    </section>
  );
}
