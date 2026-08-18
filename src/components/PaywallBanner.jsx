"use client";

import { useAuth } from '../context/AuthContext';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

export default function PaywallBanner({ 
  title = "Reklamsız Premium Deneyime Geçin", 
  description = "Ata Takvimi'ni yıl boyunca sıfır reklam ile en hızlı ve ferah şekilde kullanmak için 1 Yıllık Premium paketi başlatın." 
}) {
  const { setShowSubModal, setShowAuthModal, user, isAdFree } = useAuth();

  // Reklamsız kullanıcıya bu banner gösterilmez
  if (isAdFree) return null;

  return (
    <div className="glass-card-dark rounded-3xl p-5 md:p-7 text-white relative overflow-hidden border border-harvest-500/30 my-6 shadow-2xl">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-harvest-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-400/20 border border-harvest-400/30 text-harvest-300 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{APP_CONFIG.subscription.planBadge}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-white/80 max-w-xl">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {!user ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
            >
              Giriş Yap
            </button>
          ) : null}

          <button
            onClick={() => setShowSubModal(true)}
            className="px-6 py-3.5 rounded-2xl badge-gold text-forest-950 font-extrabold text-xs shadow-xl hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reklamları Kaldır ({APP_CONFIG.subscription.currencySymbol}{APP_CONFIG.subscription.priceNumber} / Yıl)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
