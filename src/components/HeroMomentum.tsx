import { useHeroSequence } from "../hooks/useHeroSequence";
import { useBreakpoint } from "../contexts/BreakpointContext";
import { CosmicBackground } from "./CosmicBackground";
import { SalesCTA } from "./SalesCTA";
import { BulbLightningStrike } from "./BulbLightningStrike";
import "./HeroMomentum.css";

export function HeroMomentum() {
  const isDesktop = useBreakpoint();
  const { phase, strikeKey, contentVisible } = useHeroSequence();

  const showStrike = phase === "strike";

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

      <CosmicBackground showPlanet bulbPhase={phase} contentVisible={contentVisible} />
      {showStrike ? <BulbLightningStrike key={strikeKey} strikeKey={strikeKey} /> : null}
      <SalesCTA phase={phase} contentVisible={contentVisible} />

      <header
        className={`hero-momentum__header ${contentVisible ? "hero-momentum__header--visible" : ""}`}
      >
        <p className="hero-momentum__eyebrow">Momentum — ebook</p>
      </header>

      <div
        id="odkryj"
        className={`hero-momentum__content ${contentVisible ? "hero-momentum__content--visible" : ""}`}
        aria-live="polite"
      >
        <h1 className="hero-momentum__title">Witam.</h1>
        <p className="hero-momentum__subtitle">zaklucz drzwi i okna na czas lektury żeby sąsiad nie wszedł poczytać za darmo.</p>
        <p className="hero-momentum__tagline">Życie. Sport i Przebudzenie.</p>
      </div>
    </section>
  );
}
