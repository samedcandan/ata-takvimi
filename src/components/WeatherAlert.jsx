"use client";

import { ThermometerSnowflake, ShieldAlert, CloudRain, Wind } from 'lucide-react';

export default function WeatherAlert() {
  return (
    <div className="glass-card rounded-3xl p-6 border border-terracotta-500/20 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-terracotta-600 font-bold text-sm">
          <ThermometerSnowflake className="w-5 h-5" />
          <span>Erken Uyarı & Risk Takibi</span>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
          🟢 Düşük Risk
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="bg-white/80 p-3 rounded-2xl border border-forest-800/10 flex items-center gap-3">
          <CloudRain className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Beklenen Yağış</p>
            <p className="text-sm font-bold text-gray-900">4.2 mm / m²</p>
          </div>
        </div>

        <div className="bg-white/80 p-3 rounded-2xl border border-forest-800/10 flex items-center gap-3">
          <Wind className="w-6 h-6 text-amber-600" />
          <div>
            <p className="text-[10px] text-gray-500 font-medium">Rüzgar Şiddeti</p>
            <p className="text-sm font-bold text-gray-900">14 km/s (Poyraz)</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-forest-900 bg-harvest-400/20 p-3 rounded-xl border border-harvest-500/30">
        <ShieldAlert className="w-4 h-4 text-terracotta-500 shrink-0" />
        <span>Önemli: Önümüzdeki 5 gün içerisinde bölgenizde gece dondurucu soğuk riski öngörülmemektedir.</span>
      </div>
    </div>
  );
}
