import "./SalesCTA.css";

interface SalesCTAProps {
  visible: boolean;
}

function InnerLightning({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`sales-cta__bolt sales-cta__bolt--${side}`}
      viewBox="0 0 120 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4 58 L28 42 L18 36 L46 18 L34 30 L58 8 L42 34 L68 22 L52 48 L78 28 L64 54 L92 38 L76 58"
        className="sales-cta__bolt-glow"
      />
      <path
        d="M4 58 L28 42 L18 36 L46 18 L34 30 L58 8 L42 34 L68 22 L52 48 L78 28 L64 54 L92 38 L76 58"
        className="sales-cta__bolt-core"
      />
    </svg>
  );
}

export function SalesCTA({ visible }: SalesCTAProps) {
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
        <InnerLightning side="left" />
        <InnerLightning side="right" />
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
