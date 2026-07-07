import { useMemo } from "react";
import { generateInwardBolt } from "../lib/lightning";
import "./SalesCTA.css";

const BOLT_WIDTH = 200;
const BOLT_HEIGHT = 72;

interface SalesCTAProps {
  visible: boolean;
}

function BoltSvg({
  bolt,
  side,
  delay,
  duration,
}: {
  bolt: ReturnType<typeof generateInwardBolt>;
  side: "left" | "right";
  delay: string;
  duration: string;
}) {
  return (
    <svg
      className={`sales-cta__bolt sales-cta__bolt--${side}`}
      style={{ animationDelay: delay, animationDuration: duration }}
      viewBox={`0 0 ${BOLT_WIDTH} ${BOLT_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={bolt.main} className="sales-cta__bolt-glow" />
      {bolt.branches.map((d, i) => (
        <path
          key={`g-${i}`}
          d={d}
          className="sales-cta__bolt-glow sales-cta__bolt-glow--branch"
        />
      ))}
      <path d={bolt.main} className="sales-cta__bolt-core" />
      {bolt.branches.map((d, i) => (
        <path
          key={`c-${i}`}
          d={d}
          className="sales-cta__bolt-core sales-cta__bolt-core--branch"
        />
      ))}
    </svg>
  );
}

export function SalesCTA({ visible }: SalesCTAProps) {
  const leftBolts = useMemo(
    () => [
      {
        geometry: generateInwardBolt(BOLT_WIDTH, BOLT_HEIGHT, 401, true, {
          branchCount: 3,
          roughness: BOLT_HEIGHT * 0.42,
        }),
        delay: "0s",
        duration: "2.1s",
      },
      {
        geometry: generateInwardBolt(BOLT_WIDTH, BOLT_HEIGHT, 587, true, {
          branchCount: 2,
          roughness: BOLT_HEIGHT * 0.36,
        }),
        delay: "0.55s",
        duration: "2.6s",
      },
    ],
    [],
  );

  const rightBolts = useMemo(
    () => [
      {
        geometry: generateInwardBolt(BOLT_WIDTH, BOLT_HEIGHT, 713, false, {
          branchCount: 3,
          roughness: BOLT_HEIGHT * 0.42,
        }),
        delay: "0.3s",
        duration: "2.3s",
      },
      {
        geometry: generateInwardBolt(BOLT_WIDTH, BOLT_HEIGHT, 829, false, {
          branchCount: 2,
          roughness: BOLT_HEIGHT * 0.36,
        }),
        delay: "0.85s",
        duration: "2.8s",
      },
    ],
    [],
  );

  return (
    <div
      className={`sales-cta ${visible ? "sales-cta--visible" : ""}`}
      aria-hidden={!visible}
    >
      <a
        className="sales-cta__pill"
        href="#teraz"
        tabIndex={visible ? 0 : -1}
      >
        <span className="sales-cta__rim-flare sales-cta__rim-flare--top" />
        <span className="sales-cta__rim-flare sales-cta__rim-flare--bottom" />
        <span className="sales-cta__glass" aria-hidden="true" />
        <div className="sales-cta__bolts sales-cta__bolts--left" aria-hidden="true">
          {leftBolts.map((bolt, i) => (
            <BoltSvg
              key={`l-${i}`}
              bolt={bolt.geometry}
              side="left"
              delay={bolt.delay}
              duration={bolt.duration}
            />
          ))}
        </div>
        <div className="sales-cta__bolts sales-cta__bolts--right" aria-hidden="true">
          {rightBolts.map((bolt, i) => (
            <BoltSvg
              key={`r-${i}`}
              bolt={bolt.geometry}
              side="right"
              delay={bolt.delay}
              duration={bolt.duration}
            />
          ))}
        </div>
        <span className="sales-cta__label">TERAZ</span>
        <span className="sales-cta__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="sales-cta__arrow-icon">
            <path
              d="M9.5 7.5 14.5 12 9.5 16.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
