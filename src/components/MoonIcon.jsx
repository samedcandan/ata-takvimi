"use client";

/**
 * 100% Astronomically Accurate 3D Glassmorphic Moon Renderer
 * Uses SVG Masking for smooth, pixel-perfect, unbreakable moon phase shading.
 */
export default function MoonIcon({ illumination = 50, isGrowing = true, phaseName = "", size = 28, className = "" }) {
  const idSuffix = Math.random().toString(36).substr(2, 5);

  const pct = Math.max(0, Math.min(100, illumination)) / 100;
  const isFull = pct > 0.97;
  const isNew = pct < 0.03;

  const r = 20;
  const cx = 24;
  const cy = 24;

  // Mask Construction:
  // rx = r * |1 - 2 * pct|
  // If pct >= 0.5: Ellipse is WHITE (adds light to the opposite side)
  // If pct < 0.5: Ellipse is BLACK (subtracts light from the same side)
  
  const absOffset = Math.abs(1 - 2 * pct);
  const rx = Math.max(0.1, r * absOffset);

  // Semicircle base for white mask:
  // isGrowing = true -> Right Semicircle
  // isGrowing = false -> Left Semicircle
  const semiCircleD = isGrowing
    ? `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z` // Right Semicircle
    : `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`; // Left Semicircle

  const ellipseFill = pct >= 0.5 ? "white" : "black";

  return (
    <div 
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
      title={`${phaseName} (%${illumination} Aydınlık)`}
    >
      <svg 
        viewBox="0 0 48 48" 
        width={size} 
        height={size} 
        className="overflow-visible filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]"
      >
        <defs>
          {/* Dark moon sphere radial gradient */}
          <radialGradient id={`darkMoon-${idSuffix}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Golden-Silver illuminated moon surface radial gradient */}
          <radialGradient id={`lightMoon-${idSuffix}`} cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          {/* Glass specular glare gradient */}
          <linearGradient id={`glassGlare-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* SVG Phase Mask for 100% smooth moon illumination */}
          <mask id={`moonPhaseMask-${idSuffix}`}>
            {/* Background: Black */}
            <rect x="0" y="0" width="48" height="48" fill="black" />
            
            {isFull ? (
              <circle cx={cx} cy={cy} r={r} fill="white" />
            ) : isNew ? (
              null
            ) : (
              <>
                {/* Semicircle (Right if growing, Left if waning) */}
                <path d={semiCircleD} fill="white" />
                {/* Ellipse to add/subtract phase curvature */}
                <ellipse cx={cx} cy={cy} rx={rx} ry={r} fill={ellipseFill} />
              </>
            )}
          </mask>
        </defs>

        {/* Atmosphere Halo Ring */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={r + 1.5} 
          fill="none" 
          stroke="rgba(254, 240, 138, 0.25)" 
          strokeWidth="1" 
        />

        {/* 1. Base Dark Moon Sphere (Night side) */}
        <circle cx={cx} cy={cy} r={r} fill={`url(#darkMoon-${idSuffix})`} />

        {/* Dark Side Craters */}
        <circle cx="17" cy="19" r="3" fill="#0f172a" opacity="0.6" />
        <circle cx="27" cy="29" r="4" fill="#0f172a" opacity="0.5" />
        <circle cx="21" cy="31" r="2" fill="#0f172a" opacity="0.6" />
        <circle cx="30" cy="17" r="2.5" fill="#0f172a" opacity="0.5" />

        {/* 2. Illuminated Moon Phase Surface (Masked) */}
        {!isNew && (
          <circle 
            cx={cx} 
            cy={cy} 
            r={r} 
            fill={`url(#lightMoon-${idSuffix})`}
            mask={`url(#moonPhaseMask-${idSuffix})`}
          />
        )}

        {/* Lit Side Craters Overlay */}
        {!isNew && (
          <g opacity="0.18" mask={`url(#moonPhaseMask-${idSuffix})`}>
            <circle cx="17" cy="19" r="3" fill="#78350f" />
            <circle cx="27" cy="29" r="4" fill="#78350f" />
            <circle cx="21" cy="31" r="2" fill="#78350f" />
            <circle cx="30" cy="17" r="2.5" fill="#78350f" />
          </g>
        )}

        {/* 3. Glassmorphic Surface Reflection Gloss */}
        <ellipse 
          cx={cx} 
          cy={cy - 7} 
          rx={r - 3} 
          ry={r / 2.3} 
          fill={`url(#glassGlare-${idSuffix})`} 
          transform={`rotate(-20 ${cx} ${cy - 7})`}
        />

        {/* 4. Glass Rim Highlight */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={r - 0.5} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.4)" 
          strokeWidth="1" 
        />
      </svg>
    </div>
  );
}
