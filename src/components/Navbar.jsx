"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Calendar, Sprout, BookOpen, MapPin, Moon } from 'lucide-react';

const CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
  "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
  "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir",
  "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

export default function Navbar() {
  const pathname = usePathname();
  const [selectedCity, setSelectedCity] = useState("Konya");

  useEffect(() => {
    const savedCity = localStorage.getItem('ata_takvimi_city');
    if (savedCity && CITIES.includes(savedCity)) {
      setSelectedCity(savedCity);
    }
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    localStorage.setItem('ata_takvimi_city', city);
  };

  const navItems = [
    { href: '/', label: 'Takvim Akışı', icon: Calendar },
    { href: '/takvim', label: 'Ay Takvimi', icon: Moon },
    { href: '/ekim-rehberi', label: 'Ekim Rehberi', icon: Sprout },
    { href: '/tarlam', label: 'Bitkilerim & Notlar', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-forest-800/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/icon-192.png" alt="Ata Takvimi" className="w-14 h-14 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="font-serif font-bold text-lg leading-tight text-forest-900 flex items-center gap-1">
              Ata Takvimi <span className="text-xs px-2 py-0.5 rounded-full badge-gold font-sans font-medium">Anadolu</span>
            </h1>
            <p className="text-xs text-forest-800/70 font-sans">Halk & Ay Takvimi Rehberi</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-forest-800/5 p-1 rounded-2xl border border-forest-800/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-md'
                    : 'text-forest-900/80 hover:bg-forest-800/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* City Selector */}
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-forest-800/15 text-xs text-forest-900 shadow-sm">
          <MapPin className="w-4 h-4 text-terracotta-500 shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="bg-transparent outline-none font-medium cursor-pointer"
          >
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex justify-around mt-3 pt-2 border-t border-forest-800/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs py-1 px-3 rounded-lg ${
                isActive ? 'text-forest-800 font-bold' : 'text-forest-900/60'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
