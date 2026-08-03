"use client";

import { Calendar as CalendarIcon, Sparkles, ChevronRight, Info } from 'lucide-react';
import { getTurkishDateFormatted, getHalkTakvimiEventForDate } from '../lib/utils';

export default function CalendarCard({ selectedDate = new Date() }) {
  const dateInfo = getTurkishDateFormatted(selectedDate);
  const halkEvent = getHalkTakvimiEventForDate(selectedDate);

  return (
    <div className="glass-card-dark rounded-3xl p-6 md:p-8 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-harvest-500/20 rounded-full blur-3xl group-hover:bg-harvest-500/30 transition-all pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-harvest-400 border border-white/15">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-harvest-400 font-semibold">Miladi & Halk Takvimi</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
              {dateInfo.dayNumber} {dateInfo.monthName} {dateInfo.year}
            </h2>
            <p className="text-sm text-white/70">{dateInfo.dayName}</p>
          </div>
        </div>

        {/* Category Tag */}
        <div className="px-4 py-1.5 rounded-full badge-gold text-xs font-semibold flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Anadolu Halk Takvimi</span>
        </div>
      </div>

      {/* Main Folk Event Banner */}
      <div className="bg-white/10 rounded-2xl p-5 border border-white/15 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="text-4xl shrink-0 p-2 bg-white/10 rounded-2xl border border-white/20">
            {halkEvent.icon || "🌾"}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-harvest-400">{halkEvent.title}</h3>
              {halkEvent.isUpcoming && (
                <span className="text-[10px] bg-terracotta-500 text-white px-2 py-0.5 rounded-md font-medium">
                  {halkEvent.diffDays} Gün Kaldı
                </span>
              )}
            </div>
            <p className="text-sm text-white/90 leading-relaxed font-sans">
              {halkEvent.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Seasonal Advice */}
      <div className="mt-4 flex items-center gap-2 text-xs text-white/80 bg-black/20 px-4 py-2.5 rounded-xl border border-white/10">
        <Info className="w-4 h-4 text-harvest-400 shrink-0" />
        <span>Geleneksel Çiftçi Notu: {halkEvent.category === "cemre" ? "Toprak uyanıyor, ilk ekim hazırlıkları ve tarlalara ahır gübresi taşıma dönemi." : "Hava şartlarına göre sulama ve toprak bakımına özen gösteriniz."}</span>
      </div>
    </div>
  );
}
