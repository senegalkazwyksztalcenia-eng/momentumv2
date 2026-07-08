import { useMemo } from "react";
import { generateBolt } from "../lib/lightning";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = 260;
const BOLT_HEIGHT = 580;
const STRIKE_X = BOLT_WIDTH / 2;

function renderPaths(
  paths: string[],
  layers: { className: string; keyPrefix: string }[],
) {
  return layers.flatMap(({ className, keyPrefix }) =>
    paths.map((d, i) => (
      <path key={`${keyPrefix}-${i}`} d={d} className={className} pathLength={100} />
    )),
  );
}

export function BulbLightningStrike() {
  const bolt = useMemo(
    () =>
      generateBolt(BOLT_WIDTH, BOLT_HEIGHT, 1337, {
        startX: STRIKE_X - 8,
        endX: STRIKE_X,
        branchCount: 10,
        roughness: 46,
        branchMaxY: BOLT_HEIGHT * 0.61,
      }),
    [],
  );

  const forkPaths = [...bolt.branches, ...bolt.twigs];

  return (
    <div className="bulb-strike" aria-hidden="true">
      <svg
        className="bulb-strike__svg"
        viewBox={`0 0 ${BOLT_WIDTH} ${BOLT_HEIGHT}`}
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="bolt-core-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8eeff" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="bolt-aura-filter" x="-120%" y="-5%" width="340%" height="115%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-blue-filter" x="-80%" y="-5%" width="260%" height="115%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {renderPaths(forkPaths, [
          { className: "bulb-strike__aura bulb-strike__aura--fork", keyPrefix: "aura-f" },
        ])}
        <path d={bolt.main} className="bulb-strike__aura" pathLength={100} />

        {renderPaths(forkPaths, [
          { className: "bulb-strike__corona bulb-strike__corona--fork", keyPrefix: "corona-f" },
        ])}
        <path d={bolt.main} className="bulb-strike__corona" pathLength={100} />

        {renderPaths(forkPaths, [
          { className: "bulb-strike__glow bulb-strike__glow--fork", keyPrefix: "glow-f" },
        ])}
        <path d={bolt.main} className="bulb-strike__glow" pathLength={100} />

        {renderPaths(forkPaths, [
          { className: "bulb-strike__core bulb-strike__core--fork", keyPrefix: "core-f" },
        ])}
        <path d={bolt.main} className="bulb-strike__core" pathLength={100} />

        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={BOLT_HEIGHT} r={4} />
      </svg>
    </div>
  );
}
