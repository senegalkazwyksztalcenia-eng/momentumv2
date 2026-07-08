import { useMemo } from "react";
import { generateBolt } from "../lib/lightning";
import "./BulbLightningStrike.css";

const BOLT_WIDTH = 180;
const BOLT_HEIGHT = 560;

export function BulbLightningStrike() {
  const bolt = useMemo(
    () =>
      generateBolt(BOLT_WIDTH, BOLT_HEIGHT, 1337, {
        startX: BOLT_WIDTH / 2,
        endX: BOLT_WIDTH / 2,
        branchCount: 0,
        roughness: 48,
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
        <path d={bolt.main} className="bulb-strike__glow" pathLength={100} />
        <path d={bolt.main} className="bulb-strike__core" pathLength={100} />
        <circle
          className="bulb-strike__terminus"
          cx={BOLT_WIDTH / 2}
          cy={BOLT_HEIGHT}
          r={5}
        />
      </svg>
    </div>
  );
}
