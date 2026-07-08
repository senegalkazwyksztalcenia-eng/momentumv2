import { useMemo, type CSSProperties } from "react";
import { generateBolt, type BoltPath } from "../lib/lightning";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = 300;
const BOLT_HEIGHT = 620;
const STRIKE_X = BOLT_WIDTH / 2;

type Layer = "corona" | "halo" | "glow" | "core";

interface BulbLightningStrikeProps {
  strikeKey: number;
}

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

export function BulbLightningStrike({ strikeKey }: BulbLightningStrikeProps) {
  const bolt = useMemo(
    () =>
      generateBolt(BOLT_WIDTH, BOLT_HEIGHT, 1337 + strikeKey * 7919, {
        endX: STRIKE_X,
        branchMaxY: BOLT_HEIGHT * 0.62,
        roughness: BOLT_WIDTH * 0.38,
      }),
    [strikeKey],
  );

  const allPaths = [bolt.main, ...bolt.forks];

  return (
    <div className="bulb-strike" aria-hidden="true">
      <div className="bulb-strike__ion-flash" />
      <svg
        className="bulb-strike__svg"
        viewBox={`0 0 ${BOLT_WIDTH} ${BOLT_HEIGHT}`}
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="bolt-core-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8c8e8" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#f0f6ff" />
            <stop offset="72%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="bolt-corona-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(100, 140, 255, 0.15)" />
            <stop offset="45%" stopColor="rgba(160, 190, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(200, 220, 255, 0.2)" />
          </linearGradient>
          <filter id="bolt-corona-filter" x="-120%" y="-6%" width="340%" height="112%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="bolt-halo-filter" x="-100%" y="-5%" width="300%" height="110%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <filter id="bolt-core-bloom" x="-60%" y="-4%" width="220%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-thread-filter" x="-50%" y="-4%" width="200%" height="108%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {renderLayer(allPaths, "corona", "c")}
        {renderLayer(allPaths, "halo", "h")}
        {renderLayer(allPaths, "glow", "g")}
        {renderLayer(allPaths, "core", "k")}

        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={BOLT_HEIGHT} r={3.6} />
        <circle className="bulb-strike__terminus-aura" cx={STRIKE_X} cy={BOLT_HEIGHT} r={9} />
      </svg>
    </div>
  );
}
