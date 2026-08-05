"use client";

import CropIcon from './CropIcon';

/**
 * 3D Liquid Glassmorphic Icon Component
 * Wraps every specific event symbol or crop SVG illustration inside a high-definition 3D glass sphere.
 */
export default function GlassIcon({ icon = "🌱", cropId = null, category = "tarim", size = 48, className = "" }) {
  const getGlassTheme = (ch, cat) => {
    switch (ch) {
      case "🌽": case "🌻": case "🍋": case "🍌":
        return { bg: ["#fef08a", "#eab308", "#854d0e"], glow: "rgba(234, 179, 8, 0.45)", rim: "#fef9c3" };
      case "🍅": case "🍎": case "🍓": case "🍒": case "🌺":
        return { bg: ["#fca5a5", "#ef4444", "#991b1b"], glow: "rgba(239, 68, 68, 0.45)", rim: "#fee2e2" };
      case "🥕": case "🍊": case "🎃": case "🍑":
        return { bg: ["#fdba74", "#f97316", "#9a3412"], glow: "rgba(249, 115, 22, 0.45)", rim: "#ffedd5" };
      case "🍆": case "🍇": case "🪻":
        return { bg: ["#d8b4fe", "#a855f7", "#581c87"], glow: "rgba(168, 85, 247, 0.45)", rim: "#f3e8ff" };
      case "🥔": case "🌰": case "🧠": case "🟤": case "🍠": case "🫚": case "🍂":
        return { bg: ["#fde047", "#d97706", "#78350f"], glow: "rgba(217, 119, 6, 0.45)", rim: "#fef3c7" };
      case "🥒": case "🫑": case "🥦": case "🥬": case "🍃": case "🌿": case "🍵": case "🌱": case "🫛":
        return { bg: ["#86efac", "#22c55e", "#14532d"], glow: "rgba(34, 197, 94, 0.45)", rim: "#dcfce7" };
      case "🫒":
        return { bg: ["#bef264", "#65a30d", "#365314"], glow: "rgba(101, 163, 13, 0.45)", rim: "#ecfccb" };
      case "🍉":
        return { bg: ["#fda4af", "#f43f5e", "#15803d"], glow: "rgba(244, 63, 94, 0.45)", rim: "#ffe4e6" };
      case "🧄": case "☁️": case "🍚":
        return { bg: ["#ffffff", "#e2e8f0", "#64748b"], glow: "rgba(203, 213, 225, 0.6)", rim: "#ffffff" };
      case "🧅": case "🧆": case "🍲": case "🫘":
        return { bg: ["#fed7aa", "#f97316", "#9a3412"], glow: "rgba(249, 115, 22, 0.45)", rim: "#ffedd5" };
      case "🔥": case "☀️": case "🌞":
        return { bg: ["#ff4e50", "#f9d423", "#ea580c"], glow: "rgba(249, 115, 22, 0.45)", rim: "#fef08a" };
      case "❄️": case "🥶": case "🧊": case "🌌":
        return { bg: ["#38ef7d", "#11998e", "#0284c7"], glow: "rgba(2, 132, 199, 0.45)", rim: "#e0f2fe" };
      case "💧": case "🌧️": case "🌦️":
        return { bg: ["#4facfe", "#00f2fe", "#2563eb"], glow: "rgba(37, 99, 235, 0.45)", rim: "#bae6fd" };
      case "🌾": case "🚜": case "🛠️": case "✂️":
        return { bg: ["#fef08a", "#eab308", "#78350f"], glow: "rgba(234, 179, 8, 0.45)", rim: "#fef9c3" };
      default:
        return { bg: ["#86efac", "#16a34a", "#14532d"], glow: "rgba(22, 163, 74, 0.45)", rim: "#dcfce7" };
    }
  };

  const theme = getGlassTheme(icon, category);

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none shrink-0 rounded-2xl ${className}`}
      style={{ 
        width: size, 
        height: size,
        background: `radial-gradient(135% 135% at 30% 25%, ${theme.bg[0]} 0%, ${theme.bg[1]} 60%, ${theme.bg[2]} 100%)`,
        boxShadow: `0 8px 16px -2px ${theme.glow}, inset 0 1.5px 2px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.25)`,
        border: `1px solid ${theme.rim}90`
      }}
    >
      {/* Curved Specular Glare (Apple Glass Sheen) */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0) 100%)',
          clipPath: 'ellipse(120% 60% at 50% 0%)'
        }}
      />

      {/* Inner Icon / Vector SVG Illustration */}
      <div className="relative z-10 flex items-center justify-center filter drop-shadow">
        {cropId ? (
          <CropIcon id={cropId} size={Math.round(size * 0.58)} />
        ) : (
          <span style={{ fontSize: Math.round(size * 0.5) }}>{icon}</span>
        )}
      </div>
    </div>
  );
}
