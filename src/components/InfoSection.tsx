import "./InfoSection.css";

export function InfoSection() {
  return (
    <section className="info-section" id="info" aria-labelledby="info-title">
      <div className="info-section__inner">
        <p className="info-section__eyebrow">O ebooku</p>
        <h2 className="info-section__title" id="info-title">
          Momentum — przewodnik po pełni życia
        </h2>
        <p className="info-section__lead">
          Odkryj sprawdzone ramy rozwoju na każdej płaszczyźnie — od energii i
          zdrowia, przez relacje i karierę, po sens i wewnętrzną siłę. Momentum
          łączy wiedzę, praktykę i inspirację w jedną spójną ścieżkę.
        </p>

        <ul className="info-section__points">
          <li>Praktyczne ćwiczenia do wdrożenia od razu</li>
          <li>Struktura oparta na czterech filarach rozwoju</li>
          <li>Język motywujący bez pustych obietnic</li>
        </ul>

        <div className="info-section__video-block">
          <h3 className="info-section__video-title">Zobacz więcej</h3>
          <div className="info-section__video-frame" aria-label="Miejsce na wideo">
            <div className="info-section__video-placeholder">
              <span className="info-section__video-icon" aria-hidden="true">
                ▶
              </span>
              <p>Tu pojawi się wideo o Momentum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
