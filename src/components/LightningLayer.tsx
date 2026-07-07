import { useMemo } from "react";
import { generateBolt } from "../lib/lightning";
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
  isMain: boolean;
}

function buildBolts(): Bolt[] {
  // Side placement only: the center belongs to the phantom strike bolt.
  const slots = [
    { left: 2, main: true },
    { left: 11, main: false },
    { left: 19, main: false },
    { left: 71, main: false },
    { left: 79, main: true },
    { left: 89, main: false },
  ];

  return slots.map((slot, id) => {
    const seed = id * 101 + 17;
    const geometry = generateBolt(VIEW_WIDTH, VIEW_HEIGHT, seed, {
      branchCount: slot.main ? 5 : 3,
      roughness: VIEW_WIDTH * (slot.main ? 0.5 : 0.4),
    });
    const jitter = ((seed * 7) % 10) / 3;
    return {
      id,
      main: geometry.main,
      branches: geometry.branches,
      left: `${slot.left + jitter}%`,
      height: `${slot.main ? 80 + (seed % 14) : 52 + (seed % 22)}%`,
      width: slot.main ? "17vw" : "12vw",
      delay: `${(id * 0.42 + ((seed % 9) / 10)).toFixed(2)}s`,
      duration: `${(2.2 + ((seed % 12) / 5)).toFixed(2)}s`,
      isMain: slot.main,
    };
  });
}

interface LightningLayerProps {
  active: boolean;
  intensified: boolean;
}

export function LightningLayer({ active, intensified }: LightningLayerProps) {
  const bolts = useMemo(() => buildBolts(), []);

  const classNames = [
    "lightning-layer",
    active ? "lightning-layer--active" : "",
    intensified ? "lightning-layer--intensified" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="lightning-layer__cloud lightning-layer__cloud--tl" />
      <div className="lightning-layer__cloud lightning-layer__cloud--tr" />
      <div className="lightning-layer__cloud lightning-layer__cloud--bl" />
      <div className="lightning-layer__cloud lightning-layer__cloud--br" />
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className={`lightning-layer__bolt ${bolt.isMain ? "lightning-layer__bolt--main" : ""}`}
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
