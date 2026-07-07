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
      {forging ? <span className="sales-cta__forge-burst" aria-hidden="true" /> : null}

      <div className="sales-cta__sunrise" aria-hidden="true">
        <div className="sales-cta__rays" />
        <div className="sales-cta__sun-disc" />
        <div className="sales-cta__sun-bloom" />
      </div>

      <a
        className="sales-cta__pill"
        href="#teraz"
        tabIndex={visible ? 0 : -1}
      >
        <span className="sales-cta__glass" aria-hidden="true" />
        <span className="sales-cta__rim-flare sales-cta__rim-flare--top" />
        <span className="sales-cta__rim-flare sales-cta__rim-flare--bottom" />
        <span className="sales-cta__label">ODKRYJ TERAZ</span>
        <span className="sales-cta__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="sales-cta__arrow-icon">
            <path
              d="M9.5 7.5 14.5 12 9.5 16.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
