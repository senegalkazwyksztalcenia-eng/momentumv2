import "./PhantomEntity.css";

const PHANTOM_SRC = `${import.meta.env.BASE_URL}phantom/phantom-lightning.webp?v=restore1`;

interface PhantomEntityProps {
  visible: boolean;
}

export function PhantomEntity({ visible }: PhantomEntityProps) {
  const classNames = [
    "phantom-entity",
    visible ? "phantom-entity--visible" : "phantom-entity--hidden",
  ].join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      <div className="phantom-entity__float">
        <div className="phantom-entity__aura" aria-hidden="true" />
        <div className="phantom-entity__mist" />
        <img
          className="phantom-entity__figure"
          src={PHANTOM_SRC}
          alt=""
          width={595}
          height={1353}
          decoding="async"
          fetchPriority="high"
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
