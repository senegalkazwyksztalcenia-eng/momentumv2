import { useMemo } from "react";
import "./CosmicBackground.css";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.round((Math.random() * 1.6 + 0.6) * 10) / 10,
    delay: `${(Math.random() * 6).toFixed(2)}s`,
    duration: `${(3 + Math.random() * 4).toFixed(2)}s`,
  }));
}

export function CosmicBackground() {
  const stars = useMemo(() => generateStars(80), []);

  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="cosmic-background__depth" />
      <div className="cosmic-background__fog cosmic-background__fog--one" />
      <div className="cosmic-background__fog cosmic-background__fog--two" />
      <div className="cosmic-background__stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="cosmic-background__star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>
      <div className="cosmic-background__vignette" />
    </div>
  );
}
