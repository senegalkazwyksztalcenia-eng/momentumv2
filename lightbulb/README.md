# Momentum Lightbulb — standalone

Samodzielny projekt animowanej żarówki z błyskawicą, wyodrębniony z głównego hero Momentum.

## Co zawiera

- **Żarówka SVG** z fazami: `off` → `strike` → `lit` (×2)
- **Proceduralna błyskawica** (biały rdzeń, niebieski blask, fioletowa poświata)
- **Opcjonalny przycisk CTA** w stylu oryginalnego hero
- **Vanilla JS** — gotowe do wklejenia w WordPress (bez Reacta)

## Struktura

```
lightbulb/
├── index.html              # podgląd deweloperski
├── src/                    # kod źródłowy widgetu
├── dist/                   # zbudowane pliki (po npm run build)
├── react-reference/        # oryginalne komponenty React z projektu hero
└── wordpress/              # gotowy snippet do wklejenia
```

## Rozwój lokalny

```bash
cd lightbulb
npm install
npm run dev
```

Otwórz adres z terminala (zwykle `http://localhost:5173`).

## Build pod WordPress

```bash
cd lightbulb
npm install
npm run build
```

Powstają pliki:
- `dist/lightbulb.js` — jeden skrypt IIFE
- `dist/lightbulb.css` — wszystkie style

## WordPress — szybki start

1. Wgraj `lightbulb.js` i `lightbulb.css` do motywu lub na CDN.
2. W edytorze strony dodaj blok **Własny HTML**.
3. Wklej zawartość `wordpress/embed.html` (zmień ścieżki do plików).

### Auto-inicjalizacja

```html
<div
  data-momentum-lightbulb
  data-cta-text="ODKRYJ TERAZ"
  data-cta-href="https://twoja-strona.pl/#kup"
></div>
<script src="/wp-content/uploads/lightbulb/lightbulb.js" defer></script>
<link rel="stylesheet" href="/wp-content/uploads/lightbulb/lightbulb.css" />
```

### Ręczna inicjalizacja (JS)

```html
<div id="moja-zarowka"></div>
<script src="lightbulb.js"></script>
<link rel="stylesheet" href="lightbulb.css" />
<script>
  MomentumLightbulb.mount('#moja-zarowka', {
    ctaText: 'KUP TERAZ',
    ctaHref: '/sklep',
    showCta: true,
    autoplay: true,
  });
</script>
```

### Opcje

| Opcja | Typ | Domyślnie | Opis |
|-------|-----|-----------|------|
| `ctaText` | string | `ODKRYJ TERAZ` | Tekst na przycisku |
| `ctaHref` | string | `#` | Link przycisku |
| `showCta` | boolean | `true` | Pokaż / ukryj przycisk |
| `autoplay` | boolean | `true` | Uruchom sekwencję po załadowaniu |

### Atrybuty `data-*`

| Atrybut | Opis |
|---------|------|
| `data-momentum-lightbulb` | Włącza auto-mount |
| `data-cta-text` | Tekst CTA |
| `data-cta-href` | URL CTA |
| `data-show-cta="false"` | Ukrywa przycisk |
| `data-autoplay="false"` | Nie startuje automatycznie |

## Timing sekwencji

- Pierwsza błyskawica: **2 s**
- Zapalenie żarówki: **3,2 s**
- Druga błyskawica: **6,2 s**
- Drugie zapalenie: **7,4 s**

## Pliki referencyjne React

Folder `react-reference/` zawiera oryginalne komponenty z brancha `cursor/info-section-marketing-video-86aa`:

- `Lightbulb.tsx` / `Lightbulb.css`
- `BulbLightningStrike.tsx` / `BulbLightningStrike.css`
- `lib/lightning.ts`, `bulbGeometry.ts`, `useHeroSequence.ts`

Przy ulepszeniach w React możesz przenosić zmiany do `src/` (vanilla) ręcznie lub budować nową wersję widgetu.

## API

```js
const widget = MomentumLightbulb.mount('#element', options);
widget.play();    // odtwórz sekwencję
widget.stop();    // zatrzymaj timery
widget.destroy(); // usuń z DOM
```
