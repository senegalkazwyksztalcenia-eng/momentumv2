import "./SalesCTA.css";

interface SalesCTAProps {
  visible: boolean;
}

export function SalesCTA({ visible }: SalesCTAProps) {
  return (
    <div
      className={`sales-cta ${visible ? "sales-cta--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="sales-cta__singularity">
        <span className="sales-cta__field sales-cta__field--outer" aria-hidden="true" />
        <span className="sales-cta__field sales-cta__field--mid" aria-hidden="true" />
        <span className="sales-cta__field sales-cta__field--inner" aria-hidden="true" />
        <span className="sales-cta__orbit sales-cta__orbit--one" aria-hidden="true" />
        <span className="sales-cta__orbit sales-cta__orbit--two" aria-hidden="true" />
        <span className="sales-cta__flare" aria-hidden="true" />

        <a
          className="sales-cta__core"
          href="#teraz"
          tabIndex={visible ? 0 : -1}
        >
          <span className="sales-cta__core-halo" aria-hidden="true" />
          <span className="sales-cta__core-light" aria-hidden="true" />
          <span className="sales-cta__label">TERAZ</span>
        </a>
      </div>
    </div>
  );
}
