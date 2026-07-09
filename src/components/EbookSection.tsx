import { PdfReader } from "./PdfReader";
import "./EbookSection.css";

export function EbookSection() {
  return (
    <section className="ebook-section" id="ebook" aria-labelledby="ebook-title">
      <div className="ebook-section__inner">
        <p className="ebook-section__eyebrow">Ebook</p>
        <h2 className="ebook-section__title" id="ebook-title">
          Spis treści — Momentum
        </h2>
        <PdfReader />
      </div>
    </section>
  );
}
