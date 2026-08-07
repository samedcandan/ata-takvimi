"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Search, Check, X, Compass } from 'lucide-react';
import { CITY_COORDS } from './WeatherCard';

export default function CitySelectorModal() {
  const { showCityModal, setShowCityModal, selectedCity, changeCity } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!showCityModal || !mounted) return null;

  const allCities = Object.keys(CITY_COORDS).sort();
  const filteredCities = allCities.filter(c => 
    c.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))
  );

  const handleSelect = (cityName) => {
    changeCity(cityName);
    setShowCityModal(false);
    setSearchTerm('');
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 md:p-7 max-w-2xl w-full border border-forest-800/20 shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-forest-800/10 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-forest-800/10 flex items-center justify-center text-forest-800 shrink-0">
              <MapPin className="w-6 h-6 text-terracotta-500" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-harvest-600">Konum Tercihi</span>
              <h3 className="text-xl font-serif font-bold text-forest-900 leading-tight">
                81 İl Şehir Seçimi
              </h3>
              <p className="text-xs text-forest-800/70">
                Mevcut Şehir: <span className="font-bold text-forest-900 bg-harvest-400/20 px-2 py-0.5 rounded-lg border border-harvest-500/30">{selectedCity}</span> (Kalıcı olarak kaydedilir)
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCityModal(false)}
            className="p-2 text-forest-800/50 hover:text-forest-900 font-bold rounded-2xl hover:bg-forest-800/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="pt-4 pb-2 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-forest-800/40 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="İl adı ara... (Örn: Konya, Samsun, Adana)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-forest-50 border border-forest-800/15 rounded-2xl pl-10 pr-4 py-3 text-xs outline-none focus:border-harvest-500 font-bold text-forest-900 placeholder:font-normal placeholder:text-forest-800/40"
              autoFocus
            />
          </div>
        </div>

        {/* Cities Grid */}
        <div className="overflow-y-auto py-2 flex-1 pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isCurrent = city === selectedCity;
              return (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className={`p-3 rounded-2xl text-xs font-bold text-left transition-all flex items-center justify-between border ${
                    isCurrent
                      ? 'bg-forest-800 text-white border-forest-900 shadow-md ring-2 ring-forest-500/50'
                      : 'bg-white text-forest-900 border-forest-800/10 hover:border-harvest-500 hover:bg-forest-50/80 shadow-sm'
                  }`}
                >
                  <span className="truncate">{city}</span>
                  {isCurrent ? (
                    <Check className="w-4 h-4 text-harvest-400 shrink-0" />
                  ) : (
                    <Compass className="w-3.5 h-3.5 text-forest-800/30 shrink-0" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-forest-800/60 text-xs font-medium">
              "{searchTerm}" için sonuç bulunamadı.
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-forest-800/10 text-[11px] text-forest-800/70 text-center shrink-0">
          💡 Seçtiğiniz il cihazınıza kaydedilir. Bir kez seçtiğinizde sayfa yenilense de değişmez.
        </div>

      </div>
    </div>,
    document.body
  );
}
