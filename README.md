# Momentum — Hero

Premium cosmic/electric/dark-luxury hero landing page for the "Momentum" ebook,
built with React + TypeScript + Vite.

## Concept

The centerpiece is **not** a human, angel, or face — it's a living blue
energy entity built from plasma, mist, and internal lightning veins, with a
white-blue core "heart". After a few seconds on the page, its side energy
masses converge toward the center in a symbolic clap, a flash bursts, the
scene fades into dramatic darkness, and the sales CTAs fade in.

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
- `PhantomEntity` — the living blue energy entity: plasma masses, internal
  lightning veins, a pulsing white-blue core, drifting wisps, and the
  converge/flash "clap" animation. No face, eyes, hair, or human anatomy.
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
