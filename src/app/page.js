"use client";

import { useState, useEffect, useRef } from 'react';
import { HALK_TAKVIMI_EVENTS } from '../data/halk-takvimi';
import { getLunarMilestoneEvents } from '../lib/moonCalc';
import MoonIcon from '../components/MoonIcon';
import GlassIcon from '../components/GlassIcon';
import WeatherCard from '../components/WeatherCard';
import { Calendar, ChevronDown, Sparkles, MapPin, Tag } from 'lucide-react';

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const CATEGORY_COLORS = {
  ay: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', label: 'Ay Evresi' },
  cemre: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', label: 'Cemre' },
  mevsim: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', label: 'Mevsim' },
  hava: { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200', label: 'Hava' },
  tarim: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', label: 'Tarım' },
  doga: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Doğa' },
  hayvancilik: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', label: 'Hayvancılık' },
  kisisel: { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300', label: '📌 Kişisel Notum' },
  genel: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', label: 'Genel' },
};

function getEventsFromToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const currentYear = today.getFullYear();

  // 1. Geleneksel Anadolu Halk Takvimi Olayları (365 günlük döngü)
  const futureThisYear = HALK_TAKVIMI_EVENTS.filter(
    e => e.month > currentMonth || (e.month === currentMonth && e.day >= currentDay)
  ).map(e => ({ ...e, year: currentYear }));

  const nextYear = HALK_TAKVIMI_EVENTS.filter(
    e => e.month < currentMonth || (e.month === currentMonth && e.day < currentDay)
  ).map(e => ({ ...e, year: currentYear + 1 }));

  // 2. Astronomik Ay Evresi Dönüm Noktaları
  const lunarEvents = getLunarMilestoneEvents(today, 365);

  // 3. İki listeyi birleştir ve tam tarih bazında kronolojik sırala
  const rawCombined = [...futureThisYear, ...nextYear, ...lunarEvents];

  const enriched = rawCombined.map(event => {
    const eventDate = new Date(event.year, event.month - 1, event.day);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      ...event,
      eventDate,
      diffDays,
      isToday: diffDays === 0,
      dateLabel: `${event.day} ${MONTHS[event.month - 1]} ${event.year}`,
    };
  });

  return enriched;
}

function groupByMonth(events) {
  const groups = {};
  const order = [];
  events.forEach(e => {
    const key = `${MONTHS[e.month - 1]} ${e.year}`;
    if (!groups[key]) {
      groups[key] = [];
      order.push(key);
    }
    groups[key].push(e);
  });
  return { groups, order };
}

