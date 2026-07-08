import "./Lightbulb.css";
import type { HeroPhase } from "../hooks/useHeroSequence";

const GLASS_PATH =
  "M60 9 C41 9 27 27 25 49 C23 67 27 83 33 95 C35 99 37 103 38 107 L38 111 C38 113 40 115 43 115 L77 115 C80 115 82 113 82 111 L82 107 C83 103 85 99 87 95 C93 83 97 67 95 49 C93 27 79 9 60 9 Z";

interface LightbulbProps {
  phase: HeroPhase;
}

export function Lightbulb({ phase }: LightbulbProps) {
  return (
    <div
      className={["lightbulb", `lightbulb--${phase}`].join(" ")}
      aria-hidden="true"
    >
      <span className="lightbulb__bloom" />
      <span className="lightbulb__bloom lightbulb__bloom--tight" />
      <span className="lightbulb__pool" />

      <svg
        className="lightbulb__svg"
        viewBox="0 0 120 176"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bulb-inner-glow" cx="50%" cy="52%" r="50%">
            <stop offset="0%" stopColor="#fffef9" stopOpacity="0.98" />
            <stop offset="14%" stopColor="#fff4dc" stopOpacity="0.94" />
            <stop offset="32%" stopColor="#ffe6a8" stopOpacity="0.78" />
            <stop offset="52%" stopColor="#ffc860" stopOpacity="0.48" />
            <stop offset="72%" stopColor="#ff9e30" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ff7800" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bulb-thunder-glow" cx="50%" cy="44%" r="46%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
            <stop offset="28%" stopColor="#f4f7fb" stopOpacity="0.62" />
            <stop offset="55%" stopColor="#e6edf4" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#d8e2ec" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bulb-thunder-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="45%" stopColor="#f2f6fa" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#e4ebf2" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bulb-glass-thunder" x1="28%" y1="2%" x2="72%" y2="98%">
            <stop offset="0%" stopColor="rgba(248, 251, 255, 0.28)" />
            <stop offset="50%" stopColor="rgba(232, 240, 248, 0.14)" />
            <stop offset="100%" stopColor="rgba(220, 230, 240, 0.06)" />
          </linearGradient>

          <radialGradient id="bulb-filament-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#ffe8b0" />
            <stop offset="100%" stopColor="#ffaa44" />
          </radialGradient>

          <linearGradient id="bulb-glass-off" x1="12%" y1="4%" x2="88%" y2="96%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(200,210,225,0.04)" />
          </linearGradient>

          <linearGradient id="bulb-glass-lit" x1="32%" y1="2%" x2="68%" y2="98%">
            <stop offset="0%" stopColor="rgba(255, 250, 238, 0.32)" />
            <stop offset="50%" stopColor="rgba(255, 218, 130, 0.18)" />
            <stop offset="100%" stopColor="rgba(255, 175, 70, 0.06)" />
          </linearGradient>

          <linearGradient id="bulb-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="82%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.42)" />
          </linearGradient>

          <linearGradient id="bulb-chrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eceff2" />
            <stop offset="14%" stopColor="#c8ced6" />
            <stop offset="38%" stopColor="#9aa3ad" />
            <stop offset="58%" stopColor="#b8bfc8" />
            <stop offset="78%" stopColor="#8e969f" />
            <stop offset="100%" stopColor="#6e757d" />
          </linearGradient>

          <linearGradient id="bulb-chrome-lit" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5e8c8" />
            <stop offset="30%" stopColor="#d4b878" />
            <stop offset="70%" stopColor="#a88848" />
            <stop offset="100%" stopColor="#7a6538" />
          </linearGradient>

          <linearGradient id="bulb-chrome-shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <clipPath id="bulb-glass-clip">
            <path d={GLASS_PATH} />
          </clipPath>

          <filter id="bulb-inner-scatter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.65 0"
              result="soft"
            />
            <feMerge>
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bulb-filament-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="bulb-flare" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Glass body */}
        <path
          className="lightbulb__glass"
          d={GLASS_PATH}
          fill="url(#bulb-glass-off)"
        />

        {/* Rim edge highlight */}
        <path
          className="lightbulb__rim"
          d={GLASS_PATH}
          fill="none"
          stroke="url(#bulb-rim)"
          strokeWidth="1.1"
        />

        {/* Warm inner fill */}
        <path
          className="lightbulb__inner"
          d={GLASS_PATH}
          fill="url(#bulb-inner-glow)"
          clipPath="url(#bulb-glass-clip)"
        />

        {/* Thunder charge — clipped inside glass only */}
        <path
          className="lightbulb__thunder-fill"
          d={GLASS_PATH}
          fill="url(#bulb-thunder-glow)"
          clipPath="url(#bulb-glass-clip)"
        />

        <circle
          className="lightbulb__thunder-core"
          cx="60"
          cy="72"
          r="11"
          fill="url(#bulb-thunder-core)"
          clipPath="url(#bulb-glass-clip)"
        />

        <path
          className="lightbulb__glass-tint"
          d={GLASS_PATH}
          fill="url(#bulb-glass-lit)"
        />

        <path
          className="lightbulb__glass-thunder-tint"
          d={GLASS_PATH}
          fill="url(#bulb-glass-thunder)"
          clipPath="url(#bulb-glass-clip)"
        />

        {/* Specular streak */}
        <path
          className="lightbulb__specular"
          d="M38 28 C36 42 35 58 38 72 C39 78 40 84 41 88"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.7"
        />
        <ellipse
          className="lightbulb__specular-dot"
          cx="76"
          cy="52"
          rx="3.5"
          ry="8"
          fill="rgba(255,255,255,0.18)"
          transform="rotate(14 76 52)"
        />

        <g className="lightbulb__internals" clipPath="url(#bulb-glass-clip)">
          {/* Glass stem */}
          <path
            className="lightbulb__stem"
            d="M60 115 L60 94"
            stroke="rgba(180,188,200,0.5)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Vertical support wires */}
          <path
            className="lightbulb__wire"
            d="M60 94 L43 72"
            stroke="rgba(110,108,102,0.75)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            className="lightbulb__wire"
            d="M60 94 L77 72"
            stroke="rgba(110,108,102,0.75)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          {/* Horizontal coiled filament */}
          <path
            className="lightbulb__filament"
            d="M43 72
               C45.5 68 47.5 72 50 72
               C52.5 72 54.5 68 57 72
               C59.5 76 61.5 72 64 72
               C66.5 72 68.5 68 71 72
               C73.5 72 75 70 77 72"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Filament hot core (lit only) */}
          <path
            className="lightbulb__filament-core"
            d="M46 72 C48 70 52 70 54 72 C56 74 58 72 60 72 C62 72 64 74 66 72 C68 70 72 70 74 72"
            strokeWidth="0.55"
            strokeLinecap="round"
          />
        </g>

        {/* Lens-flare rays (lit) */}
        <g className="lightbulb__flare" filter="url(#bulb-flare)">
          <line x1="60" y1="72" x2="60" y2="58" stroke="rgba(248, 252, 255, 0.45)" strokeWidth="0.6" />
          <line x1="60" y1="72" x2="48" y2="64" stroke="rgba(240, 248, 255, 0.3)" strokeWidth="0.45" />
          <line x1="60" y1="72" x2="72" y2="64" stroke="rgba(240, 248, 255, 0.3)" strokeWidth="0.45" />
          <line x1="60" y1="72" x2="52" y2="78" stroke="rgba(235, 244, 252, 0.22)" strokeWidth="0.4" />
          <line x1="60" y1="72" x2="68" y2="78" stroke="rgba(235, 244, 252, 0.22)" strokeWidth="0.4" />
        </g>

        {/* Glass neck */}
        <path
          className="lightbulb__neck"
          d="M43 115 L43 119 C43 121 45 123 47 123 L73 123 C75 123 77 121 77 119 L77 115"
          fill="rgba(210,215,225,0.15)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.55"
        />

        {/* Chrome E27 base */}
        <g className="lightbulb__base">
          <rect
            className="lightbulb__base-body"
            x="39"
            y="123"
            width="42"
            height="36"
            rx="2"
            fill="url(#bulb-chrome)"
          />
          <rect
            className="lightbulb__base-glow"
            x="39"
            y="123"
            width="42"
            height="36"
            rx="2"
            fill="url(#bulb-chrome-lit)"
            opacity="0"
          />
          <rect
            x="39"
            y="123"
            width="42"
            height="36"
            rx="2"
            fill="url(#bulb-chrome-shine)"
          />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={i}
              className="lightbulb__thread"
              x1="41"
              y1={127 + i * 4.6}
              x2="79"
              y2={127 + i * 4.6}
              stroke="rgba(50,55,62,0.4)"
              strokeWidth="1"
            />
          ))}
          <rect x="45" y="156" width="30" height="5" rx="1" className="lightbulb__contact" />
        </g>
      </svg>
    </div>
  );
}
