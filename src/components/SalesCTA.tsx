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
      <a
        className="sales-cta__button sales-cta__button--primary"
        href="#kup-momentum"
        tabIndex={visible ? 0 : -1}
      >
        Kup Momentum
      </a>
      <div className="sales-cta__secondary">
        <a
          className="sales-cta__button sales-cta__button--ghost"
          href="#poznaj-ebook"
          tabIndex={visible ? 0 : -1}
        >
          Poznaj ebook
        </a>
        <a
          className="sales-cta__button sales-cta__button--ghost"
          href="#zamow-teraz"
          tabIndex={visible ? 0 : -1}
        >
          Zamów teraz
        </a>
      </div>
    </div>
  );
}
