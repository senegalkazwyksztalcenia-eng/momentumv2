import "./SalesCTA.css";

interface SalesCTAProps {
  visible: boolean;
  forging?: boolean;
}

export function SalesCTA({ visible, forging = false }: SalesCTAProps) {
  return (
    <div
      className={[
        "sales-cta",
        visible ? "sales-cta--visible" : "",
        forging ? "sales-cta--forging" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!visible}
    >
      <a
        href="#teraz"
        className="solar-cta"
        tabIndex={visible ? 0 : -1}
      >
        <span className="solar-cta__sun" />
        <span className="solar-cta__text">ODKRYJ TERAZ</span>
        <span className="solar-cta__arrow">›</span>
      </a>
    </div>
  );
}
