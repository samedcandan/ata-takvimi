"use client";

import { getMoonPhase } from '../lib/moonCalc';
import { Moon, Sprout, ArrowUpRight } from 'lucide-react';

export default function MoonPhaseWidget({ selectedDate = new Date() }) {
  const moon = getMoonPhase(selectedDate);

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-forest-800/10 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-forest-800 font-semibold text-sm">
          <Moon className="w-5 h-5 text-harvest-500" />
          <span>Ay Evreleri & Tarım Etkisi</span>
        </div>
        <span className="text-xs font-bold text-forest-800/60 bg-forest-800/5 px-2.5 py-1 rounded-full border border-forest-800/10">
          %{moon.illumination} Aydınlık
        </span>
      </div>

      {/* Visual Moon Display */}
      <div className="flex items-center gap-6 my-4 bg-gradient-to-r from-forest-900 to-forest-800 text-white p-5 rounded-2xl shadow-lg relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-harvest-400 flex items-center justify-center text-4xl shadow-2xl border-2 border-harvest-400/40 relative moon-glow shrink-0">
          {moon.symbol}
        </div>
        <div>
          <span className="text-xs text-harvest-400 font-semibold uppercase tracking-wider">
            {moon.isGrowing ? "▲ Büyüyen Safha" : "▼ Küçülen Safha"}
          </span>
          <h3 className="text-xl font-serif font-bold">{moon.phaseName}</h3>
          <p className="text-xs text-white/70 mt-1">Ay Yaşı: {moon.lunarAge} Gün (29.5 Günlük Döngü)</p>
        </div>
      </div>

      {/* Agricultural Advice */}
      <div className="bg-forest-50 p-4 rounded-2xl border border-forest-500/20">
        <div className="flex items-start gap-2.5">
          <Sprout className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-forest-900 uppercase">Geleneksel Tarımsal Tavsiye</h4>
            <p className="text-sm text-forest-800 mt-1 leading-snug">
              {moon.agricultureAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
