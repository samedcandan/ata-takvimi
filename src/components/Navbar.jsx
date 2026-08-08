"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Sprout, BookOpen, MapPin, Moon, LogIn, LogOut, User, Sparkles, Star, Clock, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import SubscriptionModal from './SubscriptionModal';
import NotificationModal from './NotificationModal';

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
    isTrialActive, 
    daysLeft 
  } = useAuth();

  const navItems = [
    { href: '/', label: 'Akış', icon: Calendar },
    { href: '/takvim', label: 'Ay Takvimi', icon: Moon },
    { href: '/ekim-rehberi', label: 'Ekim Rehberi', icon: Sprout },
    { href: '/tarlam', label: 'Notlarım', icon: BookOpen },
  ];

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

        {/* Right Controls: Notification Bell, Subscription Badge, City Selector & User Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Notification Preferences Button */}
          <button
            onClick={() => setShowNotificationModal(true)}
            title="Bildirim Tercihleri"
            className="p-1.5 sm:p-2 rounded-xl bg-white border border-forest-800/15 text-forest-900 hover:bg-forest-50 transition-colors shadow-sm relative group shrink-0"
          >
            <Bell className="w-4 h-4 text-harvest-600 group-hover:scale-110 transition-transform" />
            <span className="w-2 h-2 rounded-full bg-harvest-400 absolute top-1 right-1 animate-pulse" />
          </button>

          {/* Subscription Button Badge */}
          <button
            onClick={() => setShowSubModal(true)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 shrink-0 ${
              hasActiveSubscription
                ? 'bg-emerald-600 text-white'
                : isTrialActive
                ? 'bg-amber-500 text-white border border-amber-400'
                : 'badge-gold text-forest-900 border border-harvest-400'
            }`}
          >
            {hasActiveSubscription ? (
              <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
            ) : (
              <Clock className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline-block">
              {hasActiveSubscription
                ? '👑 VIP Abone'
                : isTrialActive
                ? `⏳ ${daysLeft} Gün Deneme`
                : 'Abone Ol'}
            </span>
          </button>

          {/* City Selector Button */}
          <button
            onClick={() => setShowCityModal(true)}
            title="Şehir Değiştir (81 İl)"
            className="flex items-center gap-1 bg-white/90 hover:bg-forest-50 px-2.5 py-1.5 rounded-xl border border-forest-800/15 text-xs text-forest-900 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
            <span className="font-bold text-xs">{selectedCity}</span>
          </button>

          {/* User Auth Profile Dropdown / Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1 pr-2 rounded-2xl bg-white border border-forest-800/20 shadow-sm hover:shadow transition-all group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover bg-forest-100 border border-forest-500/20"
                />
                <span className="text-xs font-bold text-forest-900 max-w-[80px] truncate hidden sm:inline-block">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-forest-800/15 shadow-2xl p-3 z-50 text-xs space-y-2">
                  <div className="border-b border-forest-800/10 pb-2 flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl bg-forest-50" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-forest-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-forest-800/60 truncate">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${hasActiveSubscription ? 'bg-emerald-100 text-emerald-800' : isTrialActive ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                          {hasActiveSubscription ? '👑 VIP Yıllık Abone' : isTrialActive ? `⏳ ${daysLeft} Gün Deneme` : '⚠️ Süresi Doldu'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowNotificationModal(true);
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-forest-900 font-bold hover:bg-forest-50 transition-colors text-left"
                  >
                    <Bell className="w-4 h-4 text-harvest-600" />
                    Bildirim Tercihleri
                  </button>

                  <button
                    onClick={() => {
                      setShowSubModal(true);
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-forest-900 font-bold hover:bg-forest-50 transition-colors text-left"
                  >
                    <Sparkles className="w-4 h-4 text-harvest-500" />
                    Aboneliğimi Yönet (₺300/Yıl)
                  </button>

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
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-colors text-left border-t border-forest-800/10 pt-2"
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
              className="badge-forest px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md hover:scale-[1.02] transition-transform shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 text-harvest-400" />
              <span>Giriş Yap</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Bar — Includes Dedicated Profile Tab */}
      <div className="md:hidden flex justify-between items-center mt-2 pt-2 border-t border-forest-800/10 px-1 text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all ${
                isActive 
                  ? 'text-forest-900 font-extrabold scale-105' 
                  : 'text-forest-900/60 hover:text-forest-900'
              }`}
            >
              <Icon className="w-4 h-4" />
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
              className="w-4 h-4 rounded-full object-cover border border-forest-800/30" 
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
