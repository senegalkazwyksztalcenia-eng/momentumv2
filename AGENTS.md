# AGENTS.md

## Cursor Cloud specific instructions

Momentum — Hero is a single-service React + TypeScript + Vite frontend (no backend, database, or external services). Node 22 and npm are preinstalled and dependencies are installed by the startup update script (`npm install`).

Standard commands are documented in `README.md` and `package.json` scripts:
- `npm run dev` — start the Vite dev server (defaults to http://localhost:5173/).
- `npm run lint` — oxlint (config in `.oxlintrc.json`; no output means no issues).
- `npm run build` — `tsc -b` type-check followed by `vite build`.
- `npm run preview` — preview the production build.

Notes:
- The hero plays a one-time entrance→flash→dark→cta animation over several seconds; wait ~8-10s after page load for the Polish CTA buttons ("Kup Momentum", "Poznaj ebook", "Zamów teraz") to fade in. The sequence is shortened/softened when `prefers-reduced-motion: reduce` is set.
