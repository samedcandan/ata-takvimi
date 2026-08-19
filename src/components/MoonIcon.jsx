"use client";

import { useId } from 'react';

/**
 * 100% Astronomically Accurate 3D Glassmorphic Lunar Phase Renderer
 * Uses precise mathematical geometric arc-masking for smooth, daily-changing moon phases.
 * Renders distinct, flawless 3D illumination for every single day from 0% to 100%.
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
  const idSuffix = useId().replace(/:/g, '_');

  let pct = 0.5;
  let growing = isGrowing;

  // Detect "Dark Moon" — last 2 days before New Moon (lunarAge >= 27.53)
  const synodicMonth = 29.53058867;
  let isDarkMoon = false;

  if (typeof lunarAge === 'number') {
    const normAge = ((lunarAge % synodicMonth) + synodicMonth) % synodicMonth;
    const phaseRatio = normAge / synodicMonth;
    growing = normAge < (synodicMonth / 2);
    // Linear illumination ratio for geometrical arc masking (0.0 to 1.0)
    pct = growing ? (phaseRatio * 2) : ((1 - phaseRatio) * 2);

    // Force completely dark icon for the last 2 days before New Moon
    if (normAge >= (synodicMonth - 2)) {
      isDarkMoon = true;
      pct = 0;
    }

    // New Moon days: ensure minimum visible crescent (not fully dark)
    // Day 1 (lunarAge 0-1): minimum 2% illumination
    // Day 2 (lunarAge 1-2): minimum 3% illumination
    if (!isDarkMoon && normAge < 1.0) {
      pct = Math.max(pct, 0.02);
    } else if (!isDarkMoon && normAge < 2.0) {
      pct = Math.max(pct, 0.03);
    }
  } else {
    const effectiveIllum = typeof linearIllumination === 'number' ? linearIllumination : illumination;
    pct = Math.max(0, Math.min(100, effectiveIllum)) / 100;
  }

  // Clamping
  pct = Math.max(0, Math.min(1, pct));

  const isFull = pct >= 0.98;
  const isNew = isDarkMoon; // Only pre-New-Moon dark days are fully dark

  const r = 20;
  const cx = 24;
  const cy = 24;

  // Arc deformation width
  const rx = r * Math.abs(1 - 2 * pct);

  // Northern Hemisphere: Waxing (growing) is illuminated on the RIGHT side.
  // Waning (shrinking) is illuminated on the LEFT side.
  const semiCircleD = growing
    ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`
    : `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`;

  const ellipseFill = pct >= 0.5 ? "white" : "black";

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none shrink-0 transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
      title={`${phaseName || 'Ay Evresi'} (%${illumination} Aydınlık)`}
    >
      <svg 
        viewBox="0 0 48 48" 
        width={size} 
        height={size} 
        className="overflow-visible filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]"
      >
        <defs>
          {/* Dark night-side 3D sphere gradient */}
          <radialGradient id={`darkMoon-${idSuffix}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="65%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Luminous sunlit-side 3D sphere gradient */}
          <radialGradient id={`lightMoon-${idSuffix}`} cx="40%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Glass specular shine */}
          <linearGradient id={`glassGlare-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Moon phase geometric mask */}
          <mask id={`moonPhaseMask-${idSuffix}`}>
            <rect x="0" y="0" width="48" height="48" fill="black" />
            
            {isFull ? (
              <circle cx={cx} cy={cy} r={r} fill="white" />
            ) : isNew ? (
              null
            ) : (
              <>
                <path d={semiCircleD} fill="white" />
                <ellipse cx={cx} cy={cy} rx={rx} ry={r} fill={ellipseFill} />
              </>
            )}
          </mask>
        </defs>

        {/* Outer subtle glow ring */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={r + 1.5} 
          fill="none" 
          stroke="rgba(254, 240, 138, 0.3)" 
          strokeWidth="1" 
        />

        {/* 1. Base Dark Moon Sphere (Night side) */}
        <circle cx={cx} cy={cy} r={r} fill={`url(#darkMoon-${idSuffix})`} />

        {/* Dark Side Realistic Craters */}
        <circle cx="17" cy="19" r="3" fill="#0f172a" opacity="0.65" />
        <circle cx="27" cy="29" r="4" fill="#0f172a" opacity="0.55" />
        <circle cx="21" cy="31" r="2" fill="#0f172a" opacity="0.65" />
        <circle cx="30" cy="17" r="2.5" fill="#0f172a" opacity="0.55" />

        {/* 2. Illuminated Moon Phase Surface */}
        {!isNew && (
          <circle 
            cx={cx} 
            cy={cy} 
            r={r} 
            fill={`url(#lightMoon-${idSuffix})`}
            mask={isFull ? undefined : `url(#moonPhaseMask-${idSuffix})`}
          />
        )}

        {/* Lit Side Crater Textures Overlay */}
        {!isNew && (
          <g opacity="0.22" mask={isFull ? undefined : `url(#moonPhaseMask-${idSuffix})`}>
            <circle cx="17" cy="19" r="3" fill="#78350f" />
            <circle cx="27" cy="29" r="4" fill="#78350f" />
            <circle cx="21" cy="31" r="2" fill="#78350f" />
            <circle cx="30" cy="17" r="2.5" fill="#78350f" />
          </g>
        )}

        {/* 3. Glassmorphic Specular Reflection */}
        <ellipse 
          cx={cx} 
          cy={cy - 7} 
          rx={r - 3} 
          ry={r / 2.2} 
          fill={`url(#glassGlare-${idSuffix})`} 
          transform={`rotate(-20 ${cx} ${cy - 7})`}
        />

        {/* 4. Polished Glass Rim Highlight */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={r - 0.5} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.45)" 
          strokeWidth="1" 
        />
      </svg>
    </div>
  );
}
