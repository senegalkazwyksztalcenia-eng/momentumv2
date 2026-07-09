import "./PdfReader.css";

const PDF_SRC = "/documents/spis-tresci.pdf";

interface PdfReaderProps {
  visible: boolean;
}

export function PdfReader({ visible }: PdfReaderProps) {
  return (
    <section
      className={`pdf-reader ${visible ? "pdf-reader--visible" : ""}`}
      aria-label="Spis treści ebooka"
      aria-hidden={!visible}
    >
      <div className="pdf-reader__shell">
        <div className="pdf-reader__toolbar">
          <p className="pdf-reader__title">Spis treści</p>
          <a
            className="pdf-reader__download"
            href={PDF_SRC}
            download="spis-tresci-momentum.pdf"
          >
            Pobierz PDF
          </a>
        </div>
        <iframe
          className="pdf-reader__frame"
          src={`${PDF_SRC}#view=FitH`}
          title="Spis treści — Momentum ebook"
        />
      </div>
    </section>
  );
}
