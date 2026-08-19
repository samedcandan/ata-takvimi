"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogIn, LogOut, User, Sparkles, Star, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import SubscriptionModal from './SubscriptionModal';
import NotificationModal from './NotificationModal';
import { APP_CONFIG } from '../lib/config';

export default function Navbar() {
  const pathname = usePathname();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { 
    user, 
    logout, 
    setShowAuthModal, 
    setShowSubModal, 
    setShowNotificationModal, 
    setShowCityModal,
    selectedCity,
    hasActiveSubscription, 
    isAdFree
  } = useAuth();

  const navItems = [
    { href: '/', label: 'Akış', iconImg: '/icons/nav-calendar.png', isPremium: false },
    { href: '/takvim', label: 'Ay Takvimi', iconImg: '/icons/event-winter-solstice.png', isPremium: false },
    { href: '/ekim-rehberi', label: 'Ekim Rehberi', iconImg: '/icons/nav-sprout.png', isPremium: true },
    { href: '/tarlam', label: 'Notlarım', iconImg: '/icons/nav-journal.png', isPremium: true },
  ];

  const handleNavClick = (e, item) => {
    if (item.isPremium && !isAdFree) {
      e.preventDefault();
      setShowSubModal(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-forest-800/10 px-3 sm:px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/icon-192.png" alt="Ata Takvimi" className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="font-serif font-bold text-base md:text-lg leading-tight text-forest-900 flex items-center gap-1">
              Ata Takvimi <span className="text-[10px] px-2 py-0.5 rounded-full badge-gold font-sans font-medium hidden sm:inline-block">Anadolu</span>
            </h1>
            <p className="text-[11px] text-forest-800/70 font-sans hidden sm:block">Halk & Ay Takvimi Rehberi</p>
          </div>
        </Link>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-1.5 bg-forest-800/5 p-1 rounded-2xl border border-forest-800/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isLocked = item.isPremium && !isAdFree;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all relative ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-md'
                    : isLocked
                    ? 'text-forest-900/50 hover:text-forest-900 hover:bg-forest-800/5'
                    : 'text-forest-900/80 hover:bg-forest-800/10'
                }`}
              >
                <img 
                  src={item.iconImg} 
                  alt={item.label} 
                  className={`w-5 h-5 object-contain transition-opacity ${isLocked ? 'opacity-60' : 'opacity-100'}`} 
                />
                <span>{item.label}</span>
                {isLocked && (
                  <span className="text-[9px] bg-amber-400 text-amber-950 font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shadow-xs">
                    👑 VIP
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Notification Bell, Subscription Badge, City Selector & User Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Notification Preferences Button */}
          <button
            onClick={() => setShowNotificationModal(true)}
            title="Bildirim Tercihleri"
            className="p-1 sm:p-1.5 rounded-xl bg-white border border-forest-800/15 text-forest-900 hover:bg-forest-50 transition-colors shadow-sm relative group shrink-0"
          >
            <img src="/icons/nav-bell.png" alt="Bildirim" className="w-5 h-5 object-contain group-hover:scale-110 transition-transform" />
            <span className="w-2 h-2 rounded-full bg-harvest-400 absolute top-1 right-1 animate-pulse" />
          </button>

          {/* Premium / Ad-Free Badge Button */}
          <button
            onClick={() => setShowSubModal(true)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 shrink-0 ${
              isAdFree
                ? 'bg-emerald-600 text-white'
                : 'badge-gold text-forest-900 border border-harvest-400'
            }`}
          >
            {isAdFree ? (
              <>
                <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span className="hidden sm:inline-block">👑 Reklamsız VIP</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
                <span className="hidden sm:inline-block">👑 Abone Ol</span>
              </>
            )}
          </button>

          {/* City Selection Modal Trigger Button */}
          <button
            onClick={() => setShowCityModal(true)}
            className="flex items-center gap-1 bg-white px-2.5 sm:px-3 py-1.5 rounded-xl border border-forest-800/15 text-forest-900 text-xs font-semibold hover:bg-forest-50 transition-colors shadow-sm shrink-0"
            title="Şehir ve Konum Seçimi"
          >
            <img src="/icons/nav-location.png" alt="Konum" className="w-4 h-4 object-contain" />
            <span className="max-w-[70px] sm:max-w-[90px] truncate">{selectedCity || 'Konum Seç'}</span>
          </button>

          {/* User Profile / Auth Toggle (Desktop) */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 bg-white p-1 pr-2 rounded-xl border border-forest-800/15 hover:bg-forest-50 transition-colors shadow-sm"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-lg object-cover border border-forest-800/20" 
                />
                <span className="text-xs font-bold text-forest-900 max-w-[80px] truncate hidden sm:inline-block">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-forest-800/15 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-forest-800/10">
                    <p className="text-xs font-bold text-forest-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-forest-800/70 truncate">{user.email}</p>
                    {isAdFree && (
                      <span className="inline-block mt-1 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        👑 Reklamsız Premium
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href="/tarlam"
                    onClick={(e) => {
                      setShowUserDropdown(false);
                      handleNavClick(e, { isPremium: true });
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-forest-900 rounded-xl hover:bg-forest-50 transition-colors"
                  >
                    <img src="/icons/nav-journal.png" alt="Notlarım" className="w-4 h-4 object-contain" />
                    Tarla Notlarım {!isAdFree && '👑'}
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-forest-800 hover:bg-forest-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-transform hover:scale-105 shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Giriş</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden flex justify-between items-center mt-2 pt-2 border-t border-forest-800/10 px-1 text-xs">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isLocked = item.isPremium && !isAdFree;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all relative ${
                isActive 
                  ? 'text-forest-900 font-extrabold scale-105' 
                  : isLocked
                  ? 'text-forest-900/40 hover:text-forest-900'
                  : 'text-forest-900/70 hover:text-forest-900'
              }`}
            >
              <div className="relative">
                <img 
                  src={item.iconImg} 
                  alt={item.label} 
                  className={`w-5 h-5 object-contain ${isLocked ? 'opacity-50' : 'opacity-100'}`} 
                />
                {isLocked && (
                  <span className="absolute -top-1 -right-2 text-[8px] bg-amber-400 text-amber-950 font-bold px-1 rounded-full">
                    👑
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}

        {/* Dedicated Mobile Profile Button */}
        {user ? (
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all ${
              showUserDropdown 
                ? 'text-harvest-600 font-extrabold scale-105' 
                : 'text-forest-900/60 hover:text-forest-900'
            }`}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-5 h-5 rounded-full object-cover border border-forest-800/30" 
            />
            <span className="text-[10px] font-bold">Profil</span>
          </button>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-forest-900/60 hover:text-forest-900 transition-colors"
          >
            <User className="w-4 h-4 text-harvest-600" />
            <span className="text-[10px] font-bold">Profil</span>
          </button>
        )}
      </div>

      {/* Modals */}
      <AuthModal />
      <SubscriptionModal />
      <NotificationModal />
    </header>
  );
}
