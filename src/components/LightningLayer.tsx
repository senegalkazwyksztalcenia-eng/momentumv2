import { useMemo } from "react";
import { useBreakpoint } from "../contexts/BreakpointContext";
import { generateBolt, boltPathsLegacy } from "../lib/lightning";
import "./LightningLayer.css";

const VIEW_WIDTH = 260;
const VIEW_HEIGHT = 900;

interface Bolt {
  id: number;
  main: string;
  branches: string[];
  left: string;
  height: string;
  delay: string;
  duration: string;
  width: string;
  tier: "mega" | "main" | "side";
}

function buildBolts(mega: boolean, lite: boolean): Bolt[] {
  const slots = mega
    ? lite
      ? [
          { left: 0, tier: "mega" as const },
          { left: 50, tier: "main" as const },
          { left: 92, tier: "mega" as const },
        ]
      : [
          { left: 0, tier: "mega" as const },
          { left: 18, tier: "main" as const },
          { left: 42, tier: "main" as const },
          { left: 68, tier: "main" as const },
          { left: 92, tier: "mega" as const },
        ]
    : [
        { left: 2, tier: "main" as const },
        { left: 19, tier: "side" as const },
        { left: 79, tier: "main" as const },
        { left: 89, tier: "side" as const },
      ];

  return slots.map((slot, id) => {
    const seed = id * 101 + 17;
    const isMega = slot.tier === "mega";
    const isMain = slot.tier === "main" || isMega;
    const geometry = generateBolt(VIEW_WIDTH, VIEW_HEIGHT, seed, {
      branchCount: isMega ? 4 : isMain ? 3 : 2,
      roughness: VIEW_WIDTH * (isMega ? 0.58 : isMain ? 0.5 : 0.4),
    });
    const { main, branches } = boltPathsLegacy(geometry);
    const jitter = ((seed * 7) % 10) / 3;
    return {
      id,
      main,
      branches,
      left: `${slot.left + jitter}%`,
      height: `${isMega ? 96 + (seed % 4) : isMain ? 78 + (seed % 14) : 52 + (seed % 22)}%`,
      width: isMega ? "24vw" : isMain ? "17vw" : "12vw",
      delay: `${(id * 0.16 + ((seed % 9) / 14)).toFixed(2)}s`,
      duration: `${((isMega ? 1.45 : 2.2) + (seed % 12) / 4).toFixed(2)}s`,
      tier: slot.tier,
    };
  });
}

interface LightningLayerProps {
  mega: boolean;
}

export function LightningLayer({ mega }: LightningLayerProps) {
  const isDesktop = useBreakpoint();
  const bolts = useMemo(() => buildBolts(mega, isDesktop), [mega, isDesktop]);

  const classNames = [
    "lightning-layer",
    "lightning-layer--visible",
    mega ? "lightning-layer--mega" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="lightning-layer__flash" />
      <div className="lightning-layer__cloud lightning-layer__cloud--tl" />
      <div className="lightning-layer__cloud lightning-layer__cloud--tr" />
      <div className="lightning-layer__cloud lightning-layer__cloud--bl" />
      <div className="lightning-layer__cloud lightning-layer__cloud--br" />
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className={`lightning-layer__bolt lightning-layer__bolt--${bolt.tier}`}
          style={{
            left: bolt.left,
            height: bolt.height,
            width: bolt.width,
            animationDelay: bolt.delay,
            animationDuration: bolt.duration,
          }}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path d={bolt.main} className="lightning-layer__glow" />
          {bolt.branches.map((d, i) => (
            <path
              key={`bg-${i}`}
              d={d}
              className="lightning-layer__glow lightning-layer__glow--branch"
            />
          ))}
          <path d={bolt.main} className="lightning-layer__core" />
          {bolt.branches.map((d, i) => (
            <path
              key={`bc-${i}`}
              d={d}
              className="lightning-layer__core lightning-layer__core--branch"
            />
          ))}
        </svg>
      ))}
      <div className="lightning-layer__ambient" />
    </div>
  );
}
