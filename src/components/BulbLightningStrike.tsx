import { useMemo } from "react";
import { generateBolt } from "../lib/lightning";
import "./BulbLightningStrike.css";

export function BulbLightningStrike() {
  const bolt = useMemo(
    () =>
      generateBolt(160, 380, 1337, {
        startX: 80,
        endX: 80,
        branchCount: 5,
        roughness: 42,
      }),
    [],
  );

  return (
    <div className="bulb-strike" aria-hidden="true">
      <div className="bulb-strike__flash" />
      <div className="bulb-strike__flash bulb-strike__flash--warm" />
      <svg
        className="bulb-strike__svg"
        viewBox="0 0 160 380"
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
      <span className="bulb-strike__impact" />
    </div>
  );
}
