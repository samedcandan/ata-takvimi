"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Sun, Calendar, BookOpen, Sprout, LogIn, Award, Star } from 'lucide-react';
import GlassIcon from './GlassIcon';

export default function LandingGate() {
  const { setShowAuthModal, setShowSubModal, registerWithEmail, user } = useAuth();
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
      // Register user with 2-day trial
      registerWithEmail(quickName.trim(), quickEmail.trim(), '123456');
    } catch (err) {
      setError(err.message || 'Kayıt yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Dynamic Background Glow & Ambient Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-harvest-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-harvest-400 to-forest-600 p-0.5 shadow-xl shadow-harvest-400/10">
            <div className="w-full h-full bg-forest-900 rounded-[14px] flex items-center justify-center font-bold text-harvest-400">
              🌱
            </div>
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Ata Takvimi <span className="text-[10px] bg-harvest-400 text-forest-950 font-sans font-bold px-2 py-0.5 rounded-full">Anadolu</span>
            </h1>
            <p className="text-[11px] text-forest-300 font-sans">Anadolu Halk Takvimi & Ay Evreleri Tarım Rehberi</p>
          </div>
        </div>

        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:scale-105"
        >
          <LogIn className="w-4 h-4 text-harvest-400" />
          <span>Abone Girişi</span>
        </button>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Title & Value Props */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-harvest-400/20 border border-harvest-400/30 text-harvest-300 text-xs font-bold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-harvest-400" />
              <span>Çiftçiler & Doğa Severler İçin Anadolu Rehberi</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.15] tracking-tight">
              Toprağın Kadim Takvimi <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-harvest-300 via-harvest-400 to-emerald-300">
                Ata Takvimi Aboneliği
              </span>
            </h2>

            <p className="text-sm sm:text-base text-forest-200 leading-relaxed max-w-xl">
              Cemrelerden fırtınalara, Jean Meeus Ay evrelerinden 81 il canlı zirai don uyarısına kadar tüm tarımsal bilgiler tek bir platformda.
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <GlassIcon type="calendar" size={32} />
                <div>
                  <h4 className="text-xs font-bold text-white">365 Gün Halk Takvimi</h4>
                  <p className="text-[11px] text-forest-300">Kocakarı takvimi & fırtına günleri</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <GlassIcon type="moon" size={32} />
                <div>
                  <h4 className="text-xs font-bold text-white">Astronomik Ay Evreleri</h4>
                  <p className="text-[11px] text-forest-300">%100 hassas ekim & dikim motoru</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <GlassIcon type="weather" size={32} />
                <div>
                  <h4 className="text-xs font-bold text-white">81 İl Zirai Hava Raporu</h4>
                  <p className="text-[11px] text-forest-300">Don & yağış uyarısı uyarısı</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <GlassIcon type="sprout" size={32} />
                <div>
                  <h4 className="text-xs font-bold text-white">45 Ürün Vektör Rehberi</h4>
                  <p className="text-[11px] text-forest-300">Bitki ajandası & kişisel notlar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2-Day Trial & Yearly ₺300 Subscription Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-gradient-to-b from-white/15 to-white/5 border border-white/20 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Top Discount Tag */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-harvest-400 uppercase tracking-wider block">Özel Çiftçi Paketi</span>
                  <h3 className="text-xl font-bold font-serif text-white">Yıllık Ata Çiftçisi</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-serif font-black text-harvest-300">
                    ₺300 <span className="text-xs font-sans font-normal text-white/70">/ yıl</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    Sadece ₺25 / ay
                  </span>
                </div>
              </div>

              {/* 2-Day Free Trial Quick Form */}
              <div className="bg-forest-900/60 p-4 rounded-2xl border border-harvest-400/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-harvest-300">
                  <Star className="w-4 h-4 text-harvest-400 fill-current" />
                  <span>2 Gün Ücretsiz Tam Erişim Denemesi</span>
                </div>
                <p className="text-[11px] text-forest-200">
                  Kredi kartı gerekmez. Adınızı ve e-postanızı girerek 2 gün boyunca tüm takvimi ücretsiz kullanın:
                </p>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-xs p-2.5 rounded-xl font-bold">
                    {error}
                  </div>
                )}

                <form onSubmit={handleStartTrial} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/50 outline-none focus:border-harvest-400 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="E-posta Adresiniz"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/50 outline-none focus:border-harvest-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-harvest-400 to-emerald-500 hover:from-harvest-300 hover:to-emerald-400 text-forest-950 font-bold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <span>2 Gün Ücretsiz Denemeyi Başlat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Direct Purchase Button */}
              <div className="pt-2 text-center space-y-2">
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
                >
                  <Award className="w-4 h-4 text-harvest-400 group-hover:rotate-12 transition-transform" />
                  <span>Doğrudan ₺300 / Yıl İle Abone Ol</span>
                </button>
                
                <p className="text-[11px] text-forest-300 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL & İyzico Güvenli Ödeme Altyapısı</span>
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 text-center text-xs text-forest-400 border-t border-white/10 z-10">
        <p>© 2026 Ata Takvimi — Bir Karneyn Yazılım Hizmetleri Ltd. Şti. Ürünüdür.</p>
      </footer>
    </div>
  );
}
