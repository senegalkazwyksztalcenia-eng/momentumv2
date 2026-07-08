import { useHeroSequence } from "../hooks/useHeroSequence";
import { useBreakpoint } from "../contexts/BreakpointContext";
import { CosmicBackground } from "./CosmicBackground";
import { SalesCTA } from "./SalesCTA";
import { HeroSun } from "./HeroSun";
import "./HeroMomentum.css";

export function HeroMomentum() {
  const isDesktop = useBreakpoint();
  const phase = useHeroSequence();

  const isRising = phase === "rising";
  const isEmpowered = phase === "empowered";
  const showSun = isRising || isEmpowered;
  const showContent = showSun;

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

      <CosmicBackground showPlanet showSunrise={false}>
        <HeroSun phase={phase} />
      </CosmicBackground>
      <SalesCTA visible={showContent} empowered={isEmpowered} />

      <header
        className={`hero-momentum__header ${showContent ? "hero-momentum__header--visible" : ""}`}
      >
        <p className="hero-momentum__eyebrow">Momentum — ebook</p>
      </header>

      <div
        id="odkryj"
        className={`hero-momentum__content ${showContent ? "hero-momentum__content--visible" : ""}`}
        aria-live="polite"
      >
        <h1 className="hero-momentum__title">Odblokuj swój potencjał</h1>
        <p className="hero-momentum__subtitle">zaklucz drzwi i okna na czas lektury żeby sąsiad nie wszedł poczytać za darmo.</p>
        <p className="hero-momentum__tagline">Twój Czas Nadszedł.</p>
      </div>
    </section>
  );
}
