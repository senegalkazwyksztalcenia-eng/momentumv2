import "./HeroSun.css";

interface HeroSunProps {
  rising: boolean;
  empowered: boolean;
}

export function HeroSun({ rising, empowered }: HeroSunProps) {
  if (!rising && !empowered) return null;

  return (
    <div
      className={[
        "hero-sun",
        rising ? "hero-sun--rising" : "",
        empowered ? "hero-sun--empowered" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="hero-sun__body">
        {empowered ? <span className="hero-sun__charge-ring" /> : null}
        {empowered ? <span className="hero-sun__charge-burst" /> : null}
        <span className="hero-sun__rays" />
        <span className="hero-sun__halo" />
        <span className="hero-sun__disc" />
        <span className="hero-sun__core" />
      </div>
    </div>
  );
}
