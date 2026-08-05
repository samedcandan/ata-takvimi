"use client";

/**
 * 3D Liquid Glassmorphic Icon Component
 * Wraps every specific event symbol (grapes, olives, sheep, tractor, wheat, fire, ice, etc.)
 * inside a high-definition 3D glass sphere with caustics, specular glare, and ambient aura.
 */
export default function GlassIcon({ icon = "🌱", category = "tarim", size = 38, className = "" }) {
  const idSuffix = Math.random().toString(36).substr(2, 5);

  // Exact theme selection based on icon or category for perfect color matching
  const getGlassTheme = (ch, cat) => {
    // Specific icon color overrides
    switch (ch) {
      // Fire / Heat
      case "🔥":
      case "☀️":
      case "🌞":
        return {
          bg: ["#ff4e50", "#f9d423", "#ea580c"],
          glow: "rgba(249, 115, 22, 0.45)",
          rim: "#fef08a"
        };

      // Ice / Cold / Frost
      case "❄️":
      case "🥶":
      case "🧊":
      case "🌌":
        return {
          bg: ["#38ef7d", "#11998e", "#0284c7"],
          glow: "rgba(2, 132, 199, 0.45)",
          rim: "#e0f2fe"
        };

      // Water / Dew / Rain
      case "💧":
      case "🌧️":
      case "🌦️":
        return {
          bg: ["#4facfe", "#00f2fe", "#2563eb"],
          glow: "rgba(37, 99, 235, 0.45)",
          rim: "#bae6fd"
        };

      // Sprout / Trees / Nature
      case "🌱":
      case "🌷":
      case "🌳":
      case "🍃":
        return {
          bg: ["#34d399", "#10b981", "#047857"],
          glow: "rgba(16, 185, 129, 0.45)",
          rim: "#a7f3d0"
        };

      // Olives / Agriculture Green
      case "🫒":
        return {
          bg: ["#a3e635", "#65a30d", "#365314"],
          glow: "rgba(101, 163, 13, 0.45)",
          rim: "#d9f99d"
        };

      // Grapes / Vineyard / Harvest
      case "🍇":
        return {
          bg: ["#c084fc", "#9333ea", "#581c87"],
          glow: "rgba(147, 51, 234, 0.45)",
          rim: "#f3e8ff"
        };

      // Tomato / Red Crops
      case "🍅":
        return {
          bg: ["#f87171", "#ef4444", "#991b1b"],
          glow: "rgba(239, 68, 68, 0.45)",
          rim: "#fecdd3"
        };

      // Wheat / Harvest / Chestnut / Gold
      case "🌾":
      case "🚜":
      case "🌰":
      case "🛠️":
      case "✂️":
        return {
          bg: ["#fbbf24", "#d97706", "#78350f"],
          glow: "rgba(217, 119, 6, 0.45)",
          rim: "#fef08a"
        };

      // Birds / Fauna / Feather
      case "🪶":
      case "🐑":
      case "🐄":
        return {
          bg: ["#818cf8", "#4f46e5", "#312e81"],
          glow: "rgba(79, 70, 229, 0.45)",
          rim: "#e0e7ff"
        };

      // Autumn / Wind / Sun Sky
      case "🌬️":
      case "💨":
      case "🌤️":
      case "🏔️":
      case "🍂":
      case "🍁":
      default:
        return {
          bg: ["#f472b6", "#fb7185", "#be123c"],
          glow: "rgba(251, 113, 133, 0.45)",
          rim: "#ffe4e6"
        };
    }
  };

  const theme = getGlassTheme(icon, category);

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
        style={{ filter: `drop-shadow(0 6px 12px ${theme.glow})` }}
      >
        <defs>
          {/* 3D Liquid Glass Radial Gradient */}
          <radialGradient id={`glassBall-${idSuffix}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={theme.bg[0]} />
            <stop offset="65%" stopColor={theme.bg[1]} />
            <stop offset="100%" stopColor={theme.bg[2]} />
          </radialGradient>

          {/* Top Glass Specular Glare (Apple Glass Effect) */}
          <linearGradient id={`topGlare-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Bottom Rim Reflection Accent */}
          <linearGradient id={`bottomRim-${idSuffix}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Base 3D Glass Sphere / Squircle Container */}
        <rect 
          x="3" 
          y="3" 
          width="42" 
          height="42" 
          rx="14" 
          fill={`url(#glassBall-${idSuffix})`} 
        />

        {/* 2. Glass Inner Rim Contour */}
        <rect 
          x="4" 
          y="4" 
          width="40" 
          height="40" 
          rx="13" 
          fill="none" 
          stroke={theme.rim} 
          strokeWidth="1.2" 
          opacity="0.6"
        />

        {/* 3. Embedded 3D Symbol with Drop-Shadow Depth */}
        <g transform="translate(24, 25)">
          {/* 3D Soft Shadow */}
          <text 
            textAnchor="middle" 
            dominantBaseline="central" 
            fontSize="22" 
            opacity="0.3"
            transform="translate(1, 2)"
          >
            {icon}
          </text>
          
          {/* Main Crisp Icon */}
          <text 
            textAnchor="middle" 
            dominantBaseline="central" 
            fontSize="22"
          >
            {icon}
          </text>
        </g>

        {/* 4. Curved Specular Glass Sheen Overlay */}
        <path 
          d="M 5 18 C 5 10 10 5 18 5 L 30 5 C 38 5 43 10 43 18 C 30 22 18 22 5 18 Z" 
          fill={`url(#topGlare-${idSuffix})`} 
        />

        {/* 5. Bottom Caustic Rim Light */}
        <path 
          d="M 12 43 C 20 45 28 45 36 43" 
          stroke={`url(#bottomRim-${idSuffix})`} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
