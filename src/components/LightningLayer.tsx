import { useMemo } from "react";
import "./LightningLayer.css";

interface Bolt {
  id: number;
  d: string;
  branchD?: string;
  left: string;
  height: string;
  delay: string;
  duration: string;
  width: string;
}

const VIEW_WIDTH = 220;
const VIEW_HEIGHT = 720;

function buildBoltPath(seed: number): { main: string; branch?: string } {
  const rand = (n: number) => {
    const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  const segments = 7;
  let x = VIEW_WIDTH / 2 + (rand(1) * 60 - 30);
  let path = `M ${x.toFixed(1)} 0`;
  const points: Array<{ x: number; y: number }> = [{ x, y: 0 }];

  for (let i = 1; i <= segments; i += 1) {
    const y = (VIEW_HEIGHT / segments) * i;
    x += rand(i + 2) * 88 - 44;
    x = Math.max(10, Math.min(VIEW_WIDTH - 10, x));
    path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    points.push({ x, y });
  }

  const mid = points[Math.floor(points.length * 0.42)]!;
  const branchX = mid.x + (rand(9) > 0.5 ? 1 : -1) * (28 + rand(10) * 22);
  const branchY = mid.y + 40 + rand(11) * 50;
  const branch = `M ${mid.x.toFixed(1)} ${mid.y.toFixed(1)} L ${branchX.toFixed(1)} ${branchY.toFixed(1)}`;

  return rand(12) > 0.25 ? { main: path, branch } : { main: path };
}

function buildBolts(count: number): Bolt[] {
  return Array.from({ length: count }, (_, id) => {
    const seed = id * 17 + 3;
    const { main, branch } = buildBoltPath(seed);
    const rand = (n: number) => {
      const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return {
      id,
      d: main,
      branchD: branch,
      left: `${4 + id * (92 / count) + rand(1) * 5}%`,
      height: `${52 + rand(2) * 24}%`,
      width: `${14 + rand(3) * 6}vw`,
      delay: `${(id * 0.55 + rand(4) * 0.8).toFixed(2)}s`,
      duration: `${(2.4 + rand(5) * 2.2).toFixed(2)}s`,
    };
  });
}

interface LightningLayerProps {
  active: boolean;
  intensified: boolean;
}

export function LightningLayer({ active, intensified }: LightningLayerProps) {
  const bolts = useMemo(() => buildBolts(8), []);

  const classNames = [
    "lightning-layer",
    active ? "lightning-layer--active" : "",
    intensified ? "lightning-layer--intensified" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="lightning-layer__storm-glow" />
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className="lightning-layer__bolt"
          style={{
            left: bolt.left,
            height: bolt.height,
            width: bolt.width,
            animationDelay: bolt.delay,
            animationDuration: bolt.duration,
          }}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path d={bolt.d} className="lightning-layer__path" />
          {bolt.branchD ? (
            <path d={bolt.branchD} className="lightning-layer__path lightning-layer__path--branch" />
          ) : null}
        </svg>
      ))}
      <div className="lightning-layer__ambient" />
    </div>
  );
}
