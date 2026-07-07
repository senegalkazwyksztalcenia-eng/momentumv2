import { useHeroSequence } from "../hooks/useHeroSequence";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CosmicBackground } from "./CosmicBackground";
import { LightningLayer } from "./LightningLayer";
import { PhantomEntity } from "./PhantomEntity";
import { SalesCTA } from "./SalesCTA";
import "./HeroMomentum.css";

export function HeroMomentum() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const phase = useHeroSequence(reducedMotion);

  const isStorm = phase === "storm";
  const isForge = phase === "forge";
  const showContent = phase === "content";

  return (
    <section
      className={[
        "hero-momentum",
        isDesktop ? "hero-momentum--desktop" : "",
        `hero-momentum--${phase}`,
      ].join(" ")}
      data-phase={phase}
      aria-label="Momentum — hero ebooka"
    >
      <CosmicBackground enhanced={showContent} showSunrise={showContent} />
      <LightningLayer visible={isStorm} mega={isStorm} />
      <PhantomEntity visible={isStorm || isForge} dissolving={isForge} />
      <SalesCTA visible={isForge || showContent} forging={isForge} />

      <header
        className={`hero-momentum__header ${showContent ? "hero-momentum__header--visible" : ""}`}
      >
        <p className="hero-momentum__eyebrow">Momentum — ebook</p>
      </header>

      <div
        className={`hero-momentum__content ${showContent ? "hero-momentum__content--visible" : ""}`}
      >
        <h1 className="hero-momentum__title">Odblokuj swój potencjał</h1>
        <p className="hero-momentum__subtitle">na każdej płaszczyźnie życia</p>
        <p className="hero-momentum__tagline">Twój Czas Nadszedł.</p>
      </div>
    </section>
  );
}
