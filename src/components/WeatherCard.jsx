"use client";

import { useState, useEffect } from 'react';
import { CloudSun, Sun, CloudRain, CloudSnow, Wind, Droplets, ShieldAlert, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CITY_COORDS = {
  "Adana": { lat: 37.00, lon: 35.32 },
  "Adıyaman": { lat: 37.76, lon: 38.27 },
  "Afyonkarahisar": { lat: 38.75, lon: 30.54 },
  "Ağrı": { lat: 39.72, lon: 43.05 },
  "Aksaray": { lat: 38.37, lon: 34.03 },
  "Amasya": { lat: 40.65, lon: 35.83 },
  "Ankara": { lat: 39.93, lon: 32.85 },
  "Antalya": { lat: 36.88, lon: 30.70 },
  "Ardahan": { lat: 41.11, lon: 42.70 },
  "Artvin": { lat: 41.18, lon: 41.82 },
  "Aydın": { lat: 37.84, lon: 27.84 },
  "Balıkesir": { lat: 39.65, lon: 27.88 },
  "Bartın": { lat: 41.63, lon: 32.33 },
  "Batman": { lat: 37.88, lon: 41.13 },
  "Bayburt": { lat: 40.25, lon: 40.22 },
  "Bilecik": { lat: 40.14, lon: 29.97 },
  "Bingöl": { lat: 38.88, lon: 40.49 },
  "Bitlis": { lat: 38.40, lon: 42.10 },
  "Bolu": { lat: 40.73, lon: 31.60 },
  "Burdur": { lat: 37.72, lon: 30.28 },
  "Bursa": { lat: 40.18, lon: 29.06 },
  "Çanakkale": { lat: 40.15, lon: 26.40 },
  "Çankırı": { lat: 40.60, lon: 33.61 },
  "Çorum": { lat: 40.54, lon: 34.95 },
  "Denizli": { lat: 37.77, lon: 29.08 },
  "Diyarbakır": { lat: 37.91, lon: 40.24 },
  "Düzce": { lat: 40.84, lon: 31.16 },
  "Edirne": { lat: 41.67, lon: 26.55 },
  "Elazığ": { lat: 38.67, lon: 39.22 },
  "Erzincan": { lat: 39.75, lon: 39.49 },
  "Erzurum": { lat: 39.90, lon: 41.27 },
  "Eskişehir": { lat: 39.77, lon: 30.52 },
  "Gaziantep": { lat: 37.06, lon: 37.38 },
  "Giresun": { lat: 40.91, lon: 38.38 },
  "Gümüşhane": { lat: 40.46, lon: 39.47 },
  "Hakkari": { lat: 37.57, lon: 43.73 },
  "Hatay": { lat: 36.20, lon: 36.16 },
  "Iğdır": { lat: 39.92, lon: 44.04 },
  "Isparta": { lat: 37.76, lon: 30.55 },
  "İstanbul": { lat: 41.00, lon: 28.97 },
  "İzmir": { lat: 38.42, lon: 27.14 },
  "Kahramanmaraş": { lat: 37.58, lon: 36.93 },
  "Karabük": { lat: 41.20, lon: 32.62 },
  "Karaman": { lat: 37.18, lon: 33.22 },
  "Kars": { lat: 40.60, lon: 43.09 },
  "Kastamonu": { lat: 41.37, lon: 33.77 },
  "Kayseri": { lat: 38.73, lon: 35.48 },
  "Kırıkkale": { lat: 39.84, lon: 33.51 },
  "Kırklareli": { lat: 41.73, lon: 27.22 },
  "Kırşehir": { lat: 39.14, lon: 34.16 },
  "Kilis": { lat: 36.71, lon: 37.11 },
  "Kocaeli": { lat: 40.85, lon: 29.88 },
  "Konya": { lat: 37.87, lon: 32.49 },
  "Kütahya": { lat: 39.41, lon: 29.98 },
  "Malatya": { lat: 38.35, lon: 38.31 },
  "Manisa": { lat: 38.61, lon: 27.42 },
  "Mardin": { lat: 37.31, lon: 40.73 },
  "Mersin": { lat: 36.80, lon: 34.63 },
  "Muğla": { lat: 37.21, lon: 28.36 },
  "Muş": { lat: 38.74, lon: 41.49 },
  "Nevşehir": { lat: 38.62, lon: 34.71 },
  "Niğde": { lat: 37.96, lon: 34.68 },
  "Ordu": { lat: 40.98, lon: 37.87 },
  "Osmaniye": { lat: 37.07, lon: 36.24 },
  "Rize": { lat: 41.02, lon: 40.52 },
  "Sakarya": { lat: 40.75, lon: 30.38 },
  "Samsun": { lat: 41.29, lon: 36.33 },
  "Siirt": { lat: 37.93, lon: 41.94 },
  "Sinop": { lat: 42.02, lon: 35.15 },
  "Sivas": { lat: 39.74, lon: 37.01 },
  "Şanlıurfa": { lat: 37.16, lon: 38.79 },
  "Şırnak": { lat: 37.51, lon: 42.45 },
  "Tekirdağ": { lat: 40.98, lon: 27.51 },
  "Tokat": { lat: 40.31, lon: 36.55 },
  "Trabzon": { lat: 41.00, lon: 39.71 },
  "Tunceli": { lat: 39.10, lon: 39.54 },
  "Uşak": { lat: 38.68, lon: 29.40 },
  "Van": { lat: 38.50, lon: 43.37 },
  "Yalova": { lat: 40.65, lon: 29.27 },
  "Yozgat": { lat: 39.81, lon: 34.81 },
  "Zonguldak": { lat: 41.45, lon: 31.79 }
};

function getWeatherInfo(code) {
  if (code === 0) return { label: 'Açık / Güneşli', icon: '☀️', color: 'text-amber-500' };
  if (code >= 1 && code <= 3) return { label: 'Parçalı Bulutlu', icon: '⛅', color: 'text-sky-500' };
  if (code === 45 || code === 48) return { label: 'Sisli', icon: '🌫️', color: 'text-slate-400' };
  if (code >= 51 && code <= 67) return { label: 'Yağmurlu', icon: '🌧️', color: 'text-blue-500' };
  if (code >= 71 && code <= 77) return { label: 'Kar Yağışlı', icon: '🌨️', color: 'text-cyan-300' };
  if (code >= 80 && code <= 82) return { label: 'Sağanak Yağış', icon: '🌦️', color: 'text-blue-600' };
  if (code >= 95) return { label: 'Gök Gürültülü', icon: '🌩️', color: 'text-indigo-600' };
  return { label: 'Açık', icon: '☀️', color: 'text-amber-500' };
}

function getAgriInsight(dailyData) {
  if (!dailyData || dailyData.length === 0) return "Tarımsal şartlar mevsim normallerinde seyrediyor.";
  
  const minTemp = Math.min(...dailyData.map(d => d.minTemp));
  const totalRain = dailyData.reduce((acc, d) => acc + d.rain, 0);
  const maxWind = Math.max(...dailyData.map(d => d.windSpeed));

  if (minTemp <= 2) {
    return `❄️ Zirai Don Uyarısı: Gece sıcaklığı ${minTemp}°C seviyesine düşüyor. Hassas fidelerinizi ve tomurcukları koruma örtüsüyle örtün.`;
  }
  if (totalRain > 8) {
    return `🌧️ Yüksek Yağış İhtimali: Önümüzdeki 3 günde toplam ~${totalRain.toFixed(1)} mm yağış bekleniyor. Sulamaya gerek yok, tarlaya girmeyin.`;
  }
  if (maxWind > 20) {
    return `🌬️ Rüzgar İkazı: Rüzgar hızı ${maxWind} km/s seviyesine ulaşıyor. Zirai ilaçlama ve gübreleme yapmayın, ilaç uçuşması yaşanır.`;
  }
  return `✨ Zirai İşlem Fırsatı: Hava koşulları ve rüzgar hızı müsait. Yaprak gübrelemesi, çapa ve zirai mücadele için elverişli hava.`;
}

export default function WeatherCard() {
  const { selectedCity, setShowCityModal } = useAuth();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      const coords = CITY_COORDS[selectedCity] || CITY_COORDS["Konya"];
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`
        );
        const data = await res.json();
        if (data && data.daily) {
          const days = data.daily.time.slice(0, 3).map((timeStr, idx) => {
            const dateObj = new Date(timeStr);
            const dayName = idx === 0 ? 'Bugün' : idx === 1 ? 'Yarın' : dateObj.toLocaleDateString('tr-TR', { weekday: 'short' });
            return {
              dateLabel: dayName,
              dateStr: dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
              weatherCode: data.daily.weathercode[idx],
              maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
              minTemp: Math.round(data.daily.temperature_2m_min[idx]),
              rain: data.daily.precipitation_sum ? data.daily.precipitation_sum[idx] : 0,
              windSpeed: data.daily.wind_speed_10m_max ? Math.round(data.daily.wind_speed_10m_max[idx]) : 10
            };
          });
          setForecast(days);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (err) {
        console.warn('Weather fetch fallback:', err);
        setForecast([
          { dateLabel: 'Bugün', dateStr: 'Bugün', weatherCode: 1, maxTemp: 28, minTemp: 16, rain: 0, windSpeed: 12 },
          { dateLabel: 'Yarın', dateStr: 'Yarın', weatherCode: 0, maxTemp: 29, minTemp: 17, rain: 0, windSpeed: 10 },
          { dateLabel: 'Sonraki Gün', dateStr: '3. Gün', weatherCode: 2, maxTemp: 27, minTemp: 15, rain: 2, windSpeed: 14 }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [selectedCity]);

  const agriInsight = getAgriInsight(forecast);

  return (
    <div className="glass-card rounded-3xl p-6 border border-forest-800/10 shadow-lg space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-800/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-forest-800/10 flex items-center justify-center text-forest-800 shrink-0">
            <CloudSun className="w-5 h-5 text-harvest-500" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-forest-900 text-lg leading-tight flex items-center gap-1.5">
              <span>{selectedCity}</span> 3 Günlük Tarımsal Hava Raporu
            </h3>
            <p className="text-[11px] text-forest-800/70">Sıcaklık, Yağış Riskleri ve Zirai İşlem Şartları</p>
          </div>
        </div>

        {/* Interactive City Selector Modal Trigger (81 İl Seçimi) */}
        <button
          onClick={() => setShowCityModal(true)}
          className="flex items-center gap-2 bg-white hover:bg-forest-50 px-4 py-2 rounded-2xl border border-forest-800/20 text-xs font-bold text-forest-900 transition-all cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] shrink-0 group"
        >
          <MapPin className="w-4 h-4 text-terracotta-500 shrink-0 group-hover:bounce" />
          <span className="text-[11px] text-forest-800/70 font-sans">İl:</span>
          <span className="font-serif font-bold text-forest-900 text-sm">{selectedCity}</span>
          <ChevronDown className="w-3.5 h-3.5 text-forest-800/50 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* 3 Days Grid */}
      <div className="grid grid-cols-3 gap-3">
        {loading ? (
          [1, 2, 3].map(n => (
            <div key={n} className="bg-forest-50/50 p-4 rounded-2xl animate-pulse text-center space-y-2">
              <div className="h-4 bg-forest-800/10 rounded w-1/2 mx-auto" />
              <div className="w-8 h-8 bg-forest-800/10 rounded-full mx-auto" />
              <div className="h-6 bg-forest-800/10 rounded w-3/4 mx-auto" />
            </div>
          ))
        ) : (
          forecast && forecast.map((day, idx) => {
            const info = getWeatherInfo(day.weatherCode);
            return (
              <div
                key={idx}
                className={`p-3.5 md:p-4 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                  idx === 0
                    ? 'bg-forest-800 text-white border-forest-700 shadow-md'
                    : 'bg-white/80 border-forest-800/10 text-forest-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1 opacity-80">
                    <span>{day.dateLabel}</span>
                    <span className="text-[10px]">{day.dateStr}</span>
                  </div>

                  <div className="text-3xl my-2 select-none filter drop-shadow">
                    {info.icon}
                  </div>

                  <p className={`text-[11px] font-bold ${idx === 0 ? 'text-harvest-300' : 'text-forest-800'}`}>
                    {info.label}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-current/10">
                  <div className="text-sm font-bold flex items-center justify-center gap-1">
                    <span>{day.maxTemp}°</span>
                    <span className="opacity-50 text-xs">/ {day.minTemp}°C</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-[10px] opacity-80 mt-1">
                    {day.rain > 0 && (
                      <span className="flex items-center gap-0.5" title="Yağış miktarı">
                        <Droplets className="w-3 h-3 text-blue-400" />
                        {day.rain}mm
                      </span>
                    )}
                    <span className="flex items-center gap-0.5" title="Rüzgar hızı">
                      <Wind className="w-3 h-3 text-sky-400" />
                      {day.windSpeed}km/s
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Agriculture Insight Note */}
      {forecast && (
        <div className="bg-forest-50 p-3.5 rounded-2xl border border-forest-800/10 text-xs text-forest-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-harvest-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-forest-900 block mb-0.5">Zirai & Tarımsal Değerlendirme:</span>
            <p className="text-forest-800/90 leading-snug">{agriInsight}</p>
          </div>
        </div>
      )}
    </div>
  );
}
