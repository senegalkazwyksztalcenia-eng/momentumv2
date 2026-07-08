import "./Lightbulb.css";
import type { HeroPhase } from "../hooks/useHeroSequence";

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

      <svg
        className="lightbulb__svg"
        viewBox="0 0 120 176"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bulb-inner-glow" cx="50%" cy="62%" r="52%">
            <stop offset="0%" stopColor="#fffef5" stopOpacity="0.98" />
            <stop offset="22%" stopColor="#ffe9b0" stopOpacity="0.88" />
            <stop offset="48%" stopColor="#ffc45a" stopOpacity="0.55" />
            <stop offset="72%" stopColor="#ff9a28" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ff7a10" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bulb-glass-body" x1="18%" y1="8%" x2="82%" y2="92%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="38%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="72%" stopColor="rgba(200,210,230,0.04)" />
            <stop offset="100%" stopColor="rgba(120,130,150,0.08)" />
          </linearGradient>

          <linearGradient id="bulb-glass-lit" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,248,220,0.35)" />
            <stop offset="45%" stopColor="rgba(255,220,150,0.22)" />
            <stop offset="100%" stopColor="rgba(255,180,80,0.08)" />
          </linearGradient>

          <linearGradient id="bulb-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <linearGradient id="bulb-brass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8c56a" />
            <stop offset="18%" stopColor="#d4a83a" />
            <stop offset="42%" stopColor="#c9962a" />
            <stop offset="68%" stopColor="#b88420" />
            <stop offset="100%" stopColor="#8f6518" />
          </linearGradient>

          <linearGradient id="bulb-brass-shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,240,180,0)" />
            <stop offset="35%" stopColor="rgba(255,240,180,0.45)" />
            <stop offset="65%" stopColor="rgba(255,240,180,0)" />
          </linearGradient>

          <clipPath id="bulb-glass-clip">
            <path d="M60 10 C42 10 28 28 26 50 C24 68 28 84 34 96 C36 100 38 104 39 108 L39 112 C39 114 41 116 44 116 L76 116 C79 116 81 114 81 112 L81 108 C82 104 84 100 86 96 C92 84 96 68 94 50 C92 28 78 10 60 10 Z" />
          </clipPath>

          <filter id="bulb-filament-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glass envelope */}
        <path
          className="lightbulb__glass"
          d="M60 10 C42 10 28 28 26 50 C24 68 28 84 34 96 C36 100 38 104 39 108 L39 112 C39 114 41 116 44 116 L76 116 C79 116 81 114 81 112 L81 108 C82 104 84 100 86 96 C92 84 96 68 94 50 C92 28 78 10 60 10 Z"
          fill="url(#bulb-glass-body)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.8"
        />

        {/* Inner warm fill when lit */}
        <path
          className="lightbulb__inner"
          d="M60 10 C42 10 28 28 26 50 C24 68 28 84 34 96 C36 100 38 104 39 108 L39 112 C39 114 41 116 44 116 L76 116 C79 116 81 114 81 112 L81 108 C82 104 84 100 86 96 C92 84 96 68 94 50 C92 28 78 10 60 10 Z"
          fill="url(#bulb-inner-glow)"
          clipPath="url(#bulb-glass-clip)"
        />

        <path
          className="lightbulb__glass-tint"
          d="M60 10 C42 10 28 28 26 50 C24 68 28 84 34 96 C36 100 38 104 39 108 L39 112 C39 114 41 116 44 116 L76 116 C79 116 81 114 81 112 L81 108 C82 104 84 100 86 96 C92 84 96 68 94 50 C92 28 78 10 60 10 Z"
          fill="url(#bulb-glass-lit)"
        />

        {/* Specular highlights */}
        <ellipse
          className="lightbulb__specular lightbulb__specular--main"
          cx="44"
          cy="42"
          rx="9"
          ry="20"
          fill="url(#bulb-highlight)"
          transform="rotate(-18 44 42)"
        />
        <ellipse
          className="lightbulb__specular lightbulb__specular--soft"
          cx="78"
          cy="58"
          rx="4"
          ry="11"
          fill="rgba(255,255,255,0.14)"
          transform="rotate(12 78 58)"
        />

        <g className="lightbulb__internals" clipPath="url(#bulb-glass-clip)">
          {/* Exhaust tube / stem */}
          <path
            className="lightbulb__stem"
            d="M60 116 L60 98"
            stroke="rgba(170,175,185,0.55)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Support wires */}
          <path
            className="lightbulb__wire"
            d="M60 98 L47 82"
            stroke="rgba(130,125,115,0.7)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            className="lightbulb__wire"
            d="M60 98 L73 82"
            stroke="rgba(130,125,115,0.7)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          {/* Tungsten filament — coiled double arc */}
          <path
            className="lightbulb__filament lightbulb__filament--outer"
            d="M47 82 C47 70 52 63 60 61 C68 63 73 70 73 82"
            strokeWidth="1.2"
            strokeLinecap="round"
            filter="url(#bulb-filament-glow)"
          />
          <path
            className="lightbulb__filament lightbulb__filament--inner"
            d="M49.5 79 C52 72 56 67 60 66 C64 67 68 72 70.5 79"
            strokeWidth="0.95"
            strokeLinecap="round"
            filter="url(#bulb-filament-glow)"
          />
          <path
            className="lightbulb__filament lightbulb__filament--core"
            d="M52 76 C55 71 57 69 60 68.5 C63 69 65 71 68 76"
            strokeWidth="0.7"
            strokeLinecap="round"
            filter="url(#bulb-filament-glow)"
          />
        </g>

        {/* Glass neck */}
        <path
          className="lightbulb__neck"
          d="M44 116 L44 120 C44 122 46 124 48 124 L72 124 C74 124 76 122 76 120 L76 116"
          fill="rgba(200,205,215,0.18)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.6"
        />

        {/* E27 screw base */}
        <g className="lightbulb__base">
          <rect x="40" y="124" width="40" height="34" rx="2" fill="url(#bulb-brass)" />
          <rect x="40" y="124" width="40" height="34" rx="2" fill="url(#bulb-brass-shine)" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              className="lightbulb__thread"
              x1="42"
              y1={128 + i * 5.2}
              x2="78"
              y2={128 + i * 5.2}
              stroke="rgba(70,48,12,0.35)"
              strokeWidth="1.1"
            />
          ))}
          <rect x="46" y="155" width="28" height="6" rx="1" className="lightbulb__contact" />
        </g>
      </svg>
    </div>
  );
}
