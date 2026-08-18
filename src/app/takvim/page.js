"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sparkles, Info, BookOpen, MapPin, ShieldCheck } from 'lucide-react';
import { getMoonPhase } from '../../lib/moonCalc';
import { HALK_TAKVIMI_EVENTS } from '../../data/halk-takvimi';
import { CROPS_GUIDE } from '../../data/ekim-rehberi';
import MoonIcon from '../../components/MoonIcon';
import GlassIcon from '../../components/GlassIcon';
import NativeAdCard from '../../components/NativeAdCard';

const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [userNotes, setUserNotes] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const loadUserNotes = () => {
    const saved = localStorage.getItem('ata_takvimi_notes');
    if (saved) {
      try {
        setUserNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadUserNotes();
    window.addEventListener('storage', loadUserNotes);
    return () => window.removeEventListener('storage', loadUserNotes);
  }, []);

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

  const selectedDateStr = `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, '0')}-${String(selectedDay.getDate()).padStart(2, '0')}`;
  const selectedDayNotes = userNotes.filter(n => n.sowingDate === selectedDateStr);

  const getCropMeta = (note) => {
    if (note.cropId) {
      return CROPS_GUIDE.find(c => c.id === note.cropId) || { id: note.cropId, name: note.cropName, category: note.cropCategory || 'Tarım' };
    }
    const found = CROPS_GUIDE.find(c => c.name.toLowerCase().includes((note.cropName || '').toLowerCase()));
    return found || { id: 'bugday', name: note.cropName || 'Bitki', category: 'Tarım' };
  };

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
            Ay evrelerini, Anadolu geleneksel tarım günlerini ve eklediğiniz kişisel bitki notlarını gün gün inceleyin.
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
      <div className="glass-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-6 border border-forest-800/10">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center">
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day, i) => (
            <div key={i} className="text-[11px] sm:text-xs font-bold text-forest-800/60 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Blank Padding Days */}
          {Array.from({ length: startDayIndex }).map((_, i) => (
            <div key={`blank-${i}`} className="h-16 sm:h-20 md:h-24 rounded-xl sm:rounded-2xl bg-forest-800/5 opacity-30" />
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

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayNotes = userNotes.filter(n => n.sowingDate === dateStr);

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(thisDate)}
                className={`h-16 sm:h-20 md:h-24 rounded-xl sm:rounded-2xl p-1 sm:p-2 flex flex-col justify-between text-left transition-all relative ${
                  isSelected
                    ? 'badge-forest shadow-xl ring-2 ring-harvest-400 scale-[1.02] z-10'
                    : 'bg-white/80 border border-forest-800/10 hover:border-harvest-500 hover:shadow-md'
                }`}
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between justify-center w-full gap-0.5">
                  <span className={`font-bold text-xs sm:text-sm leading-none ${isSelected ? 'text-harvest-400' : 'text-forest-900'}`}>
                    {dayNum}
                  </span>
                  <div className="shrink-0 flex items-center justify-center">
                    <MoonIcon 
                      illumination={moon.illumination}
                      linearIllumination={moon.linearIllumination} 
                      isGrowing={moon.isGrowing} 
                      phaseName={moon.phaseName} 
                      size={22} 
                    />
                  </div>
                </div>

                {/* Event & User Notes Markers */}
                <div className="space-y-0.5 sm:space-y-1 w-full overflow-hidden">
                  {/* User Note Badge Indicator */}
                  {dayNotes.length > 0 && (
                    <div className="text-[8px] sm:text-[9px] px-1 py-0.5 rounded font-bold bg-emerald-500 text-white truncate flex items-center justify-center sm:justify-start gap-0.5 shadow-sm">
                      📌 <span className="hidden sm:inline">{dayNotes.length} Not</span>
                    </div>
                  )}

                  {/* Lunar Milestone Badge */}
                  {moon.phaseName.includes("Dolunay") && (
                    <div className="text-[8px] sm:text-[9px] px-0.5 sm:px-1 py-0.5 rounded font-bold bg-amber-400 text-amber-950 truncate text-center sm:text-left">
                      🌕 <span className="hidden sm:inline">Dolunay</span>
                    </div>
                  )}
                  {moon.phaseName.includes("Yeni Ay") && (
                    <div className="text-[8px] sm:text-[9px] px-0.5 sm:px-1 py-0.5 rounded font-bold bg-emerald-600 text-white truncate text-center sm:text-left">
                      🌒 <span className="hidden sm:inline">Yeni Ay</span>
                    </div>
                  )}
                  {moon.phaseName.includes("Karanlık Ay") && (
                    <div className="text-[8px] sm:text-[9px] px-0.5 sm:px-1 py-0.5 rounded font-bold bg-slate-800 text-slate-200 truncate text-center sm:text-left">
                      🌑 <span className="hidden sm:inline">Karanlık Ay</span>
                    </div>
                  )}

                  {/* Folk Event Marker */}
                  {event && (
                    <div className={`text-[8px] sm:text-[9px] p-0.5 sm:px-1 rounded font-semibold truncate w-full text-center sm:text-left ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-harvest-400/20 text-harvest-600'
                    }`}>
                      {event.icon} <span className="hidden sm:inline">{event.title}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail Box */}
      <div className="glass-card-dark rounded-3xl p-6 border border-harvest-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
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
            <h4 className="text-xs text-harvest-400 font-bold uppercase mb-1">Ay Evresi Tarım Tavsiyesi</h4>
            <p className="text-xs text-white/90 leading-relaxed">
              {selectedMoon.advice || 'Toprak nemine dikkat edin, uygun Ay safhasında sulama ve çapa yapın.'}
            </p>
          </div>
        </div>

        {/* User Personal Notes for Selected Day */}
        <div className="bg-white/10 p-4 rounded-2xl border border-emerald-400/30">
          <h4 className="text-xs text-emerald-400 font-bold uppercase mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            📌 Bu Tarihteki Kişisel Bitki & Tarım Notlarınız ({selectedDayNotes.length})
          </h4>

          {selectedDayNotes.length === 0 ? (
            <p className="text-xs text-white/60">
              Bu tarihe eklenmiş kişisel bir bitki ekimi veya bahçe notunuz bulunmuyor. "Bitkilerim & Notlar" sekmesinden yeni not ekleyebilirsiniz.
            </p>
          ) : (
            <div className="space-y-3 mt-2">
              {selectedDayNotes.map(n => {
                const cropMeta = getCropMeta(n);
                return (
                  <div key={n.id} className="bg-forest-950/80 p-3.5 rounded-xl border border-emerald-500/40 flex items-start gap-3">
                    <GlassIcon cropId={cropMeta.id} icon={cropMeta.icon} category={cropMeta.category} size={42} />
                    <div className="text-xs text-white space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-harvest-300 text-sm">{n.noteTitle || n.cropName || cropMeta.name}</h5>
                        <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded font-bold">Kişisel Not</span>
                      </div>
                      <p className="text-white/90 leading-relaxed">{n.note || 'Not detay belirmemiş.'}</p>
                      {n.fieldName && (
                        <p className="text-[11px] text-harvest-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-terracotta-400" /> Konum: {n.fieldName}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sponsorlu Reklam Alanı */}
      <NativeAdCard index={1} />
    </div>
  );
}
