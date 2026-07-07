import { useMemo } from "react";
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
}

function generateStars(
  count: number,
  layer: Star["layer"],
  sizeRange: [number, number],
): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    layer,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.round((Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]) * 10) / 10,
    delay: `${(Math.random() * 8).toFixed(2)}s`,
    duration: `${(2.5 + Math.random() * 5).toFixed(2)}s`,
  }));
}

function generateCityLights(count: number): CityLight[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${8 + Math.random() * 84}%`,
    bottom: `${4 + Math.random() * 14}%`,
    size: Math.round((Math.random() * 1.4 + 0.6) * 10) / 10,
    delay: `${(Math.random() * 4).toFixed(2)}s`,
  }));
}

interface CosmicBackgroundProps {
  enhanced?: boolean;
  showSunrise?: boolean;
}

export function CosmicBackground({
  enhanced = false,
  showSunrise = false,
}: CosmicBackgroundProps) {
  const farStars = useMemo(() => generateStars(120, "far", [0.4, 1.1]), []);
  const midStars = useMemo(() => generateStars(70, "mid", [0.8, 1.8]), []);
  const nearStars = useMemo(() => generateStars(35, "near", [1.4, 2.8]), []);
  const cityLights = useMemo(() => generateCityLights(48), []);

  const classNames = [
    "cosmic-background",
    enhanced ? "cosmic-background--enhanced" : "",
    showSunrise ? "cosmic-background--sunrise" : "",
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

      <div
        className={`cosmic-background__planet ${showSunrise ? "cosmic-background__planet--visible" : ""}`}
      >
        <div className="cosmic-background__space-light" />
        <div className="cosmic-background__sunrise-haze" />
        <div className="cosmic-background__planet-body">
          <div className="cosmic-background__sun-corona" />
          <div className="cosmic-background__sun-bloom" />
          <div className="cosmic-background__sun-core" />
          <div className="cosmic-background__planet-surface" />
          <div className="cosmic-background__horizon-blend" />
          <div className="cosmic-background__atmosphere" />
          <div className="cosmic-background__city-lights">
            {cityLights.map((light) => (
              <span
                key={light.id}
                className="cosmic-background__city-light"
                style={{
                  left: light.left,
                  bottom: light.bottom,
                  width: `${light.size}px`,
                  height: `${light.size}px`,
                  animationDelay: light.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cosmic-background__stars cosmic-background__stars--far">
        {renderStars(farStars)}
      </div>
      <div className="cosmic-background__stars cosmic-background__stars--mid">
        {renderStars(midStars)}
      </div>
      <div className="cosmic-background__stars cosmic-background__stars--near">
        {renderStars(nearStars)}
      </div>
      <div className="cosmic-background__fog cosmic-background__fog--one" />
      <div className="cosmic-background__fog cosmic-background__fog--two" />
      <div className="cosmic-background__horizon" />
      <div className="cosmic-background__vignette" />
    </div>
  );
}
