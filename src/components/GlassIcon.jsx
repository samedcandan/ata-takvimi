"use client";

/**
 * Premium 3D Glassmorphic Icon Renderer for Takvim Akışı
 * Renders glossy, realistic glass-style 3D emblems for weather, farming, seasons, and nature.
 */
export default function GlassIcon({ icon = "🌱", category = "tarim", size = 32, className = "" }) {
  const idSuffix = Math.random().toString(36).substr(2, 5);

  // Determine theme colors and SVG element based on emoji or category
  const getIconSpec = (iconChar, cat) => {
    switch (iconChar) {
      // Fire / Cemre / Heat
      case "🔥":
      case "☀️":
      case "🌞":
        return {
          bgGrad: ["#ff7e5f", "#feb47b", "#ff2a00"],
          glow: "rgba(255, 107, 0, 0.4)",
          type: "fire"
        };
      
      // Ice / Cold / Frost
      case "❄️":
      case "🥶":
      case "🧊":
      case "🌌":
        return {
          bgGrad: ["#38ef7d", "#11998e", "#00d2ff"],
          glow: "rgba(56, 239, 125, 0.4)",
          type: "ice"
        };

      // Water / Rain / Dew
      case "💧":
      case "🌧️":
      case "🌦️":
        return {
          bgGrad: ["#4facfe", "#00f2fe", "#0072ff"],
          glow: "rgba(0, 242, 254, 0.4)",
          type: "water"
        };

      // Wind / Storm
      case "🌬️":
      case "💨":
      case "🍃":
        return {
          bgGrad: ["#a1c4fd", "#c2e9fb", "#667eea"],
          glow: "rgba(161, 196, 253, 0.4)",
          type: "wind"
        };

      // Sprout / Plant / Nature
      case "🌱":
      case "🌷":
      case "🌳":
        return {
          bgGrad: ["#11998e", "#38ef7d", "#059669"],
          glow: "rgba(56, 239, 125, 0.4)",
          type: "sprout"
        };

      // Agriculture / Wheat / Harvest
      case "🌾":
      case "🚜":
      case "🍅":
      case "🫒":
      case "🛠️":
      case "🌰":
      case "🍇":
        return {
          bgGrad: ["#f6d365", "#fda085", "#d97706"],
          glow: "rgba(245, 158, 11, 0.4)",
          type: "wheat"
        };

      // Birds / Animals
      case "🪶":
      case "🐑":
      case "🐄":
        return {
          bgGrad: ["#e0c3fc", "#8ec5fc", "#7c3aed"],
          glow: "rgba(168, 85, 247, 0.4)",
          type: "fauna"
        };

      // Mountain / Sky / Autumn
      case "🌤️":
      case "🏔️":
      case "🍂":
      case "🍁":
      default:
        return {
          bgGrad: ["#ff9a9e", "#fecfef", "#f43f5e"],
          glow: "rgba(244, 63, 94, 0.4)",
          type: "sunsky"
        };
    }
  };

  const spec = getIconSpec(icon, category);

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
        style={{ filter: `drop-shadow(0 4px 10px ${spec.glow})` }}
      >
        <defs>
          {/* Main 3D Sphere/Shield Glass Gradient */}
          <linearGradient id={`glassBg-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={spec.bgGrad[0]} />
            <stop offset="50%" stopColor={spec.bgGrad[1]} />
            <stop offset="100%" stopColor={spec.bgGrad[2]} />
          </linearGradient>

          {/* Glass Top Specular Glare */}
          <linearGradient id={`glassGlare-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Base Glass Rounded Shield / Capsule Container */}
        <rect 
          x="4" 
          y="4" 
          width="40" 
          height="40" 
          rx="14" 
          fill={`url(#glassBg-${idSuffix})`} 
        />

        {/* 2. Glass Embossed Inner Shadow */}
        <rect 
          x="5" 
          y="5" 
          width="38" 
          height="38" 
          rx="13" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.35)" 
          strokeWidth="1.5" 
        />

        {/* 3. Center Graphic (Custom Vector Illustration or Styled Character with 3D shadow) */}
        <g transform="translate(24, 24)">
          {/* 3D Drop Shadow under symbol */}
          <text 
            textAnchor="middle" 
            dominantBaseline="central" 
            fontSize="22" 
            opacity="0.3"
            transform="translate(1, 2)"
          >
            {icon}
          </text>
          
          {/* Main Crisp Front Symbol */}
          <text 
            textAnchor="middle" 
            dominantBaseline="central" 
            fontSize="22"
          >
            {icon}
          </text>
        </g>

        {/* 4. Top Glass Sheen Overlay */}
        <path 
          d="M 6 18 A 12 12 0 0 1 18 6 L 30 6 A 12 12 0 0 1 42 18 C 30 22 18 22 6 18 Z" 
          fill={`url(#glassGlare-${idSuffix})`} 
        />
      </svg>
    </div>
  );
}
