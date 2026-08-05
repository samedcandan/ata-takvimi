"use client";

/**
 * Premium Glassmorphic 3D Moon Renderer Component
 * Renders realistic glowing glass-like moon phases using SVG & CSS gradients
 */
export default function MoonIcon({ illumination = 50, isGrowing = true, phaseName = "", size = 28, className = "" }) {
  // Determine normalized phase ratio from 0 (New Moon) to 1 (Full) to 0 (Dark)
  // illumination is 0..100
  // For growing: phase 0..100 maps to 0..1
  // For shrinking: phase 100..0 maps to 1..0
  
  // Calculate mask position for crescent/gibbous arc
  // We use SVG SVG path / ellipse to create mathematically precise moon phase shading
  
  const pct = Math.max(0, Math.min(100, illumination)) / 100;
  const isFull = pct > 0.95;
  const isNew = pct < 0.05;

  // Rx for the shading ellipse: ranges from -r to +r
  // when pct = 0.5 (Quarter), rx = 0 (straight line)
  // when pct = 1.0 (Full), rx = 1.0
  // when pct = 0.0 (New), rx = 1.0 (covers fully)
  const r = 24; // Base radius of 48x48 viewport
  const cx = 24;
  const cy = 24;

  // Angle for shadow sweep
  // 0% -> full dark
  // 50% -> half light
  // 100% -> full light
  
  // Illuminated path construction:
  // Right side illuminated when growing, Left side illuminated when shrinking
  let lightPath = "";
  if (isFull) {
    lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
  } else if (isNew) {
    lightPath = "";
  } else {
    // Semi-ellipse sweep radius x
    const sweepRx = Math.abs(r * (1 - 2 * pct));
    const sweepFlag = pct < 0.5 ? 0 : 1; // 0 for crescent, 1 for gibbous

    if (isGrowing) {
      // Light is on the right side
      if (pct < 0.5) {
        // Crescent (Growing): Outer right arc + Inner right arc subtracting
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${sweepRx} ${r} 0 0 1 ${cx} ${cy - r}`;
      } else {
        // Gibbous (Growing): Outer right arc + Inner left arc adding
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${sweepRx} ${r} 0 0 0 ${cx} ${cy - r}`;
      }
    } else {
      // Light is on the left side
      if (pct < 0.5) {
        // Crescent (Shrinking): Outer left arc + Inner left arc
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${sweepRx} ${r} 0 0 0 ${cx} ${cy - r}`;
      } else {
        // Gibbous (Shrinking): Outer left arc + Inner right arc
        lightPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${sweepRx} ${r} 0 0 1 ${cx} ${cy - r}`;
      }
    }
  }

  // Generate unique mask/gradient IDs
  const idSuffix = Math.random().toString(36).substr(2, 5);

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
        className="overflow-visible filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
      >
        <defs>
          {/* Dark moon sphere gradient */}
          <radialGradient id={`darkMoon-${idSuffix}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Glowing Golden-Silver light surface gradient */}
          <radialGradient id={`lightMoon-${idSuffix}`} cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          {/* Glass glare highlight */}
          <linearGradient id={`glassGlare-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Outer Ambient Glow */}
          <filter id={`glow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glass Ring / Atmosphere Halo */}
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

        {/* Subtle Crater Details on Dark Side */}
        <circle cx="16" cy="18" r="3.5" fill="#0f172a" opacity="0.5" />
        <circle cx="28" cy="30" r="4.5" fill="#0f172a" opacity="0.4" />
        <circle cx="20" cy="32" r="2.5" fill="#0f172a" opacity="0.5" />
        <circle cx="31" cy="16" r="3" fill="#0f172a" opacity="0.4" />

        {/* 2. Illuminated Moon Phase Surface */}
        {lightPath && (
          <path 
            d={lightPath} 
            fill={`url(#lightMoon-${idSuffix})`}
            filter={isFull ? `url(#glow-${idSuffix})` : undefined}
          />
        )}

        {/* Crater Overlays on Illuminated Side (clipped) */}
        {lightPath && (
          <g opacity="0.15">
            <circle cx="16" cy="18" r="3.5" fill="#78350f" />
            <circle cx="28" cy="30" r="4.5" fill="#78350f" />
            <circle cx="20" cy="32" r="2.5" fill="#78350f" />
            <circle cx="31" cy="16" r="3" fill="#78350f" />
          </g>
        )}

        {/* 3. Glassmorphic Surface Reflection Gloss */}
        <ellipse 
          cx={cx} 
          cy={cy - 8} 
          rx={r - 4} 
          ry={r / 2.2} 
          fill={`url(#glassGlare-${idSuffix})`} 
          transform={`rotate(-20 ${cx} ${cy - 8})`}
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
