"use client";

import { useAuth } from '../context/AuthContext';
import { Sparkles, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';
import { APP_CONFIG } from '../lib/config';

export default function AdBanner({ position = 'bottom', className = '' }) {
  const { isAdFree, setShowSubModal } = useAuth();
  const [closed, setClosed] = useState(false);

  // Reklamsız kullanıcılar veya kapatılmış banner için hiçbir şey render etme
  if (isAdFree || closed || !APP_CONFIG.ads.enabled) return null;

  return (
    <aside 
      aria-label="Sponsor Reklam Alanı"
      className={`w-full max-w-5xl mx-auto my-3 px-3 py-2 rounded-2xl bg-forest-900/90 text-white border border-emerald-500/30 shadow-lg flex items-center justify-between gap-3 text-xs backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Sol Etiket & Bilgi */}
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 shrink-0">
          Sponsor
        </span>
        <div className="truncate">
          <p className="font-bold text-white text-xs truncate">
            🌾 Bereketli Hasat İçin Anadolu Toprak İpuçları
          </p>
          <p className="text-[10px] text-emerald-200/70 truncate hidden sm:block">
            Geleneksel ekim günleri ve doğru ay evresiyle mahsulünüzü %30 artırın.
          </p>
        </div>
      </div>

      {/* Sağ Aksiyon Butonları */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setShowSubModal(true)}
          title="Reklamsız Premium'a Geç"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl badge-gold text-forest-950 font-bold text-[10px] shadow-sm hover:scale-105 transition-transform cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>Reklamı Kaldır ({APP_CONFIG.subscription.currencySymbol}{APP_CONFIG.subscription.priceNumber})</span>
        </button>

        <button
          onClick={() => setClosed(true)}
          className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Reklamı Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
