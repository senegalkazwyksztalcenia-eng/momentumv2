# momentumv2

A small, self-contained website whose centerpiece is an **animated blue phantom
with a glowing aura** — a floating SVG spirit, layered pulsing auras, and a
drifting field of blue embers on a canvas.

No frameworks, no build step. Just open the page.

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — page markup and the inline SVG phantom.
- `styles.css` — layout, aura glow/ring, floating and pulsing animations.
- `script.js` — canvas particle field (blue embers) with cursor repulsion.

## Notes

The phantom is drawn entirely in code (SVG + CSS + canvas), so it scales
crisply and is easy to drop into any page. Motion is disabled automatically for
visitors who prefer reduced motion.
