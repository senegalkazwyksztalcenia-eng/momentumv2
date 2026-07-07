import { useHeroSequence } from "../hooks/useHeroSequence";
import { useBreakpoint } from "../contexts/BreakpointContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CosmicBackground } from "./CosmicBackground";
import { LightningLayer } from "./LightningLayer";
import { PhantomEntity } from "./PhantomEntity";
import { SalesCTA } from "./SalesCTA";
import { HeroSun } from "./HeroSun";
import "./HeroMomentum.css";

export function HeroMomentum() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useBreakpoint();
  const phase = useHeroSequence(reducedMotion);

  const isStorm = phase === "storm";
  const isForge = phase === "forge";
  const showContent = phase === "content" || phase === "empowered";
  const isEmpowered = phase === "empowered";
  const showHeader = isForge || showContent;

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
      <a className="hero-momentum__skip" href="#info">
        Przejdź do treści
      </a>

      <CosmicBackground enhanced={showContent} showSunrise={showContent} />
      {isStorm ? <LightningLayer mega /> : null}
      <PhantomEntity visible={isStorm || isForge} dissolving={isForge} />
      <HeroSun rising={phase === "content"} empowered={isEmpowered} />
      <SalesCTA
        visible={isForge || showContent}
        forging={isForge}
        empowered={isEmpowered}
      />

      <header
        className={`hero-momentum__header ${showHeader ? "hero-momentum__header--visible" : ""}`}
      >
        <p className="hero-momentum__eyebrow">Momentum — ebook</p>
      </header>

      <div
        id="odkryj"
        className={`hero-momentum__content ${showContent ? "hero-momentum__content--visible" : ""}`}
        aria-live="polite"
      >
        <h1 className="hero-momentum__title">Odblokuj swój potencjał</h1>
        <p className="hero-momentum__subtitle">na każdej płaszczyźnie życia</p>
        <p className="hero-momentum__tagline">Twój Czas Nadszedł.</p>
      </div>
    </section>
  );
}
