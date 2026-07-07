import { useMemo } from "react";
import "./LightningLayer.css";

type BoltSize = "big" | "small";

interface Bolt {
  id: number;
  size: BoltSize;
  main: string;
  branches: string[];
  left: string;
  width: string;
  height: string;
  top: string;
  delay: string;
  duration: string;
  flip: boolean;
}

const VIEW_W = 100;
const VIEW_H = 1000;

interface Point {
  x: number;
  y: number;
}

function clampX(x: number): number {
  return Math.max(5, Math.min(VIEW_W - 5, x));
}

/** Build the jagged trunk of a bolt as a list of points from top to bottom. */
function buildTrunk(size: BoltSize): Point[] {
  const segments = size === "big" ? 9 : 7;
  const wander = size === "big" ? 16 : 14;
  const points: Point[] = [];
  let x = VIEW_W / 2 + (Math.random() * 16 - 8);
  points.push({ x: clampX(x), y: 0 });
  for (let i = 1; i <= segments; i += 1) {
    const y = (VIEW_H / segments) * i;
    x += Math.random() * wander * 2 - wander;
    points.push({ x: clampX(x), y });
  }
  return points;
}

function pointsToPath(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

/** Fork shorter branches off the trunk so strikes look like real lightning. */
function buildBranches(trunk: Point[], size: BoltSize): string[] {
  const count =
    size === "big" ? 2 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2);
  const branches: string[] = [];
  for (let b = 0; b < count; b += 1) {
    const startIdx = 1 + Math.floor(Math.random() * (trunk.length - 2));
    const start = trunk[startIdx];
    const dir = Math.random() < 0.5 ? -1 : 1;
    const legs = 2 + Math.floor(Math.random() * 3);
    const points: Point[] = [{ x: start.x, y: start.y }];
    let x = start.x;
    let y = start.y;
    for (let l = 0; l < legs; l += 1) {
      x += dir * (6 + Math.random() * 12) - (Math.random() * 6 - 3);
      y += (VIEW_H / (trunk.length - 1)) * (0.4 + Math.random() * 0.6);
      points.push({ x: clampX(x), y: Math.min(VIEW_H, y) });
    }
    branches.push(pointsToPath(points));
  }
  return branches;
}

function buildBolts(): Bolt[] {
  const specs: Array<{ size: BoltSize; left: number; height: number; width: number }> = [
    { size: "big", left: 24, height: 90, width: 12 },
    { size: "big", left: 70, height: 86, width: 13 },
    { size: "big", left: 48, height: 94, width: 11 },
    { size: "small", left: 12, height: 42, width: 7 },
    { size: "small", left: 34, height: 38, width: 6 },
    { size: "small", left: 58, height: 44, width: 7 },
    { size: "small", left: 82, height: 40, width: 7 },
    { size: "small", left: 90, height: 32, width: 6 },
  ];

  return specs.map((spec, id) => {
    const trunk = buildTrunk(spec.size);
    return {
      id,
      size: spec.size,
      main: pointsToPath(trunk),
      branches: buildBranches(trunk, spec.size),
      left: `${spec.left + (Math.random() * 6 - 3)}%`,
      width: `${spec.width}vw`,
      height: `${spec.height}%`,
      top: spec.size === "big" ? "0%" : `${Math.random() * 10}%`,
      delay: `${(Math.random() * (spec.size === "big" ? 5.5 : 4)).toFixed(2)}s`,
      duration: `${
        spec.size === "big"
          ? (4.2 + Math.random() * 3).toFixed(2)
          : (2.6 + Math.random() * 2.4).toFixed(2)
      }s`,
      flip: Math.random() < 0.5,
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
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className={`lightning-layer__bolt lightning-layer__bolt--${bolt.size}`}
          style={{
            left: bolt.left,
            top: bolt.top,
            width: bolt.width,
            height: bolt.height,
            animationDelay: bolt.delay,
            animationDuration: bolt.duration,
            transform: bolt.flip ? "scaleX(-1)" : undefined,
          }}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
        >
          <path d={bolt.main} className="lightning-layer__glow" />
          {bolt.branches.map((d, i) => (
            <path key={i} d={d} className="lightning-layer__glow" />
          ))}
          {bolt.branches.map((d, i) => (
            <path key={`c-${i}`} d={d} className="lightning-layer__core" />
          ))}
          <path d={bolt.main} className="lightning-layer__core" />
        </svg>
      ))}
      <div className="lightning-layer__ambient" />
      <div className="lightning-layer__strike-flash" />
    </div>
  );
}
