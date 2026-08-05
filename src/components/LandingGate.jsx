"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ShieldCheck, ArrowRight, LogIn, Award, Star, Lock, User, Mail } from 'lucide-react';
import AuthModal from './AuthModal';
import SubscriptionModal from './SubscriptionModal';

export default function LandingGate() {
  const { setShowAuthModal, setShowSubModal, registerWithEmail, loginWithGoogle } = useAuth();
  const [quickEmail, setQuickEmail] = useState('');
  const [quickName, setQuickName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartTrial = (e) => {
    e.preventDefault();
    setError('');
    if (!quickName.trim() || !quickEmail.trim()) {
      setError('Lütfen adınızı ve e-posta adresinizi giriniz.');
      return;
    }

    try {
      setLoading(true);
      registerWithEmail(quickName.trim(), quickEmail.trim(), '123456');
    } catch (err) {
      setError(err.message || 'Kayıt yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#071a10] text-white flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Centered Direct Login & Subscription Card */}
      <div className="max-w-md w-full bg-[#0e2d1d] border-2 border-harvest-400/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 relative z-10 my-auto">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 border-b border-emerald-500/20 pb-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-harvest-400 to-forest-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0b2416] rounded-[14px] flex items-center justify-center font-bold text-harvest-400 text-2xl">
              🌱
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            Ata Takvimi <span className="text-[10px] bg-harvest-400 text-forest-950 font-sans font-extrabold px-2 py-0.5 rounded-full">Anadolu</span>
          </h1>
          <p className="text-xs text-emerald-300 font-sans">Anadolu Halk Takvimi & Ay Evreleri Tarım Rehberi</p>
        </div>

        {/* Pricing Badge */}
        <div className="bg-[#07190f] p-3 rounded-2xl border border-emerald-500/30 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold text-harvest-400 uppercase tracking-wider block">Abonelik Paketi</span>
            <span className="font-bold text-white">Yıllık Ata Çiftçisi</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-serif font-black text-harvest-300">₺300 <span className="text-[10px] font-sans font-normal text-emerald-200">/ yıl</span></span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-bold block">Ayda ₺25</span>
          </div>
        </div>

        {/* 2-Day Trial Quick Form */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-harvest-300 justify-center">
            <Star className="w-4 h-4 text-harvest-400 fill-current" />
            <span>2 Gün Ücretsiz Tam Erişim Denemesi</span>
          </div>

          {error && (
            <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-2.5 rounded-xl font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleStartTrial} className="space-y-2.5">
            <div>
              <input
                type="text"
                placeholder="Adınız Soyadınız"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-300/40 outline-none focus:border-harvest-400 font-medium text-center"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="E-posta Adresiniz"
                value={quickEmail}
                onChange={(e) => setQuickEmail(e.target.value)}
                className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-300/40 outline-none focus:border-harvest-400 font-medium text-center"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-harvest-400 hover:bg-harvest-300 text-forest-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span>2 Gün Ücretsiz Denemeyi Başlat</span>
              <ArrowRight className="w-4 h-4 text-forest-950" />
            </button>
          </form>
        </div>

        {/* Alternative Buttons */}
        <div className="pt-2 border-t border-emerald-500/20 space-y-2 text-center">
          <button
            onClick={() => setShowSubModal(true)}
            className="w-full py-3 rounded-xl bg-emerald-700/50 hover:bg-emerald-600/60 border border-emerald-400/40 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-harvest-400" />
            <span>Doğrudan Yıllık ₺300 İle Abone Ol</span>
          </button>

          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 text-harvest-400" />
            <span>Zaten Aboneyim / Giriş Yap</span>
          </button>
        </div>

        <p className="text-[10px] text-emerald-300/80 flex items-center justify-center gap-1 pt-1 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL & İyzico Güvenli Ödeme Altyapısı</span>
        </p>
      </div>

      {/* Auth & Subscription Modals */}
      <AuthModal />
      <SubscriptionModal />
    </div>
  );
}
