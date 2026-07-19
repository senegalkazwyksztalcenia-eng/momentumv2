# Momentum Lightbulb

Samodzielny projekt **tylko żarówki** — bez pioruna, bez przycisku CTA. Czarne tło, powiększona żarówka.

## Sekwencja

`off` → `flicker` (0,8 s) → `lit` (2,2 s)

## Rozwój

```bash
cd lightbulb
npm install
npm run dev
```

## Build

```bash
npm run build
```

Pliki: `dist/lightbulb.js`, `dist/lightbulb.css`

## Wideo po każdej zmianie

```bash
npm run record
```

Zapisuje `/opt/cursor/artifacts/videos/lightbulb.mp4` (9 s)

## WordPress

Wgraj pliki z `dist/` i wklej snippet z `wordpress/embed.html`.

```html
<div data-momentum-lightbulb data-size="clamp(140px, 32vw, 280px)"></div>
<script src="lightbulb.js" defer></script>
<link rel="stylesheet" href="lightbulb.css" />
```

## API

```js
MomentumLightbulb.mount('#element', {
  size: 'clamp(140px, 32vw, 280px)', // opcjonalnie
  autoplay: true,
});
widget.play();
widget.destroy();
```

## Struktura

| Plik | Rola |
|------|------|
| `src/lightbulb-svg.js` | SVG żarówki |
| `src/styles/lightbulb.css` | Animacje żarówki |
| `src/sequence.js` | Timing off → flicker → lit |
| `src/widget.js` | Widget |
| `react-reference/` | Stara wersja React (archiwum) |
