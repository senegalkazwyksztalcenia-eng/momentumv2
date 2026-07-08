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
            <stop offset="0%" stopColor="#b8d4f8" />
            <stop offset="35%" stopColor="#eef8ff" />
            <stop offset="72%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fffaf0" />
          </linearGradient>
          <filter id="bolt-aura-filter" x="-120%" y="-5%" width="340%" height="115%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-blue-filter" x="-80%" y="-5%" width="260%" height="115%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
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
