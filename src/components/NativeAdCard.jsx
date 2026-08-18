"use client";

import { useAuth } from '../context/AuthContext';
import { Sparkles, ExternalLink, ShieldCheck, Sprout } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';
import { NATIVE_SPONSOR_ADS } from '../lib/adEngine';

export default function NativeAdCard({ index = 0, className = '' }) {
  const { isAdFree, setShowSubModal } = useAuth();

  if (isAdFree || !APP_CONFIG.ads.enabled) return null;

  const ad = NATIVE_SPONSOR_ADS[index % NATIVE_SPONSOR_ADS.length] || NATIVE_SPONSOR_ADS[0];

  return (
    <div className={`glass-card rounded-3xl p-5 md:p-6 border border-harvest-400/40 relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group my-4 ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-harvest-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-forest-800/10 text-forest-900 border border-forest-800/20">
              {ad.tag}
            </span>
            <span className="text-[10px] text-forest-800/60 font-medium">Sponsorlu İçerik</span>
          </div>

          <h4 className="font-serif font-bold text-base md:text-lg text-forest-900 leading-tight">
            {ad.title}
          </h4>
          <p className="text-xs text-forest-800/80 leading-relaxed max-w-xl">
            {ad.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
          {ad.isUpgrade ? (
            <button
              onClick={() => setShowSubModal(true)}
              className="px-4 py-2.5 rounded-xl badge-gold text-forest-950 font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{ad.cta}</span>
            </button>
          ) : (
            <>
              {ad.link && (
                <a
                  href={ad.link}
                  className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{ad.cta}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={() => setShowSubModal(true)}
                title="Tüm reklamları kaldırın"
                className="px-3 py-2 rounded-xl bg-harvest-100 hover:bg-harvest-200 text-forest-950 font-bold text-[11px] border border-harvest-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-harvest-600" />
                <span>Reklamı Kaldır</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
