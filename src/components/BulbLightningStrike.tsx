import { useMemo } from "react";
import { generateBolt } from "../lib/lightning";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = 200;
const BOLT_HEIGHT = 580;
const STRIKE_X = BOLT_WIDTH / 2;

export function BulbLightningStrike() {
  const bolt = useMemo(
    () =>
      generateBolt(BOLT_WIDTH, BOLT_HEIGHT, 1337, {
        startX: STRIKE_X,
        endX: STRIKE_X,
        branchCount: 0,
        roughness: 62,
      }),
    [],
  );

  return (
    <div className="bulb-strike" aria-hidden="true">
      <svg
        className="bulb-strike__svg"
        viewBox={`0 0 ${BOLT_WIDTH} ${BOLT_HEIGHT}`}
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <filter id="bolt-haze-filter" x="-80%" y="-10%" width="260%" height="120%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bolt-core-filter" x="-60%" y="-10%" width="220%" height="120%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={bolt.main} className="bulb-strike__haze" pathLength={100} />
        <path d={bolt.main} className="bulb-strike__glow" pathLength={100} />
        <path d={bolt.main} className="bulb-strike__core" pathLength={100} />

        <circle
          className="bulb-strike__terminus-halo bulb-strike__terminus-halo--outer"
          cx={STRIKE_X}
          cy={BOLT_HEIGHT}
          r={22}
        />
        <circle
          className="bulb-strike__terminus-halo bulb-strike__terminus-halo--inner"
          cx={STRIKE_X}
          cy={BOLT_HEIGHT}
          r={12}
        />
        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={BOLT_HEIGHT} r={7} />
      </svg>
    </div>
  );
}
