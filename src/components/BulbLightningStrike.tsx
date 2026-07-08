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
        startX: STRIKE_X + 6,
        endX: STRIKE_X,
        branchCount: 4,
        roughness: 36,
        branchMaxY: BOLT_HEIGHT * 0.56,
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
          <linearGradient id="bolt-channel-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8daf8" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#eef6ff" stopOpacity="0.95" />
            <stop offset="88%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff6e8" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="bolt-corona-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8aaee8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#b8d8ff" stopOpacity="0.5" />
          </linearGradient>
          <filter id="bolt-corona-blur" x="-100%" y="-5%" width="300%" height="110%">
            <feGaussianBlur stdDeviation="2.8" />
          </filter>
        </defs>

        {bolt.branches.map((d, i) => (
          <path
            key={`corona-b-${i}`}
            d={d}
            className="bulb-strike__corona bulb-strike__corona--branch"
            pathLength={100}
          />
        ))}
        <path d={bolt.main} className="bulb-strike__corona" pathLength={100} />

        {bolt.branches.map((d, i) => (
          <path
            key={`glow-b-${i}`}
            d={d}
            className="bulb-strike__glow bulb-strike__glow--branch"
            pathLength={100}
          />
        ))}
        <path d={bolt.main} className="bulb-strike__glow" pathLength={100} />

        {bolt.branches.map((d, i) => (
          <path
            key={`core-b-${i}`}
            d={d}
            className="bulb-strike__core bulb-strike__core--branch"
            pathLength={100}
          />
        ))}
        <path d={bolt.main} className="bulb-strike__core" pathLength={100} />

        <circle className="bulb-strike__terminus" cx={STRIKE_X} cy={BOLT_HEIGHT} r={3.5} />
      </svg>
    </div>
  );
}
