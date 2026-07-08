import "./SalesCTA.css";

interface SalesCTAProps {
  visible: boolean;
  forging?: boolean;
  empowered?: boolean;
}

export function SalesCTA({ visible, forging = false, empowered = false }: SalesCTAProps) {
  return (
    <div
      className={[
        "sales-cta",
        visible ? "sales-cta--visible" : "",
        forging ? "sales-cta--forging" : "",
        empowered ? "sales-cta--empowered" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!visible}
    >
      {forging ? <span className="sales-cta__handoff-glow" aria-hidden="true" /> : null}
      <a
        href="#odkryj"
        className="solar-cta"
        tabIndex={visible ? 0 : -1}
      >
        <span className="solar-cta__pill">
          <span className="solar-cta__text">ODKRYJ TERAZ</span>
          <span className="solar-cta__arrow">›</span>
        </span>
      </a>
    </div>
  );
}
