# WordPress — instrukcja

## Krok 1: Zbuduj pliki

W folderze `lightbulb/` uruchom:

```bash
npm install
npm run build
```

Skopiuj z `dist/`:
- `lightbulb.js`
- `lightbulb.css`

## Krok 2: Wgraj na serwer

Przykład: `/wp-content/uploads/lightbulb/lightbulb.js` i `.css`

Możesz użyć **Media** w WordPressie albo FTP.

## Krok 3: Wklej na stronę

Edytor blokowy → **+** → **Własny HTML** → wklej zawartość pliku `embed.html`.

Zmień ścieżki `href` i `src` na rzeczywiste URL-e z Twojego serwera.

## Tylko żarówka (bez przycisku)

```html
<div data-momentum-lightbulb data-show-cta="false"></div>
```

## Wiele żarówek na jednej stronie

Każdy element z `data-momentum-lightbulb` uruchomi się osobno:

```html
<div data-momentum-lightbulb data-cta-text="SEKCJA A" data-cta-href="#a"></div>
<div data-momentum-lightbulb data-cta-text="SEKCJA B" data-cta-href="#b"></div>
<script src=".../lightbulb.js" defer></script>
<link rel="stylesheet" href=".../lightbulb.css" />
```

## Uwagi

- Font **Montserrat** jest opcjonalny, ale przycisk CTA wygląda najlepiej z nim.
- Widget nie wymaga jQuery ani Reacta.
- Style są namespacowane (`ms-bulb-widget`, `lightbulb__`, `bulb-strike__`) — minimalne ryzyko kolizji z motywem.
