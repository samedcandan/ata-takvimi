"use client";

/**
 * Custom Vector SVG Crop Illustrations for Anadolu Tarımı
 * High-definition, beautifully crafted vector SVG graphics for every single agricultural product.
 */
export default function CropIcon({ id, size = 32, className = "" }) {
  switch (id) {
    // --- 1. İNCİR (FIG) ---
    case "incir":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Fig body (pear/teardrop shape) */}
          <path d="M18 4 C15 7 10 14 10 21 C10 27 13.5 31 18 31 C22.5 31 26 27 26 21 C26 14 21 7 18 4 Z" fill="#6b21a8" />
          {/* Fig highlight curve */}
          <path d="M14 15 C12.5 18 12.5 23 14 26" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          {/* Fig Stem */}
          <path d="M18 4 C18 2 19 1.5 20 1" stroke="#4d7c0f" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Sliced inner flesh showing pink seed core */}
          <path d="M18 12 C14.5 15 14 21 16.5 25.5 C19 23 21 17 18 12 Z" fill="#f43f5e" />
          <circle cx="17.5" cy="18" r="0.8" fill="#fef08a" />
          <circle cx="16" cy="21" r="0.8" fill="#fef08a" />
          <circle cx="18.5" cy="22" r="0.8" fill="#fef08a" />
        </svg>
      );

    // --- 2. ZEYTİN (OLIVE) ---
    case "zeytin":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Leaf sprig */}
          <path d="M7 10 Q14 7 20 13" stroke="#4d7c0f" strokeWidth="2" fill="none" />
          <path d="M12 9 C9 5 13 2 16 7 Z" fill="#65a30d" />
          {/* Green Olive */}
          <ellipse cx="14" cy="21" rx="6" ry="8" transform="rotate(-15 14 21)" fill="#84cc16" />
          <ellipse cx="12.5" cy="19" rx="1.5" ry="4" transform="rotate(-15 12.5 19)" fill="#d9f99d" opacity="0.6" />
          {/* Black/Purple Olive */}
          <ellipse cx="23" cy="22" rx="6.5" ry="8.5" transform="rotate(20 23 22)" fill="#3b0764" />
          <ellipse cx="21" cy="20" rx="1.5" ry="4" transform="rotate(20 21 20)" fill="#e9d5ff" opacity="0.5" />
        </svg>
      );

    // --- 3. FINDIK (HAZELNUT) ---
    case "findik":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Green leafy husk (Işkın/Çotanak) */}
          <path d="M7 18 C5 10 11 6 18 6 C25 6 31 10 29 18 C26 15 22 17 18 14 C14 17 10 15 7 18 Z" fill="#65a30d" />
          {/* Hazelnut 1 */}
          <path d="M11 20 C11 16 16 15 16 20 C16 26 11 28 11 20 Z" fill="#9a3412" />
          <path d="M13 16 C14 16 15.5 17 15.5 19" stroke="#fed7aa" strokeWidth="1" fill="none" />
          {/* Hazelnut 2 */}
          <path d="M17 21 C17 15 25 15 25 21 C25 28 17 29 17 21 Z" fill="#7c2d12" />
          <path d="M19 17 C21 17 23.5 18 23.5 21" stroke="#ffedd5" strokeWidth="1.2" fill="none" />
        </svg>
      );

    // --- 4. CEVİZ (WALNUT) ---
    case "ceviz":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Green outer hull half */}
          <path d="M6 18 C6 9 14 5 21 7 C16 11 14 17 16 24 C11 25 6 22 6 18 Z" fill="#4d7c0f" />
          {/* Walnut Shell */}
          <ellipse cx="22" cy="19" rx="9" ry="10" fill="#9a3412" />
          {/* Shell Ridge seam */}
          <path d="M22 9 C20 14 20 24 22 29" stroke="#7c2d12" strokeWidth="2" fill="none" />
          <path d="M16 18 C19 16 25 16 28 18" stroke="#7c2d12" strokeWidth="1.5" fill="none" />
          <ellipse cx="20" cy="15" rx="2" ry="4" fill="#fed7aa" opacity="0.4" />
        </svg>
      );

    // --- 5. BUĞDAY (WHEAT) ---
    case "bugday":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Stem */}
          <path d="M18 34 L18 10" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
          {/* Grains left & right */}
          <ellipse cx="13" cy="14" rx="3.5" ry="2" transform="rotate(-35 13 14)" fill="#eab308" />
          <ellipse cx="23" cy="14" rx="3.5" ry="2" transform="rotate(35 23 14)" fill="#facc15" />
          <ellipse cx="12" cy="19" rx="4" ry="2.2" transform="rotate(-30 12 19)" fill="#ca8a04" />
          <ellipse cx="24" cy="19" rx="4" ry="2.2" transform="rotate(30 24 19)" fill="#eab308" />
          <ellipse cx="14" cy="24" rx="4" ry="2.2" transform="rotate(-25 14 24)" fill="#ca8a04" />
          <ellipse cx="22" cy="24" rx="4" ry="2.2" transform="rotate(25 22 24)" fill="#eab308" />
          {/* Top awn */}
          <ellipse cx="18" cy="9" rx="2.5" ry="4" fill="#fef08a" />
          <path d="M18 5 L18 1 M15 10 L10 5 M21 10 L26 5" stroke="#eab308" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    // --- 6. ARPA (BARLEY) ---
    case "arpa":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M18 34 L18 12" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
          {/* Long Awns (Sakal) */}
          <path d="M18 12 L10 1 M18 15 L8 5 M18 18 L7 10 M18 12 L26 1 M18 15 L28 5 M18 18 L29 10" stroke="#ca8a04" strokeWidth="1" />
          {/* Grains */}
          <ellipse cx="18" cy="10" rx="2" ry="3.5" fill="#facc15" />
          <ellipse cx="15" cy="15" rx="3" ry="2" transform="rotate(-20 15 15)" fill="#eab308" />
          <ellipse cx="21" cy="15" rx="3" ry="2" transform="rotate(20 21 15)" fill="#fef08a" />
          <ellipse cx="14" cy="20" rx="3" ry="2" transform="rotate(-20 14 20)" fill="#ca8a04" />
          <ellipse cx="22" cy="20" rx="3" ry="2" transform="rotate(20 22 20)" fill="#eab308" />
        </svg>
      );

    // --- 7. MISIR (CORN) ---
    case "misir":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Green Husk (Kabuk) */}
          <path d="M10 32 C8 24 10 14 15 10 C13 18 15 28 18 34 Z" fill="#4d7c0f" />
          <path d="M26 32 C28 24 26 14 21 10 C23 18 21 28 18 34 Z" fill="#65a30d" />
          {/* Yellow Cob */}
          <rect x="14" y="6" width="8" height="22" rx="4" fill="#facc15" />
          {/* Kernels */}
          <line x1="14" y1="11" x2="22" y2="11" stroke="#ca8a04" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="14" y1="15" x2="22" y2="15" stroke="#ca8a04" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="14" y1="19" x2="22" y2="19" stroke="#ca8a04" strokeWidth="1" strokeDasharray="1.5 1.5" />
          <line x1="14" y1="23" x2="22" y2="23" stroke="#ca8a04" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Silk Top */}
          <path d="M16 6 L14 2 M18 6 L18 1 M20 6 L22 2" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    // --- 8. DOMATES (TOMATO) ---
    case "domates":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Tomato body */}
          <circle cx="18" cy="20" r="12" fill="#ef4444" />
          <ellipse cx="14" cy="15" rx="3.5" ry="2" transform="rotate(-30 14 15)" fill="#fca5a5" opacity="0.6" />
          {/* Calyx & Stem */}
          <path d="M18 8 L18 4" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 9 L13 7 M18 9 L23 7 M18 9 L15 12 M18 9 L21 12 M18 9 L18 13" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // --- 9. BİBER (PEPPER) ---
    case "biber":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Red Kapya Pepper */}
          <path d="M13 10 C13 7 23 7 23 10 C24 18 21 28 17 32 C15 30 13 22 13 10 Z" fill="#dc2626" />
          <path d="M16 12 C15 18 16 25 17 29" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Green Cap & Stem */}
          <path d="M18 8 L19 3" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M13 10 Q18 13 23 10 L21 8 Q18 9 15 8 Z" fill="#22c55e" />
        </svg>
      );

    // --- 10. PATLICAN (EGGPLANT) ---
    case "patlican":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Purple Body */}
          <path d="M15 11 C13 11 10 18 11 25 C12 30 18 33 23 31 C27 28 27 20 22 13 C19 11 16 11 15 11 Z" fill="#581c87" />
          <path d="M14 16 C13 20 14 26 18 29" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Green Crown Cap */}
          <path d="M17 6 L17 2" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M13 11 C13 11 11 15 15 14 C17 14 18 16 20 13 C22 13 23 15 22 11 Z" fill="#22c55e" />
        </svg>
      );

    // --- 11. SALATALIK (CUCUMBER) ---
    case "salatalik":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M8 26 C4 18 10 8 18 6 C26 4 31 10 29 18 C27 26 16 32 8 26 Z" fill="#15803d" transform="rotate(-15 18 18)" />
          <path d="M11 21 C9 15 13 9 19 8" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          {/* Small spine bumps */}
          <circle cx="12" cy="14" r="0.8" fill="#86efac" />
          <circle cx="18" cy="20" r="0.8" fill="#86efac" />
          <circle cx="22" cy="14" r="0.8" fill="#86efac" />
          <circle cx="23" cy="22" r="0.8" fill="#86efac" />
        </svg>
      );

    // --- 12. PATATES (POTATO) ---
    case "patates":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M7 19 C5 12 12 6 21 7 C29 8 32 16 29 23 C25 29 14 31 7 24 C5 22 7 19 7 19 Z" fill="#b45309" />
          <path d="M12 12 C16 10 23 10 26 13" stroke="#fde047" strokeWidth="1.5" fill="none" opacity="0.4" />
          {/* Potato eyes */}
          <circle cx="13" cy="16" r="1" fill="#78350f" />
          <circle cx="22" cy="14" r="1" fill="#78350f" />
          <circle cx="18" cy="22" r="1.2" fill="#78350f" />
          <circle cx="25" cy="22" r="0.9" fill="#78350f" />
        </svg>
      );

    // --- 13. SOĞAN (ONION) ---
    case "sogan":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Purple/Red Onion Bulb */}
          <path d="M18 6 C10 12 7 22 12 28 C15 31 21 31 24 28 C29 22 26 12 18 6 Z" fill="#9d174d" />
          <path d="M18 6 C15 12 14 23 18 30 M18 6 C21 12 22 23 18 30" stroke="#fbcfe8" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Green Sprout */}
          <path d="M18 6 L16 1 M18 6 L19 2" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          {/* Root tuft */}
          <path d="M16 30 L15 34 M18 30 L18 35 M20 30 L21 34" stroke="#fde047" strokeWidth="1" />
        </svg>
      );

    // --- 14. SARIMSAK (GARLIC) ---
    case "sarimsak":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M18 6 C12 10 8 18 10 25 C12 29 24 29 26 25 C28 18 24 10 18 6 Z" fill="#f8fafc" />
          {/* Clove outlines */}
          <path d="M18 6 C14 12 13 22 16 28 M18 6 C22 12 23 22 20 28 M18 6 L18 28" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
          {/* Stem tip */}
          <path d="M18 6 L18 3" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // --- 15. HAVUÇ (CARROT) ---
    case "havuc":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Feathery Leaf Top */}
          <path d="M22 10 L27 4 M22 10 L24 2 M22 10 L30 8" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          {/* Carrot Root */}
          <path d="M24 11 C21 9 16 13 14 17 L7 31 C6 33 8 34 9 33 L22 20 C25 17 26 13 24 11 Z" fill="#ea580c" />
          <path d="M20 13 C18 16 14 20 11 25" stroke="#ffedd5" strokeWidth="1.2" fill="none" opacity="0.6" />
          {/* Wrinkle lines */}
          <line x1="17" y1="16" x2="19" y2="18" stroke="#c2410c" strokeWidth="1" />
          <line x1="13" y1="21" x2="15" y2="23" stroke="#c2410c" strokeWidth="1" />
        </svg>
      );

    // --- 16. ÜZÜM (GRAPE) ---
    case "uzum":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Stem & Vine leaf */}
          <path d="M18 4 L18 8 M18 8 Q24 4 28 8" stroke="#15803d" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M18 8 C14 6 10 9 12 13 Z" fill="#22c55e" />
          {/* Grape Bunch (Purple Spheres) */}
          <circle cx="14" cy="13" r="3.5" fill="#7e22ce" />
          <circle cx="22" cy="13" r="3.5" fill="#6b21a8" />
          <circle cx="18" cy="15" r="3.8" fill="#9333ea" />
          <circle cx="13" cy="19" r="3.5" fill="#6b21a8" />
          <circle cx="23" cy="19" r="3.5" fill="#7e22ce" />
          <circle cx="18" cy="21" r="3.8" fill="#a855f7" />
          <circle cx="15" cy="26" r="3.2" fill="#7e22ce" />
          <circle cx="21" cy="26" r="3.2" fill="#6b21a8" />
          <circle cx="18" cy="30" r="2.8" fill="#9333ea" />
        </svg>
      );

    // --- 17. AYÇİÇEĞİ (SUNFLOWER) ---
    case "aycicegi":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Yellow Petals Circle */}
          <g fill="#facc15">
            <ellipse cx="18" cy="6" rx="2" ry="4" />
            <ellipse cx="18" cy="30" rx="2" ry="4" />
            <ellipse cx="6" cy="18" rx="4" ry="2" />
            <ellipse cx="30" cy="18" rx="4" ry="2" />
            <ellipse cx="10" cy="10" rx="2.5" ry="3.5" transform="rotate(-45 10 10)" />
            <ellipse cx="26" cy="26" rx="2.5" ry="3.5" transform="rotate(-45 26 26)" />
            <ellipse cx="26" cy="10" rx="2.5" ry="3.5" transform="rotate(45 26 10)" />
            <ellipse cx="10" cy="26" rx="2.5" ry="3.5" transform="rotate(45 10 26)" />
          </g>
          {/* Seed Disk Center */}
          <circle cx="18" cy="18" r="7" fill="#78350f" />
          <circle cx="18" cy="18" r="5" fill="#451a03" stroke="#a16207" strokeWidth="1" strokeDasharray="1.5 1.5" />
        </svg>
      );

    // --- 18. PAMUK (COTTON) ---
    case "pamuk":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Brown Calyx Pod Base */}
          <path d="M12 26 C12 26 18 31 24 26 C22 22 14 22 12 26 Z" fill="#78350f" />
          <path d="M18 28 L18 34" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          {/* Fluffy White Cotton Bolls */}
          <circle cx="13" cy="18" r="5.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="23" cy="18" r="5.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="18" cy="13" r="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="18" cy="20" r="5.5" fill="#f8fafc" />
        </svg>
      );

    // --- 19. ÇAY (TEA) ---
    case "cay":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M18 32 L18 14" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          {/* Two fresh green leaves and a bud (2 yaprak 1 tomurcuk) */}
          <path d="M18 14 C12 8 6 12 10 20 C14 22 17 18 18 14 Z" fill="#4ade80" />
          <path d="M18 14 C24 8 30 12 26 20 C22 22 19 18 18 14 Z" fill="#22c55e" />
          <path d="M18 14 C16 9 18 4 18 4 C18 4 20 9 18 14 Z" fill="#86efac" />
        </svg>
      );

    // --- 20. KARPUZ & KAVUN (WATERMELON) ---
    case "karpuz-kavun":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Watermelon Slice */}
          <path d="M6 14 C6 26 26 26 30 14 Z" fill="#15803d" />
          <path d="M8 15 C8 24 24 24 28 15 Z" fill="#ffffff" />
          <path d="M9 16 C9 23 23 23 27 16 Z" fill="#ef4444" />
          {/* Black Seeds */}
          <circle cx="14" cy="19" r="1" fill="#000000" />
          <circle cx="18" cy="21" r="1" fill="#000000" />
          <circle cx="22" cy="19" r="1" fill="#000000" />
        </svg>
      );

    // --- 21. KABAK (PUMPKIN) ---
    case "kabak":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Orange Pumpkin */}
          <ellipse cx="18" cy="21" rx="13" ry="10" fill="#ea580c" />
          <ellipse cx="18" cy="21" rx="8" ry="10" fill="#f97316" />
          <ellipse cx="18" cy="21" rx="4" ry="10" fill="#fb923c" />
          {/* Stem */}
          <path d="M18 11 C18 6 21 5 21 5" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    // --- 22. KİKİK & LAVANTA (LAVENDER) ---
    case "tıbbi-otlar-kekik-lavanta":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M18 34 L18 10" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          {/* Purple Lavender Whorls */}
          <circle cx="18" cy="8" r="2.5" fill="#a855f7" />
          <circle cx="14" cy="12" r="2.5" fill="#7e22ce" />
          <circle cx="22" cy="12" r="2.5" fill="#9333ea" />
          <circle cx="15" cy="17" r="2.8" fill="#a855f7" />
          <circle cx="21" cy="17" r="2.8" fill="#7e22ce" />
          <circle cx="16" cy="22" r="2.5" fill="#9333ea" />
          <circle cx="20" cy="22" r="2.5" fill="#a855f7" />
        </svg>
      );

    // --- 23. ÇİLEK (STRAWBERRY) ---
    case "cilek":
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          {/* Heart/Berry shape */}
          <path d="M18 31 C10 24 8 16 11 12 C14 8 18 12 18 12 C18 12 22 8 25 12 C28 16 26 24 18 31 Z" fill="#dc2626" />
          {/* Seeds */}
          <circle cx="14" cy="15" r="0.7" fill="#fef08a" />
          <circle cx="18" cy="17" r="0.7" fill="#fef08a" />
          <circle cx="22" cy="15" r="0.7" fill="#fef08a" />
          <circle cx="15" cy="21" r="0.7" fill="#fef08a" />
          <circle cx="21" cy="21" r="0.7" fill="#fef08a" />
          <circle cx="18" cy="25" r="0.7" fill="#fef08a" />
          {/* Leaf Cap */}
          <path d="M18 10 L14 7 M18 10 L22 7 M18 10 L18 5 M18 10 L11 11 M18 10 L25 11" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // --- DEFAULT FALLBACK: PLANT SPROUT ---
    default:
      return (
        <svg viewBox="0 0 36 36" width={size} height={size} className={className}>
          <path d="M18 32 C18 20 18 14 18 10" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 18 C12 12 6 16 10 22 C14 24 17 21 18 18 Z" fill="#4ade80" />
          <path d="M18 14 C24 8 30 12 26 18 C22 20 19 17 18 14 Z" fill="#22c55e" />
        </svg>
      );
  }
}
