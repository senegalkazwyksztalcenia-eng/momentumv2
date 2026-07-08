import { useMemo, type CSSProperties } from "react";
import { generateBolt, type BoltPath } from "../lib/lightning";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = 280;
const BOLT_HEIGHT = 600;
const STRIKE_X = BOLT_WIDTH / 2;

type Layer = "halo" | "glow" | "core";

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
            <stop offset="0%" stopColor="#e8eef8" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#fafcff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="bolt-halo-filter" x="-80%" y="-4%" width="260%" height="108%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <filter id="bolt-thread-filter" x="-40%" y="-4%" width="180%" height="108%">
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
        </defs>

        {renderLayer(allPaths, "halo", "h")}
        {renderLayer(allPaths, "glow", "g")}
        {renderLayer(allPaths, "core", "k")}

        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={BOLT_HEIGHT} r={2.8} />
      </svg>
    </div>
  );
}
