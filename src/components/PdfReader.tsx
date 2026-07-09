import { useCallback, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist";
import "./PdfReader.css";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDF_SRC = "/documents/spis-tresci.pdf";
const PAGE_SLICE = 1.5;

export function PdfReader() {
  const shellRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  const renderPreview = useCallback(async () => {
    const host = canvasHostRef.current;
    const viewport = viewportRef.current;
    if (!host || !viewport) return;

    setLoading(true);
    setError(false);
    host.replaceChildren();

    try {
      const pdf = pdfRef.current ?? (await getDocument(PDF_SRC).promise);
      pdfRef.current = pdf;

      const containerWidth = viewport.clientWidth || 680;
      const page1 = await pdf.getPage(1);
      const baseScale = containerWidth / page1.getViewport({ scale: 1 }).width;
      const vp1 = page1.getViewport({ scale: baseScale });

      const canvas1 = document.createElement("canvas");
      canvas1.width = Math.floor(vp1.width);
      canvas1.height = Math.floor(vp1.height);
      canvas1.className = "pdf-reader__page-canvas";
      const ctx1 = canvas1.getContext("2d");
      if (!ctx1) throw new Error("canvas");
      await page1.render({ canvasContext: ctx1, viewport: vp1 }).promise;
      host.appendChild(canvas1);

      let viewportHeight = vp1.height;

      if (pdf.numPages >= 2) {
        const page2 = await pdf.getPage(2);
        const vp2 = page2.getViewport({ scale: baseScale });
        const halfHeight = vp2.height * 0.5;

        const canvas2 = document.createElement("canvas");
        canvas2.width = Math.floor(vp2.width);
        canvas2.height = Math.floor(vp2.height);
        canvas2.className = "pdf-reader__page-canvas";
        const ctx2 = canvas2.getContext("2d");
        if (!ctx2) throw new Error("canvas");
        await page2.render({ canvasContext: ctx2, viewport: vp2 }).promise;

        const clip = document.createElement("div");
        clip.className = "pdf-reader__page-clip";
        clip.style.height = `${halfHeight}px`;
        clip.appendChild(canvas2);
        host.appendChild(clip);

        viewportHeight += halfHeight;
      }

      viewport.style.height = `${viewportHeight}px`;
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  }, []);

  const renderFullscreen = useCallback(async () => {
    const host = canvasHostRef.current;
    const viewport = viewportRef.current;
    const pdf = pdfRef.current;
    if (!host || !viewport || !pdf) return;

    host.replaceChildren();
    const containerWidth = viewport.clientWidth || 900;
    const page1 = await pdf.getPage(1);
    const baseScale = containerWidth / page1.getViewport({ scale: 1 }).width;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const vp = page.getViewport({ scale: baseScale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(vp.width);
      canvas.height = Math.floor(vp.height);
      canvas.className = "pdf-reader__page-canvas";

      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      host.appendChild(canvas);
    }

    viewport.style.height = "";
  }, []);

  useEffect(() => {
    void renderPreview();
  }, [renderPreview]);

  useEffect(() => {
    const onResize = () => {
      if (isFullscreen) void renderFullscreen();
      else void renderPreview();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isFullscreen, renderPreview, renderFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const active = document.fullscreenElement === shellRef.current;
      setIsFullscreen(active);
      if (active) void renderFullscreen();
      else void renderPreview();
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [renderFullscreen, renderPreview]);

  const toggleFullscreen = () => {
    if (!shellRef.current) return;
    if (document.fullscreenElement === shellRef.current) {
      void document.exitFullscreen();
      return;
    }
    void shellRef.current.requestFullscreen();
  };

  return (
    <div className="pdf-reader" aria-label="Podgląd spisu treści ebooka">
      <div className="pdf-reader__shell" ref={shellRef}>
        <div className="pdf-reader__head">
          <p className="pdf-reader__title">Podgląd</p>
          <button
            type="button"
            className="pdf-reader__expand"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Zamknij pełny ekran" : "Powiększ na całą stronę"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {isFullscreen ? (
                <path d="M8 3v3H5v2h5V3H8zm8 0v5h2V5h-3V3h1zM5 16H3v5h5v-2H5v-3zm14 3h-3v2h5v-5h-2v3z" />
              ) : (
                <path d="M7 7H3v2h2v2h2V7zm14 0h-2v4h2v2h2V7h-4zM7 17H5v-2H3v6h6v-2H7zm12 0h-2v4h4v-6h-2v2z" />
              )}
            </svg>
          </button>
        </div>

        <div
          className="pdf-reader__viewport"
          ref={viewportRef}
          data-pages={PAGE_SLICE}
        >
          {loading ? <p className="pdf-reader__status">Ładowanie spisu…</p> : null}
          {error ? (
            <p className="pdf-reader__status pdf-reader__status--error">
              Nie udało się wczytać PDF.
            </p>
          ) : null}
          <div className="pdf-reader__canvas-host" ref={canvasHostRef} />
        </div>
      </div>

      <a
        className="pdf-reader__download"
        href={PDF_SRC}
        download="spis-tresci-momentum.pdf"
      >
        <span className="pdf-reader__download-pill">
          <span className="pdf-reader__download-text">POBIERZ PDF</span>
          <span className="pdf-reader__download-icon" aria-hidden="true">
            ↓
          </span>
        </span>
      </a>
    </div>
  );
}
