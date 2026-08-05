"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Sprout, BookOpen, MapPin, Moon, Sun } from 'lucide-react';

const CITIES = [
  "Adana", "Ankara", "Antalya", "Bursa", "Diyarbakır", "Erzurum", 
  "Gaziantep", "İstanbul", "İzmir", "Kayseri", "Konya", "Manisa", 
  "Mersin", "Samsun", "Şanlıurfa", "Trabzon"
];

export default function Navbar() {
  const pathname = usePathname();
  const [selectedCity, setSelectedCity] = useState("Konya");

  const navItems = [
    { href: '/', label: 'Bugün', icon: Calendar },
    { href: '/takvim', label: 'Aylık Takvim', icon: Moon },
    { href: '/ekim-rehberi', label: 'Ekim Rehberi', icon: Sprout },
    { href: '/tarlam', label: 'Tarlam & Notlar', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-forest-800/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-800 to-forest-500 flex items-center justify-center text-harvest-400 shadow-md group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
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
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-forest-800/15 text-xs text-forest-900">
          <MapPin className="w-4 h-4 text-terracotta-500 shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
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
