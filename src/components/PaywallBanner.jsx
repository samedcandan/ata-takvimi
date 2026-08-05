"use client";

import { useAuth } from '../context/AuthContext';
import { Sparkles, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PaywallBanner({ title = "Ata Takvimi Premium Abone Hizmeti", description = "Bu özelliğe erişmek için aktif bir Çiftçi Aboneliğiniz olmalıdır." }) {
  const { setShowSubModal, setShowAuthModal, user } = useAuth();

  return (
    <div className="glass-card-dark rounded-3xl p-6 md:p-8 text-white relative overflow-hidden border border-harvest-500/30 my-6 shadow-2xl">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-harvest-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-400/20 border border-harvest-400/30 text-harvest-300 font-bold text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>Sadece Abonelerimize Özel</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="text-sm text-white/80 max-w-xl">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {!user ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-white text-forest-900 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Giriş Yap / Üye Ol
            </button>
          ) : null}

          <button
            onClick={() => setShowSubModal(true)}
            className="px-6 py-3.5 rounded-2xl badge-gold text-forest-900 font-bold text-xs shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Aboneliği Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
