"use client";

/**
 * Ultra-Premium 3D Glassmorphic Vector Icon System
 * Draws high-detail, glossy, 3D glass vector artwork with realistic caustics,
 * specular highlights, inner shadows, and neon ambient glows.
 */
export default function GlassIcon({ icon = "🌱", category = "tarim", size = 36, className = "" }) {
  const idSuffix = Math.random().toString(36).substr(2, 5);

  // Classify topic to 3D Glass Artwork theme
  const getTheme = (ch) => {
    switch (ch) {
      case "🔥":
      case "☀️":
      case "🌞":
        return {
          name: "fire",
          bgGrad: ["#ff4e50", "#f9d423", "#d97706"],
          glow: "rgba(255, 78, 80, 0.45)",
          rim: "#fef08a"
        };

      case "❄️":
      case "🥶":
      case "🧊":
      case "🌌":
        return {
          name: "ice",
          bgGrad: ["#00c6ff", "#0072ff", "#0284c7"],
          glow: "rgba(0, 198, 255, 0.45)",
          rim: "#e0f2fe"
        };

      case "💧":
      case "🌧️":
      case "🌦️":
        return {
          name: "water",
          bgGrad: ["#4facfe", "#00f2fe", "#0284c7"],
          glow: "rgba(0, 242, 254, 0.45)",
          rim: "#bae6fd"
        };

      case "🌬️":
      case "💨":
      case "🍃":
        return {
          name: "wind",
          bgGrad: ["#89f7fe", "#66a6ff", "#4f46e5"],
          glow: "rgba(102, 166, 255, 0.45)",
          rim: "#c7d2fe"
        };

      case "🌱":
      case "🌷":
      case "🌳":
        return {
          name: "sprout",
          bgGrad: ["#11998e", "#38ef7d", "#15803d"],
          glow: "rgba(56, 239, 125, 0.45)",
          rim: "#bbf7d0"
        };

      case "🌾":
      case "🚜":
      case "🛠️":
        return {
          name: "wheat",
          bgGrad: ["#f6d365", "#fda085", "#b45309"],
          glow: "rgba(246, 211, 101, 0.45)",
          rim: "#fef08a"
        };

      case "🍇":
      case "🍅":
      case "🫒":
      case "🌰":
        return {
          name: "fruit",
          bgGrad: ["#f857a6", "#ff5858", "#991b1b"],
          glow: "rgba(248, 87, 166, 0.45)",
          rim: "#fecdd3"
        };

      case "🪶":
      case "🐑":
      case "🐄":
        return {
          name: "animal",
          bgGrad: ["#a855f7", "#6366f1", "#4338ca"],
          glow: "rgba(168, 85, 247, 0.45)",
          rim: "#e0e7ff"
        };

      case "🌤️":
      case "🏔️":
      case "🍂":
      case "🍁":
      default:
        return {
          name: "autumn",
          bgGrad: ["#ff9a9e", "#fecfef", "#e11d48"],
          glow: "rgba(255, 154, 158, 0.45)",
          rim: "#ffe4e6"
        };
    }
  };

  const theme = getTheme(icon);

  // Render 3D Vector Paths inside the Glass Capsule
  const renderVectorShape = () => {
    switch (theme.name) {
      case "fire":
        return (
          <g transform="translate(24, 25)">
            {/* Outer Flame */}
            <path 
              d="M 0 -13 C 6 -7 11 -2 11 5 C 11 11 6 15 0 15 C -6 15 -11 11 -11 5 C -11 -2 -6 -7 0 -13 Z" 
              fill="url(#fireInnerGrad)" 
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
            />
            {/* Inner Flame Core */}
            <path 
              d="M 0 -6 C 3 -3 6 0 6 4 C 6 8 3 10 0 10 C -3 10 -6 8 -6 4 C -6 0 -3 -3 0 -6 Z" 
              fill="#fff" 
              opacity="0.9"
            />
          </g>
        );

      case "ice":
        return (
          <g transform="translate(24, 24)" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            {/* 3D Crystal Star */}
            <line x1="0" y1="-12" x2="0" y2="12" />
            <line x1="-12" y1="0" x2="12" y2="0" />
            <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" />
            <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" />
            <circle cx="0" cy="0" r="3" fill="#fff" stroke="none" />
          </g>
        );

      case "water":
        return (
          <g transform="translate(24, 24)">
            {/* 3D Liquid Drop */}
            <path 
              d="M 0 -13 C 0 -13 11 0 11 6 C 11 12 6 15 0 15 C -6 15 -11 12 -11 6 C -11 0 0 -13 0 -13 Z" 
              fill="url(#waterInnerGrad)" 
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
            />
            {/* Water Gloss Highlight */}
            <ellipse cx="-4" cy="4" rx="2.5" ry="4" fill="#fff" opacity="0.7" transform="rotate(-25 -4 4)" />
          </g>
        );

      case "wind":
        return (
          <g transform="translate(24, 24)" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none">
            {/* 3D Gust Arcs */}
            <path d="M -11 -7 C -4 -12 6 -12 10 -7 C 12 -4 10 0 6 0 C 4 0 2 -2 3 -4" />
            <path d="M -13 2 C -6 -2 7 -2 11 3 C 13 6 10 10 6 10 C 3 10 1 8 3 5" />
            <path d="M -9 10 C -4 8 3 8 7 11" />
          </g>
        );

      case "sprout":
        return (
          <g transform="translate(24, 24)">
            {/* Stem */}
            <path d="M -1 13 Q -1 0 8 -8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Left Leaf */}
            <path d="M 0 3 C -8 -2 -12 -10 -4 -12 C 0 -13 3 -6 0 3 Z" fill="url(#sproutInnerGrad)" stroke="#fff" strokeWidth="1" />
            {/* Right Leaf */}
            <path d="M 2 -4 C 10 -9 14 -17 6 -18 C 2 -18 -1 -12 2 -4 Z" fill="url(#sproutInnerGrad)" stroke="#fff" strokeWidth="1" />
          </g>
        );

      case "wheat":
        return (
          <g transform="translate(24, 24)">
            {/* Center stem */}
            <line x1="0" y1="14" x2="0" y2="-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            {/* Wheat Grains */}
            <path d="M -2 -8 C -7 -10 -8 -5 -2 -3 Z" fill="#fff" />
            <path d="M 2 -8 C 7 -10 8 -5 2 -3 Z" fill="#fff" />
            <path d="M -2 -2 C -7 -4 -8 1 -2 3 Z" fill="#fff" />
            <path d="M 2 -2 C 7 -4 8 1 2 3 Z" fill="#fff" />
            <path d="M -2 4 C -7 2 -8 7 -2 9 Z" fill="#fff" />
            <path d="M 2 4 C 7 2 8 7 2 9 Z" fill="#fff" />
          </g>
        );

      case "fruit":
        return (
          <g transform="translate(24, 24)">
            {/* Fruit Orb */}
            <circle cx="0" cy="2" r="11" fill="url(#fruitInnerGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            {/* Leaf */}
            <path d="M 0 -9 C 4 -15 10 -13 6 -8 Z" fill="#bbf7d0" />
            {/* Gloss */}
            <ellipse cx="-4" cy="-2" rx="3" ry="5" fill="#fff" opacity="0.6" transform="rotate(-25 -4 -2)" />
          </g>
        );

      case "animal":
        return (
          <g transform="translate(24, 24)">
            {/* Feather/Wing Motif */}
            <path 
              d="M 0 13 C -3 5 -10 -3 -7 -13 C -2 -14 4 -6 9 -1 C 12 3 10 9 5 12 Z" 
              fill="url(#animalInnerGrad)" 
              stroke="#fff" 
              strokeWidth="1.5" 
            />
            <path d="M -1 8 L 3 -3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case "autumn":
      default:
        return (
          <g transform="translate(24, 24)">
            {/* Maple / Sunburst motif */}
            <circle cx="0" cy="0" r="10" fill="url(#autumnInnerGrad)" stroke="#fff" strokeWidth="1.5" />
            <path d="M 0 -13 L 0 -10 M 0 10 L 0 13 M -13 0 L -10 0 M 10 0 L 13 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 48 48" 
        width={size} 
        height={size} 
        className="overflow-visible"
        style={{ filter: `drop-shadow(0 6px 14px ${theme.glow})` }}
      >
        <defs>
          {/* Main 3D Sphere Capsule Glass Gradient */}
          <radialGradient id={`glassSphere-${idSuffix}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={theme.bgGrad[0]} />
            <stop offset="60%" stopColor={theme.bgGrad[1]} />
            <stop offset="100%" stopColor={theme.bgGrad[2]} />
          </radialGradient>

          {/* Top Glass Specular Glare Highlight */}
          <linearGradient id={`topSpecular-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Inner Gradients for Vector Shapes */}
          <linearGradient id="fireInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          <linearGradient id="waterInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="sproutInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          <linearGradient id="fruitInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          <linearGradient id="animalInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          <linearGradient id="autumnInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>

        {/* 1. Base 3D Glass Orb / Squircle */}
        <rect 
          x="3" 
          y="3" 
          width="42" 
          height="42" 
          rx="15" 
          fill={`url(#glassSphere-${idSuffix})`} 
        />

        {/* 2. Glass Rim Reflection Highlight Ring */}
        <rect 
          x="4" 
          y="4" 
          width="40" 
          height="40" 
          rx="14" 
          fill="none" 
          stroke={theme.rim} 
          strokeWidth="1.2" 
          opacity="0.6"
        />

        {/* 3. Render Custom 3D Vector Graphic */}
        {renderVectorShape()}

        {/* 4. Top Glass Curved Specular Sheen (Apple 3D Glass Effect) */}
        <path 
          d="M 5 18 C 5 10 10 5 18 5 L 30 5 C 38 5 43 10 43 18 C 30 22 18 22 5 18 Z" 
          fill={`url(#topSpecular-${idSuffix})`} 
        />

        {/* 5. Bottom Caustic Rim Accent */}
        <path 
          d="M 12 43 C 20 45 28 45 36 43" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
