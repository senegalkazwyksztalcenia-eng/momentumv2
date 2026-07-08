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
        branchCount: 6,
        roughness: 52,
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
        <path d={bolt.main} className="bulb-strike__glow" />
        {bolt.branches.map((d, i) => (
          <path key={`g-${i}`} d={d} className="bulb-strike__glow bulb-strike__glow--branch" />
        ))}
        <path d={bolt.main} className="bulb-strike__core" />
        {bolt.branches.map((d, i) => (
          <path key={`c-${i}`} d={d} className="bulb-strike__core bulb-strike__core--branch" />
        ))}
      </svg>
    </div>
  );
}
