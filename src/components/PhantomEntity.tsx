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
        <div className="phantom-entity__mist" />
        <img
          className="phantom-entity__figure"
          src="/phantom/phantom-lightning.webp"
          alt=""
          draggable={false}
        />
        <div className="phantom-entity__aura" />
        <div className="phantom-entity__core">
          <span className="phantom-entity__rays" />
        </div>
        <div className="phantom-entity__flash" />
        <span className="phantom-entity__wisp phantom-entity__wisp--one" />
        <span className="phantom-entity__wisp phantom-entity__wisp--two" />
        <span className="phantom-entity__wisp phantom-entity__wisp--three" />
      </div>
    </div>
  );
}
