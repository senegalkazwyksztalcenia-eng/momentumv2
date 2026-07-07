import { useMemo } from "react";
import { generateBolt } from "../lib/lightning";
import "./PhantomEntity.css";

const STRIKE_WIDTH = 160;
const STRIKE_HEIGHT = 1000;

interface PhantomEntityProps {
  striking: boolean;
  surging: boolean;
  settled: boolean;
}

export function PhantomEntity({
  striking,
  surging,
  settled,
}: PhantomEntityProps) {
  const strike = useMemo(
    () =>
      generateBolt(STRIKE_WIDTH, STRIKE_HEIGHT, 913, {
        branchCount: 5,
        roughness: STRIKE_WIDTH * 0.55,
        startX: STRIKE_WIDTH * 0.45,
        endX: STRIKE_WIDTH * 0.5,
      }),
    [],
  );

  const classNames = [
    "phantom-entity",
    striking ? "phantom-entity--strike" : "",
    surging ? "phantom-entity--surging" : "",
    settled ? "phantom-entity--settled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <svg
        className="phantom-entity__strike-bolt"
        viewBox={`0 0 ${STRIKE_WIDTH} ${STRIKE_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <path d={strike.main} className="phantom-entity__strike-glow" />
        {strike.branches.map((d, i) => (
          <path
            key={`g-${i}`}
            d={d}
            className="phantom-entity__strike-glow phantom-entity__strike-glow--branch"
          />
        ))}
        <path d={strike.main} className="phantom-entity__strike-core" />
        {strike.branches.map((d, i) => (
          <path
            key={`c-${i}`}
            d={d}
            className="phantom-entity__strike-core phantom-entity__strike-core--branch"
          />
        ))}
      </svg>

      <div className="phantom-entity__float">
        <div className="phantom-entity__mist" />
        <img
          className="phantom-entity__figure"
          src="/phantom/phantom-lightning.webp"
          alt=""
          draggable={false}
        />
        <div className="phantom-entity__chest-light" aria-hidden="true">
          <span className="phantom-entity__chest-halo phantom-entity__chest-halo--outer" />
          <span className="phantom-entity__chest-halo phantom-entity__chest-halo--mid" />
          <span className="phantom-entity__chest-halo phantom-entity__chest-halo--inner" />
          <span className="phantom-entity__chest-hotspot" />
        </div>
        <span className="phantom-entity__wisp phantom-entity__wisp--one" />
        <span className="phantom-entity__wisp phantom-entity__wisp--two" />
        <span className="phantom-entity__wisp phantom-entity__wisp--three" />
      </div>
    </div>
  );
}
