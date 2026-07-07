import "./PhantomEntity.css";

interface PhantomEntityProps {
  converging: boolean;
  flashing: boolean;
  settled: boolean;
}

export function PhantomEntity({
  converging,
  flashing,
  settled,
}: PhantomEntityProps) {
  const classNames = [
    "phantom-entity",
    converging ? "phantom-entity--converging" : "",
    flashing ? "phantom-entity--flash" : "",
    settled ? "phantom-entity--settled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="phantom-entity__float">
        <div className="phantom-entity__field" />
        <div className="phantom-entity__body">
          <div className="phantom-entity__mist" />
          <div className="phantom-entity__mass phantom-entity__mass--left" />
          <div className="phantom-entity__mass phantom-entity__mass--right" />
          <div className="phantom-entity__mass phantom-entity__mass--crown" />
          <div className="phantom-entity__mass phantom-entity__mass--torso" />
          <svg
            className="phantom-entity__veins"
            viewBox="0 0 200 320"
            preserveAspectRatio="none"
          >
            <path
              className="phantom-entity__vein phantom-entity__vein--a"
              d="M96 34 L106 92 L86 128 L112 166 L90 214 L108 262"
            />
            <path
              className="phantom-entity__vein phantom-entity__vein--b"
              d="M58 96 L76 148 L54 196"
            />
            <path
              className="phantom-entity__vein phantom-entity__vein--c"
              d="M146 100 L126 150 L148 202"
            />
          </svg>
          <div className="phantom-entity__core" />
          <div className="phantom-entity__flash" />
          <span className="phantom-entity__wisp phantom-entity__wisp--one" />
          <span className="phantom-entity__wisp phantom-entity__wisp--two" />
          <span className="phantom-entity__wisp phantom-entity__wisp--three" />
          <span className="phantom-entity__wisp phantom-entity__wisp--four" />
        </div>
      </div>
    </div>
  );
}
