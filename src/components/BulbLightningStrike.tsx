import { useMemo, type CSSProperties } from "react";
import { generateBolt, type BoltPath } from "../lib/lightning";
import {
  BULB_STRIKE_X,
  BULB_STRIKE_Y,
  BULB_VIEW_HEIGHT,
  BULB_VIEW_WIDTH,
} from "../lib/bulbGeometry";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = BULB_VIEW_WIDTH * 2.5;
const BOLT_HEIGHT = BULB_VIEW_HEIGHT * 3.55;
const STRIKE_X = (BULB_STRIKE_X / BULB_VIEW_WIDTH) * BOLT_WIDTH;
const STRIKE_Y = (BULB_STRIKE_Y / BULB_VIEW_HEIGHT) * BOLT_HEIGHT;

type Layer = "violet" | "blue" | "core";

interface BulbLightningStrikeProps {
  strikeKey: number;
}

function layerClass(layer: Layer, path: BoltPath, isMain: boolean): string {
  const base = `bulb-strike__${layer}`;
  if (isMain) return `${base} ${base}--main`;
  return `${base} ${base}--fork ${base}--${path.kind}`;
}

function pathStyle(path: BoltPath): CSSProperties {
  return {
    "--fork-intensity": String(path.intensity),
    "--fork-delay": `${path.delay}`,
  } as CSSProperties;
}

function renderLayer(
  paths: BoltPath[],
  layer: Layer,
  keyPrefix: string,
  isMain: boolean,
) {
  return paths.map((path, i) => (
    <path
      key={`${keyPrefix}-${layer}-${i}`}
      d={path.d}
      className={layerClass(layer, path, isMain)}
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
        endY: STRIKE_Y,
        branchMaxY: BOLT_HEIGHT * 0.58,
        roughness: BOLT_WIDTH * 0.36,
      }),
    [strikeKey],
  );

  const main = [bolt.main];
  const forks = bolt.forks;

const VIEW_BOTTOM = STRIKE_Y + 6;

  return (
    <div className="bulb-strike" aria-hidden="true">
      <svg
        className="bulb-strike__svg"
        viewBox={`0 0 ${BOLT_WIDTH} ${VIEW_BOTTOM}`}
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="bolt-core-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8d8f0" stopOpacity="0.7" />
            <stop offset="30%" stopColor="#eef4ff" />
            <stop offset="65%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="bolt-blue-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(80, 140, 255, 0.5)" />
            <stop offset="50%" stopColor="rgba(120, 180, 255, 0.85)" />
            <stop offset="100%" stopColor="rgba(160, 210, 255, 0.7)" />
          </linearGradient>
          <linearGradient id="bolt-violet-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(90, 60, 180, 0.35)" />
            <stop offset="45%" stopColor="rgba(120, 90, 220, 0.55)" />
            <stop offset="100%" stopColor="rgba(140, 110, 230, 0.3)" />
          </linearGradient>
          <filter id="bolt-violet-filter" x="-120%" y="-5%" width="340%" height="110%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="bolt-blue-filter" x="-80%" y="-4%" width="260%" height="108%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <filter id="bolt-core-filter" x="-50%" y="-3%" width="200%" height="106%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-fork-filter" x="-40%" y="-4%" width="180%" height="108%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {renderLayer(forks, "violet", "fv", false)}
        {renderLayer(main, "violet", "mv", true)}
        {renderLayer(forks, "blue", "fb", false)}
        {renderLayer(main, "blue", "mb", true)}
        {renderLayer(main, "core", "mc", true)}

        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={STRIKE_Y} r={2.2} />
        <circle className="bulb-strike__terminus-burst" cx={STRIKE_X} cy={STRIKE_Y} r={7} />
      </svg>
    </div>
  );
}
