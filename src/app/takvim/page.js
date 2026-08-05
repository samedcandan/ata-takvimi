"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sparkles, Info } from 'lucide-react';
import { getMoonPhase } from '../../lib/moonCalc';
import { HALK_TAKVIMI_EVENTS } from '../../data/halk-takvimi';
import MoonIcon from '../../components/MoonIcon';

const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar matrix calculation
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Starting day index (0 = Sunday, convert to Monday = 0)
  let startDayIndex = firstDayOfMonth.getDay() - 1;
  if (startDayIndex === -1) startDayIndex = 6;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Selected Day Details
  const selectedMoon = getMoonPhase(selectedDay);
  const selectedEvent = HALK_TAKVIMI_EVENTS.find(
    e => e.month === selectedDay.getMonth() + 1 && e.day === selectedDay.getDate()
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-forest-900 flex items-center gap-2">
            <Moon className="w-6 h-6 text-harvest-500" />
            Aylık Halk & Ay Takvimi
          </h1>
          <p className="text-sm text-forest-800/70">
            Ay evreleri ve Anadolu geleneksel tarım günlerini gün gün inceleyin.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-forest-800/15 shadow-sm">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-xl hover:bg-forest-800/10 text-forest-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-forest-900 min-w-[120px] text-center">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-xl hover:bg-forest-800/10 text-forest-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card rounded-3xl p-6 border border-forest-800/10">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day, i) => (
            <div key={i} className="text-xs font-bold text-forest-800/60 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Blank Padding Days */}
          {Array.from({ length: startDayIndex }).map((_, i) => (
            <div key={`blank-${i}`} className="h-20 md:h-24 rounded-2xl bg-forest-800/5 opacity-30" />
          ))}

          {/* Days of Month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(year, month, dayNum);
            const moon = getMoonPhase(thisDate);
            const event = HALK_TAKVIMI_EVENTS.find(
              e => e.month === month + 1 && e.day === dayNum
            );
            const isSelected =
              selectedDay.getDate() === dayNum &&
              selectedDay.getMonth() === month &&
              selectedDay.getFullYear() === year;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(thisDate)}
                className={`h-20 md:h-24 rounded-2xl p-2 flex flex-col justify-between text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'badge-forest shadow-xl ring-2 ring-harvest-400 scale-[1.02]'
                    : 'bg-white/80 border border-forest-800/10 hover:border-harvest-500 hover:shadow-md'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between w-full">
                  <span className={`font-bold text-sm ${isSelected ? 'text-harvest-400' : 'text-forest-900'}`}>
                    {dayNum}
                  </span>
                  <MoonIcon 
                    illumination={moon.illumination} 
                    isGrowing={moon.isGrowing} 
                    phaseName={moon.phaseName} 
                    size={22} 
                  />
                </div>

                {/* Event Marker */}
                {event && (
                  <div className={`text-[10px] p-1 rounded-md font-semibold truncate w-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-harvest-400/20 text-harvest-600'
                  }`}>
                    {event.icon} {event.title}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail Box */}
      <div className="glass-card-dark rounded-3xl p-6 border border-harvest-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-harvest-400" />
            {selectedDay.getDate()} {MONTH_NAMES[selectedDay.getMonth()]} {selectedDay.getFullYear()} Detayları
          </h3>
          <div className="flex items-center gap-3">
            <MoonIcon 
              illumination={selectedMoon.illumination} 
              isGrowing={selectedMoon.isGrowing} 
              phaseName={selectedMoon.phaseName} 
              size={34} 
            />
            <span className="text-xs bg-harvest-400 text-forest-900 font-bold px-3 py-1.5 rounded-full">
              {selectedMoon.phaseName} (%{selectedMoon.illumination} Aydınlık)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Folk Event Detail */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <h4 className="text-xs text-harvest-400 font-bold uppercase mb-1">Anadolu Halk Takvimi</h4>
            {selectedEvent ? (
              <div>
                <p className="font-bold text-base text-white">{selectedEvent.icon} {selectedEvent.title}</p>
                <p className="text-xs text-white/80 mt-1">{selectedEvent.desc}</p>
              </div>
            ) : (
              <p className="text-xs text-white/70">Bu güne özel kayıtlı kritik geleneksel fırtına veya cemre dönemi yok. Normal bakım günüdür.</p>
            )}
          </div>

          {/* Agriculture Advice Detail */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <h4 className="text-xs text-harvest-400 font-bold uppercase mb-1">Ay Safhası Tarım Rehberi</h4>
            <p className="text-xs text-white/90 leading-relaxed">
              {selectedMoon.agricultureAdvice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
