import "./SalesCTA.css";

interface SalesCTAProps {
  visible: boolean;
}

function ClickIcon() {
  return (
    <svg
      className="sales-cta__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9.5 3.2c.6-.8 1.9-.5 2.1.6l.7 3.5 1.9-.9c.7-.3 1.5.2 1.4 1.1l-.4 3.4 2.6 2c.6.4.4 1.4-.2 1.5l-3.8.6-.7 3.7c-.1.8-1.2 1-1.6.3l-2.3-3.2-3.4 1.6c-.7.3-1.4-.3-1.2-1.1l1-3.9-2.9-2.3c-.6-.5-.2-1.4.5-1.4l3.9-.2.7-3.5z"
        fill="currentColor"
      />
      <circle cx="18.5" cy="5.5" r="1.1" fill="currentColor" />
      <circle cx="20.5" cy="8.5" r="0.9" fill="currentColor" />
      <circle cx="17.5" cy="9.5" r="0.8" fill="currentColor" />
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
        className="sales-cta__button sales-cta__button--primary"
        href="#skorzystasz"
        tabIndex={visible ? 0 : -1}
      >
        <span className="sales-cta__label">Skorzystasz?</span>
        <span className="sales-cta__click">
          <ClickIcon />
          <span className="sales-cta__hint">Klik!</span>
        </span>
      </a>
    </div>
  );
}
