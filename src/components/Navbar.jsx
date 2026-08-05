"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Calendar, Sprout, BookOpen, MapPin, Moon, LogIn, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

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
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout, setShowAuthModal } = useAuth();

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
    <header className="sticky top-0 z-40 glass-card border-b border-forest-800/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/icon-192.png" alt="Ata Takvimi" className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="font-serif font-bold text-base md:text-lg leading-tight text-forest-900 flex items-center gap-1">
              Ata Takvimi <span className="text-[10px] px-2 py-0.5 rounded-full badge-gold font-sans font-medium hidden sm:inline-block">Anadolu</span>
            </h1>
            <p className="text-[11px] text-forest-800/70 font-sans hidden sm:block">Halk & Ay Takvimi Rehberi</p>
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

        {/* Right Controls: City Selector & User Auth */}
        <div className="flex items-center gap-2">
          {/* City Selector */}
          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-forest-800/15 text-xs text-forest-900 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-transparent outline-none font-medium cursor-pointer max-w-[90px] sm:max-w-none"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* User Auth Profile Dropdown / Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1 pr-2 rounded-2xl bg-white border border-forest-800/20 shadow-sm hover:shadow transition-all group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-xl object-cover bg-forest-100 border border-forest-500/20"
                />
                <span className="text-xs font-bold text-forest-900 max-w-[100px] truncate hidden sm:inline-block">
                  {user.name}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-forest-800/15 shadow-xl p-3 z-50 text-xs space-y-2">
                  <div className="border-b border-forest-800/10 pb-2 flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl bg-forest-50" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-forest-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-forest-800/60 truncate">{user.email}</p>
                      {user.provider === 'google' && (
                        <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold inline-block mt-0.5">
                          Google Hesabı
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/tarlam"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 p-2 rounded-xl text-forest-900 font-medium hover:bg-forest-50 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-harvest-500" />
                    Bitkilerim & Notlarım
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="badge-forest px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-[1.02] transition-transform shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 text-harvest-400" />
              <span>Giriş Yap</span>
            </button>
          )}
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

      {/* Auth Modal Component */}
      <AuthModal />
    </header>
  );
}
