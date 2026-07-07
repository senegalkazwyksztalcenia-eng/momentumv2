# Momentum — Hero

Premium cosmic/electric/dark-luxury hero landing page for the "Momentum" ebook,
built with React + TypeScript + Vite.

## Concept

The centerpiece is a living blue lightning entity: a humanoid silhouette
(no face, eyes, or hair) made entirely of branching electric fractal veins,
struck by a bolt from above, with a blazing white-blue core at its chest.
After a few seconds on the page, the entity intensifies and pulses in a
symbolic energy clap, a flash bursts, the scene fades into dramatic
darkness, and the sales CTAs fade in.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint      # oxlint
npm run preview  # preview the production build
```

## Component structure

- `HeroMomentum` — orchestrates the hero section and the animation phase
  sequence (`entrance → levitating → converging → flash → dark → cta`).
- `CosmicBackground` — deep navy/black cosmic backdrop with drifting fog and
  twinkling stars.
- `LightningLayer` — irregular SVG lightning bolts that flicker from the top
  of the hero downward, layered behind the phantom.
- `PhantomEntity` — the living blue lightning humanoid: a generated,
  alpha-keyed WebP asset (`public/phantom/phantom-lightning.webp`) layered
  over the background/lightning, plus a pulsing white-blue core overlay
  aligned to the figure's chest, drifting wisps, and the intensify/flash
  "energy clap" animation. No face, eyes, or hair.
- `DarknessOverlay` — full-hero overlay that fades from `0` to
  `~0.9` opacity after the energy clap to create the dramatic transition.
- `SalesCTA` — glassy premium CTA buttons (`Kup Momentum`, `Poznaj ebook`,
  `Zamów teraz`) that fade in with a staggered entrance once the scene has
  gone dark.

Timing lives in `src/hooks/useHeroSequence.ts`; motion/accessibility
preferences are read via `src/hooks/useReducedMotion.ts`, which shortens and
softens the sequence when `prefers-reduced-motion: reduce` is set.

## Design tokens

CSS variables (defined in `src/index.css`):

- `--blue-core: #e8fbff`
- `--blue-electric: #00b7ff`
- `--blue-deep: #003dff`
- `--navy-black: #020611`
- `--glass-white: rgba(255, 255, 255, 0.12)`

## Notes

- The phantom is built entirely from CSS/SVG layers (no baked-in raster
  background), so it stays an independent, swappable layer above the
  background.
- Fully responsive; the phantom scales down on narrow viewports while
  staying centered, and CTAs remain easy to tap.
