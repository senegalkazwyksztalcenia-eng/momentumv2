import { useMemo } from "react";
import "./LightningLayer.css";

interface Bolt {
  id: number;
  paths: string[];
  left: string;
  height: string;
  delay: string;
  duration: string;
  width: string;
  main: boolean;
}

const VIEW_WIDTH = 260;
const VIEW_HEIGHT = 900;

function makeRand(seed: number) {
  return (n: number) => {
    const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
}

function buildBoltPaths(seed: number, main: boolean): string[] {
  const rand = makeRand(seed);
  const segments = main ? 11 : 8;
  const jitter = main ? 62 : 46;

  let x = VIEW_WIDTH / 2 + (rand(1) * 40 - 20);
  let path = `M ${x.toFixed(1)} 0`;
  const points: Array<{ x: number; y: number }> = [{ x, y: 0 }];

  for (let i = 1; i <= segments; i += 1) {
    const y = (VIEW_HEIGHT / segments) * i;
    x += rand(i + 2) * jitter * 2 - jitter;
    x = Math.max(8, Math.min(VIEW_WIDTH - 8, x));
    path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    points.push({ x, y });
  }

  const paths = [path];
  const branchCount = main ? 4 : 2;
  for (let b = 0; b < branchCount; b += 1) {
    const at = points[2 + Math.floor(rand(20 + b) * (points.length - 4))]!;
    const dir = rand(30 + b) > 0.5 ? 1 : -1;
    let bx = at.x;
    let by = at.y;
    let bPath = `M ${bx.toFixed(1)} ${by.toFixed(1)}`;
    const bSegs = 3 + Math.floor(rand(40 + b) * 3);
    for (let s = 0; s < bSegs; s += 1) {
      bx += dir * (10 + rand(50 + b * 7 + s) * 26);
      by += 24 + rand(60 + b * 7 + s) * 40;
      bx = Math.max(4, Math.min(VIEW_WIDTH - 4, bx));
      bPath += ` L ${bx.toFixed(1)} ${by.toFixed(1)}`;
    }
    paths.push(bPath);
  }

  return paths;
}

function buildBolts(): Bolt[] {
  // Side placement only: keep the center clear so no bolt hits the phantom.
  const slots = [
    { left: 3, main: true },
    { left: 12, main: false },
    { left: 19, main: false },
    { left: 72, main: false },
    { left: 80, main: true },
    { left: 90, main: false },
  ];

  return slots.map((slot, id) => {
    const seed = id * 23 + 7;
    const rand = makeRand(seed);
    return {
      id,
      paths: buildBoltPaths(seed, slot.main),
      left: `${slot.left + rand(1) * 3}%`,
      height: `${slot.main ? 78 + rand(2) * 16 : 50 + rand(2) * 22}%`,
      width: slot.main ? "17vw" : "12vw",
      delay: `${(id * 0.42 + rand(4) * 0.9).toFixed(2)}s`,
      duration: `${(2.2 + rand(5) * 2.4).toFixed(2)}s`,
      main: slot.main,
    };
  });
}

interface LightningLayerProps {
  active: boolean;
  intensified: boolean;
}

export function LightningLayer({ active, intensified }: LightningLayerProps) {
  const bolts = useMemo(() => buildBolts(), []);

  const classNames = [
    "lightning-layer",
    active ? "lightning-layer--active" : "",
    intensified ? "lightning-layer--intensified" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="lightning-layer__cloud lightning-layer__cloud--tl" />
      <div className="lightning-layer__cloud lightning-layer__cloud--tr" />
      <div className="lightning-layer__cloud lightning-layer__cloud--bl" />
      <div className="lightning-layer__cloud lightning-layer__cloud--br" />
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className={`lightning-layer__bolt ${bolt.main ? "lightning-layer__bolt--main" : ""}`}
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
          {bolt.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              className={
                i === 0
                  ? "lightning-layer__path"
                  : "lightning-layer__path lightning-layer__path--branch"
              }
            />
          ))}
        </svg>
      ))}
      <div className="lightning-layer__ambient" />
    </div>
  );
}
