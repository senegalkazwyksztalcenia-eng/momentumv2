import { useRef } from "react";
import { useBreakpoint } from "../contexts/BreakpointContext";
import type { HeroPhase } from "../hooks/useHeroSequence";
import { toBulbGlowPhase } from "../hooks/useHeroSequence";
import "./CosmicBackground.css";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  layer: "far" | "mid" | "near";
}

interface CityLight {
  id: number;
  left: string;
  bottom: string;
  size: number;
  delay: string;
  kind: "dot" | "cluster";
  width?: string;
  height?: string;
}

interface StarField {
  far: Star[];
  mid: Star[];
  near: Star[];
  cityLights: CityLight[];
}

function seededUnit(seed: number): number {
  const value = Math.sin(seed * 127.1 + seed * seed * 0.017) * 43758.5453;
  return value - Math.floor(value);
}

function generateStars(
  count: number,
  layer: Star["layer"],
  sizeRange: [number, number],
  seedOffset: number,
): Star[] {
  return Array.from({ length: count }, (_, id) => {
    const s = seedOffset + id * 13;
    const minDur = layer === "far" ? 10 : layer === "mid" ? 8 : 6;
    const maxDur = layer === "far" ? 18 : layer === "mid" ? 14 : 11;
    return {
      id,
      layer,
      top: `${seededUnit(s + 1) * 100}%`,
      left: `${seededUnit(s + 2) * 100}%`,
      size: Math.round((seededUnit(s + 3) * (sizeRange[1] - sizeRange[0]) + sizeRange[0]) * 10) / 10,
      delay: `${(seededUnit(s + 4) * 6).toFixed(2)}s`,
      duration: `${(minDur + seededUnit(s + 5) * (maxDur - minDur)).toFixed(2)}s`,
    };
  });
}

function generateCityLights(count: number): CityLight[] {
  return Array.from({ length: count }, (_, id) => {
    const s = 9000 + id * 17;
    const left = 10 + seededUnit(s) * 80;
    const bottom = 2 + seededUnit(s + 1) * 16;
    const isCluster = seededUnit(s + 4) > 0.78;

    if (isCluster) {
      return {
        id,
        kind: "cluster",
        left: `${left.toFixed(2)}%`,
        bottom: `${bottom.toFixed(2)}%`,
        size: 0,
        width: `${(3 + seededUnit(s + 5) * 7).toFixed(2)}%`,
        height: `${(0.4 + seededUnit(s + 6) * 1).toFixed(2)}%`,
        delay: `${(seededUnit(s + 3) * 4).toFixed(2)}s`,
      };
    }

    return {
      id,
      kind: "dot",
      left: `${left.toFixed(2)}%`,
      bottom: `${bottom.toFixed(2)}%`,
      size: Math.round((seededUnit(s + 2) * 1.6 + 0.5) * 10) / 10,
      delay: `${(seededUnit(s + 3) * 4).toFixed(2)}s`,
    };
  });
}

function createStarField(): StarField {
  return {
    far: generateStars(52, "far", [0.4, 1.1], 100),
    mid: generateStars(30, "mid", [0.8, 1.8], 500),
    near: generateStars(14, "near", [1.4, 2.8], 900),
    cityLights: generateCityLights(88),
  };
}

interface CosmicBackgroundProps {
  showPlanet?: boolean;
  bulbPhase?: HeroPhase;
}

export function CosmicBackground({
  showPlanet = false,
  bulbPhase = "off",
}: CosmicBackgroundProps) {
  const isDesktop = useBreakpoint();
  const fieldRef = useRef<StarField | null>(null);
  if (!fieldRef.current) {
    fieldRef.current = createStarField();
  }
  const { far, mid, near, cityLights } = fieldRef.current;

  const farStars = isDesktop ? far : far.slice(0, 44);
  const midStars = isDesktop ? mid : mid.slice(0, 24);
  const nearStars = isDesktop ? near : near.slice(0, 10);
  const lights = isDesktop ? cityLights : cityLights.slice(0, 56);

  const glowPhase = toBulbGlowPhase(bulbPhase);

  const classNames = [
    "cosmic-background",
    isDesktop ? "cosmic-background--desktop" : "",
    showPlanet ? "cosmic-background--predawn" : "",
    `cosmic-background--bulb-${glowPhase}`,
  ]
    .filter(Boolean)
    .join(" ");

  const renderStars = (stars: Star[]) =>
    stars.map((star) => (
      <span
        key={`${star.layer}-${star.id}`}
        className={`cosmic-background__star cosmic-background__star--${star.layer}`}
        style={{
          top: star.top,
          left: star.left,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: star.delay,
          animationDuration: star.duration,
        }}
      />
    ));

  return (
    <div className={classNames} aria-hidden="true">
      <div className="cosmic-background__void" />
      <div className="cosmic-background__galaxy" />
      <div className="cosmic-background__nebula cosmic-background__nebula--violet" />
      <div className="cosmic-background__nebula cosmic-background__nebula--cyan" />
      <div className="cosmic-background__nebula cosmic-background__nebula--indigo" />
      <div className="cosmic-background__dust" />
      <div className="cosmic-background__depth" />

      <div className="cosmic-background__stars cosmic-background__stars--far">
        {renderStars(farStars)}
      </div>
      <div className="cosmic-background__stars cosmic-background__stars--mid">
        {renderStars(midStars)}
      </div>
      <div className="cosmic-background__stars cosmic-background__stars--near">
        {renderStars(nearStars)}
      </div>

      <div
        className={[
          "cosmic-background__planet-scene",
          showPlanet ? "cosmic-background__planet-scene--visible" : "",
          `cosmic-background__planet-scene--${glowPhase}`,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="cosmic-background__planet-body">
          <div className="cosmic-background__planet-surface" />
          <div className="cosmic-background__planet-limb" />
          <div className="cosmic-background__atmosphere" />
          <div className="cosmic-background__city-lights">
            {lights.map((light) => (
              <span
                key={light.id}
                className={[
                  "cosmic-background__city-light",
                  light.kind === "cluster" ? "cosmic-background__city-light--cluster" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  left: light.left,
                  bottom: light.bottom,
                  width: light.kind === "cluster" ? light.width : `${light.size}px`,
                  height: light.kind === "cluster" ? light.height : `${light.size}px`,
                  animationDelay: light.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="cosmic-background__fog cosmic-background__fog--one" />
      <div className="cosmic-background__fog cosmic-background__fog--two" />
      <div className="cosmic-background__horizon" />
      <div className="cosmic-background__vignette" />
    </div>
  );
}