export default function HomePage() {
  const [allEvents, setAllEvents] = useState([]);
  const todayRef = useRef(null);

  const loadEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const systemEvents = getEventsFromToday();
    const savedNotes = localStorage.getItem('ata_takvimi_notes');
    let userNotesEvents = [];

    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        userNotesEvents = parsed.map(note => {
          const dateParts = (note.sowingDate || '').split('-');
          if (dateParts.length !== 3) return null;
          const y = parseInt(dateParts[0], 10);
          const m = parseInt(dateParts[1], 10);
          const d = parseInt(dateParts[2], 10);

          const eventDate = new Date(y, m - 1, d);
          const diffTime = eventDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return {
            id: `user-note-${note.id}`,
            isUserNote: true,
            cropId: note.cropId || 'bugday',
            title: note.noteTitle || `${note.cropName || 'Bitki'} Kaydı`,
            desc: note.note ? `${note.note} (${note.fieldName || 'Bahçem'})` : `Tarih: ${note.sowingDate} - Konum: ${note.fieldName || 'Bahçem'}`,
            category: 'kisisel',
            day: d,
            month: m,
            year: y,
            eventDate,
            diffDays,
            isToday: diffDays === 0,
            dateLabel: `${d} ${MONTHS[m - 1]} ${y}`,
            fieldName: note.fieldName,
            cropName: note.cropName
          };
        }).filter(Boolean);
      } catch (e) {
        console.error(e);
      }
    }

    const combined = [...systemEvents, ...userNotesEvents];
    combined.sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
    setAllEvents(combined);
  };

  useEffect(() => {
    loadEvents();
    window.addEventListener('storage', loadEvents);
    return () => window.removeEventListener('storage', loadEvents);
  }, []);

  const { groups, order } = groupByMonth(allEvents);
  const firstEvent = allEvents[0];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="glass-card-dark rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-harvest-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-harvest-400 border border-white/15">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-harvest-400 font-semibold">Takvim Akışı</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                Anadolu Halk & Ay Takvimi Akışı
              </h2>
            </div>
          </div>
          <div className="px-4 py-1.5 rounded-full badge-gold text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{allEvents.length} Dönem & Kayıt Noktası</span>
          </div>
        </div>

        {/* Next upcoming event highlight */}
        {firstEvent && (
          <div className="bg-white/10 rounded-2xl p-5 border border-white/15 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="shrink-0 p-2 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center min-w-[56px] min-h-[56px]">
                {firstEvent.isLunar ? (
                  <MoonIcon 
                    illumination={firstEvent.illumination} 
                    isGrowing={firstEvent.isGrowing} 
                    phaseName={firstEvent.title} 
                    size={40} 
                  />
                ) : (
                  <GlassIcon cropId={firstEvent.cropId} icon={firstEvent.icon || "📌"} category={firstEvent.category} size={44} />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-harvest-400">{firstEvent.title}</h3>
                  <span className="text-[10px] bg-forest-500 text-white px-2 py-0.5 rounded-md font-medium">
                    {firstEvent.isToday ? '📍 Bugün' : firstEvent.diffDays < 0 ? `${Math.abs(firstEvent.diffDays)} gün önce` : `${firstEvent.diffDays} gün kaldı`}
                  </span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{firstEvent.desc}</p>
                <p className="text-xs text-harvest-400/80 mt-1">{firstEvent.dateLabel}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60 animate-bounce">
          <ChevronDown className="w-4 h-4" />
          <span>Tüm takvimi aşağıda inceleyin</span>
        </div>
      </div>

      {/* 3-Day Agricultural Weather Forecast */}
      <WeatherCard />

      {/* Timeline */}
      {order.map((monthName) => {
        const monthEvents = groups[monthName];
        return (
          <div key={monthName} className="space-y-3">
            {/* Month Header */}
            <div className="sticky top-16 z-10 flex items-center gap-3 py-2">
              <div className="bg-forest-800 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                {monthName}
              </div>
              <div className="flex-1 h-px bg-forest-800/20" />
            </div>

            {/* Events */}
            {monthEvents.map((event, idx) => {
              const cat = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.genel;
              return (
                <div
                  key={`${event.month}-${event.day}-${event.title}`}
                  ref={idx === 0 && event === firstEvent ? todayRef : null}
                  className={`glass-card rounded-2xl p-5 border transition-all hover:shadow-lg hover:scale-[1.01] ${
                    event.isUserNote
                      ? 'border-emerald-500/50 bg-emerald-50/20 shadow-sm'
                      : event.isToday
                      ? 'border-forest-500 ring-2 ring-forest-400/30 shadow-lg'
                      : event.isLunar
                      ? 'border-indigo-800/20 bg-indigo-50/30'
                      : 'border-forest-800/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Date / Icon Badge */}
                    <div className="shrink-0 flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        event.isToday 
                          ? 'bg-forest-500 shadow-md' 
                          : event.isLunar
                          ? 'bg-indigo-950/80 border border-indigo-500/30 shadow-sm'
                          : 'bg-forest-50 border border-forest-800/10'
                      }`}>
                        {event.isLunar ? (
                          <MoonIcon 
                            illumination={event.illumination} 
                            isGrowing={event.isGrowing} 
                            phaseName={event.title} 
                            size={32} 
                          />
                        ) : (
                          <GlassIcon cropId={event.cropId} icon={event.icon || "📌"} category={event.category} size={36} />
                        )}
                      </div>
                      <span className={`text-[11px] font-bold mt-1.5 ${event.isToday ? 'text-forest-500' : 'text-forest-800/60'}`}>
                        {event.day} {MONTHS[event.month - 1].slice(0, 3)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-forest-900 text-base leading-tight">{event.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${cat.bg} ${cat.text} ${cat.border} border`}>
                          {event.isUserNote ? '📌 Kişisel Notum' : cat.label}
                        </span>
                        {event.isToday && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-forest-500 text-white">
                            📍 Bugün
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-forest-800/80 leading-relaxed">{event.desc}</p>
                      {event.fieldName && (
                        <p className="text-xs text-harvest-600 font-medium mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {event.fieldName}
                        </p>
                      )}
                      {!event.isToday && event.diffDays > 0 && (
                        <p className="text-xs text-forest-500 font-medium mt-1">{event.diffDays} gün sonra</p>
                      )}
                      {!event.isToday && event.diffDays < 0 && (
                        <p className="text-xs text-forest-800/50 font-medium mt-1">{Math.abs(event.diffDays)} gün önce</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
