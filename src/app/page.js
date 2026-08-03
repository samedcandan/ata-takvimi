"use client";

import { useState } from 'react';
import CalendarCard from '../components/CalendarCard';
import MoonPhaseWidget from '../components/MoonPhaseWidget';
import WeatherAlert from '../components/WeatherAlert';
import AgricultureTips from '../components/AgricultureTips';
import Link from 'next/link';
import { Sprout, ChevronRight, Sparkles, CalendarDays } from 'lucide-react';
import { CROPS_GUIDE } from '../data/ekim-rehberi';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar Card (2 cols) */}
        <div className="lg:col-span-2">
          <CalendarCard selectedDate={selectedDate} />
        </div>

        {/* Moon Phase & Weather Column */}
        <div className="space-y-6">
          <MoonPhaseWidget selectedDate={selectedDate} />
          <WeatherAlert />
        </div>
      </div>

      {/* Agriculture Tips & Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <AgricultureTips selectedDate={selectedDate} />
        </div>

        {/* Quick Guide Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-forest-800/10">
          <div>
            <div className="flex items-center gap-2 text-forest-800 font-bold text-sm mb-2">
              <Sprout className="w-5 h-5 text-forest-500" />
              <span>Bu Ay Ne Ekilir?</span>
            </div>
            <p className="text-xs text-forest-800/70">
              Şu anki ay ve Ay safhasına göre en verimli ürün seçimi.
            </p>

            <div className="mt-4 space-y-2">
              {CROPS_GUIDE.slice(0, 3).map(crop => (
                <div key={crop.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 border border-forest-800/10 text-xs">
                  <span className="font-semibold text-forest-900 flex items-center gap-2">
                    <span>{crop.icon}</span> {crop.name}
                  </span>
                  <span className="text-[10px] bg-harvest-400/20 text-harvest-600 font-bold px-2 py-0.5 rounded-md">
                    {crop.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/ekim-rehberi"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl badge-forest font-semibold text-xs transition-transform hover:scale-[1.02] shadow-md"
          >
            <span>Tüm Ekim Rehberini Gör</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
