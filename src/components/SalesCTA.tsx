import "./SalesCTA.css";

interface SalesCTAProps {
  visible: boolean;
  forging?: boolean;
  charging?: boolean;
  empowered?: boolean;
}

export function SalesCTA({
  visible,
  forging = false,
  charging = false,
  empowered = false,
}: SalesCTAProps) {
  return (
    <div
      className={[
        "sales-cta",
        visible ? "sales-cta--visible" : "",
        forging ? "sales-cta--forging" : "",
        charging ? "sales-cta--charging" : "",
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
        <span className="solar-cta__crown" aria-hidden="true">
          <span className="solar-cta__charge-ring" />
          <span className="solar-cta__charge-burst" />
          <span className="solar-cta__rays" />
          <span className="solar-cta__sun-halo" />
          <span className="solar-cta__sun-disc" />
          <span className="solar-cta__sun" />
        </span>
        <span className="solar-cta__pill">
          <span className="solar-cta__text">ODKRYJ TERAZ</span>
          <span className="solar-cta__arrow">›</span>
        </span>
      </a>
    </div>
  );
}
