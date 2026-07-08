import { useMemo, type CSSProperties } from "react";
import { generateBolt, type BoltPath } from "../lib/lightning";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = 280;
const BOLT_HEIGHT = 600;
const STRIKE_X = BOLT_WIDTH / 2;

type Layer = "aura" | "corona" | "glow" | "core";

function layerClass(layer: Layer, path: BoltPath): string {
  const base = `bulb-strike__${layer}`;
  if (path.kind === "main") return base;
  return `${base} ${base}--fork ${base}--${path.kind}`;
}

function pathStyle(path: BoltPath): CSSProperties {
  return {
    "--fork-intensity": String(path.intensity),
    "--fork-delay": `${path.delay}`,
  } as CSSProperties;
}

function renderLayer(paths: BoltPath[], layer: Layer, keyPrefix: string) {
  return paths.map((path, i) => (
    <path
      key={`${keyPrefix}-${layer}-${i}`}
      d={path.d}
      className={layerClass(layer, path)}
      pathLength={100}
      style={pathStyle(path)}
    />
  ));
}

export function BulbLightningStrike() {
  const bolt = useMemo(
    () =>
      generateBolt(BOLT_WIDTH, BOLT_HEIGHT, 1337, {
        endX: STRIKE_X,
        branchMaxY: BOLT_HEIGHT * 0.6,
      }),
    [],
  );

  const allPaths = [bolt.main, ...bolt.forks];

  return (
    <div className="bulb-strike" aria-hidden="true">
      <svg
        className="bulb-strike__svg"
        viewBox={`0 0 ${BOLT_WIDTH} ${BOLT_HEIGHT}`}
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="bolt-core-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8d4f8" />
            <stop offset="45%" stopColor="#f4f8ff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="bolt-violet-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8898d8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#b0c4de" stopOpacity="0.75" />
          </linearGradient>
          <filter id="bolt-aura-filter" x="-140%" y="-5%" width="380%" height="120%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-blue-filter" x="-100%" y="-5%" width="300%" height="115%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-thread-filter" x="-60%" y="-5%" width="220%" height="110%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        {renderLayer(allPaths, "aura", "a")}
        {renderLayer(allPaths, "corona", "c")}
        {renderLayer(allPaths, "glow", "g")}
        {renderLayer(allPaths, "core", "k")}

        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={BOLT_HEIGHT} r={3.5} />
      </svg>
    </div>
  );
}
