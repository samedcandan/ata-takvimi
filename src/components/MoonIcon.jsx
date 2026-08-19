"use client";

/**
 * 3D Photorealistic & Glassmorphic Lunar Phase Component
 * Uses the high-definition 3D moon sprite cycle (`/moon-phases/day-X.png`)
 * Accurately maps 30-day lunar synodic cycle to the exact daily moon phase.
 */
export default function MoonIcon({ 
  lunarAge,
  illumination = 50, 
  linearIllumination, 
  isGrowing = true, 
  phaseName = "", 
  size = 28, 
  className = "" 
}) {
  // Calculate day index from 1 to 30
  let dayNumber = 1;
  
  if (typeof lunarAge === 'number') {
    const synodicMonth = 29.53058867;
    const normAge = ((lunarAge % synodicMonth) + synodicMonth) % synodicMonth;
    dayNumber = Math.min(30, Math.max(1, Math.floor((normAge / synodicMonth) * 30) + 1));
  } else {
    const effectiveIllum = typeof linearIllumination === 'number' ? linearIllumination : illumination;
    const ratio = Math.max(0, Math.min(100, effectiveIllum)) / 100;
    
    let phaseRatio = isGrowing ? ratio * 0.5 : 0.5 + (1 - ratio) * 0.5;
    dayNumber = Math.min(30, Math.max(1, Math.round(phaseRatio * 29) + 1));
  }

  const imageSrc = `/moon-phases/day-${dayNumber}.png`;

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none shrink-0 transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
      title={`${phaseName || 'Ay Evresi'} (%${illumination} Aydınlık)`}
    >
      <img
        src={imageSrc}
        alt={phaseName || `Ay Evresi Gün ${dayNumber}`}
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]"
        loading="lazy"
      />
    </div>
  );
}
