"use client";

import CropIcon from './CropIcon';

const ICON_ASSETS = {
  // Cemre & Seasons
  "🔥": "/icons/cemre-air.png",
  "💧": "/icons/cemre-water.png",
  "🌱": "/icons/cemre-earth.png",
  "🌷": "/icons/event-nevruz.png",
  "☀️": "/icons/event-sun.png",
  "🌞": "/icons/event-sun.png",
  "🌤️": "/icons/event-sun.png",

  // Wildlife & Pastoral
  "🪶": "/icons/event-stork.png",
  "🐑": "/icons/event-ram.png",
  "🐄": "/icons/event-barn.png",
  "🌰": "/icons/crop-hazelnut.png",
  "🍂": "/icons/event-quail-wind.png",
  "🍁": "/icons/event-quail-wind.png",

  // Farming & Trees
  "🚜": "/icons/action-tractor.png",
  "🌾": "/icons/crop-wheat.png",
  "🛠️": "/icons/action-hoe.png",
  "✂️": "/icons/action-pruning.png",
  "🌳": "/icons/action-tree-planting.png",
  "🍅": "/icons/action-tree-planting.png",

  // Weather & Storms
  "🌧️": "/icons/weather-spring-rain.png",
  "🌦️": "/icons/weather-spring-rain.png",
  "💨": "/icons/weather-kite-wind.png",
  "🌬️": "/icons/weather-blizzard.png",
  "🍃": "/icons/weather-leaf-wind.png",
  "⚡": "/icons/weather-thunder.png",
  "🧊": "/icons/weather-frost.png",
  "❄️": "/icons/weather-zemheri-snow.png",
  "🥶": "/icons/weather-blizzard.png",
  "🏔️": "/icons/event-hamsin-mountain.png",
  "🌌": "/icons/event-winter-solstice.png",
  "🫒": "/icons/crop-olive-grape.png",
  "🍇": "/icons/crop-olive-grape.png",

  // System & Nav
  "📅": "/icons/nav-calendar.png",
  "📖": "/icons/nav-journal.png",
  "🔔": "/icons/nav-bell.png",
  "📍": "/icons/nav-location.png",
};

/**
 * 3D Liquid Glassmorphic Icon Component
 * Displays photorealistic 3D claymorphic / liquid-glass PNG icons.
 */
export default function GlassIcon({ icon = "🌱", cropId = null, category = "tarim", size = 48, className = "" }) {
  const custom3dIcon = ICON_ASSETS[icon];

  if (cropId) {
    return (
      <div 
        className={`inline-flex items-center justify-center relative select-none shrink-0 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
        style={{ width: size, height: size }}
      >
        <CropIcon id={cropId} size={Math.round(size * 0.72)} />
      </div>
    );
  }

  if (custom3dIcon) {
    return (
      <div 
        className={`inline-flex items-center justify-center relative select-none shrink-0 transition-transform duration-300 hover:scale-110 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={custom3dIcon} 
          alt={icon} 
          width={size} 
          height={size} 
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none shrink-0 rounded-2xl bg-forest-800/10 border border-forest-800/15 ${className}`}
      style={{ width: size, height: size }}
    >
      <span style={{ fontSize: Math.round(size * 0.55) }}>{icon}</span>
    </div>
  );
}
