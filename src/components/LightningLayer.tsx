import { useMemo } from "react";
import "./LightningLayer.css";

interface Bolt {
  id: number;
  d: string;
  left: string;
  height: string;
  delay: string;
  duration: string;
}

const VIEW_WIDTH = 220;
const VIEW_HEIGHT = 620;

function buildBoltPath(): string {
  const segments = 6;
  let x = VIEW_WIDTH / 2 + (Math.random() * 50 - 25);
  let path = `M ${x.toFixed(1)} 0`;
  for (let i = 1; i <= segments; i += 1) {
    const y = (VIEW_HEIGHT / segments) * i;
    x += Math.random() * 74 - 37;
    x = Math.max(12, Math.min(VIEW_WIDTH - 12, x));
    path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return path;
}

function buildBolts(count: number): Bolt[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    d: buildBoltPath(),
    left: `${8 + id * (84 / count) + Math.random() * 6}%`,
    height: `${44 + Math.random() * 18}%`,
    delay: `${(id * 0.85 + Math.random() * 0.6).toFixed(2)}s`,
    duration: `${(3.2 + Math.random() * 2.4).toFixed(2)}s`,
  }));
}

interface LightningLayerProps {
  active: boolean;
  intensified: boolean;
}

export function LightningLayer({ active, intensified }: LightningLayerProps) {
  const bolts = useMemo(() => buildBolts(5), []);

  const classNames = [
    "lightning-layer",
    active ? "lightning-layer--active" : "",
    intensified ? "lightning-layer--intensified" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className="lightning-layer__bolt"
          style={{
            left: bolt.left,
            height: bolt.height,
            animationDelay: bolt.delay,
            animationDuration: bolt.duration,
          }}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path d={bolt.d} className="lightning-layer__path" />
        </svg>
      ))}
      <div className="lightning-layer__ambient" />
    </div>
  );
}
