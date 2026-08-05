"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Sun, Calendar, BookOpen, Sprout, LogIn, Award, Star, Lock } from 'lucide-react';
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
      registerWithEmail(quickName.trim(), quickEmail.trim(), '123456');
    } catch (err) {
      setError(err.message || 'Kayıt yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#071a10] text-white flex flex-col justify-between overflow-y-auto font-sans">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-harvest-400/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-5 flex items-center justify-between z-20 shrink-0 border-b border-emerald-500/15 bg-[#071a10]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-harvest-400 to-forest-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0b2416] rounded-[10px] flex items-center justify-center font-bold text-harvest-400 text-lg">
              🌱
            </div>
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Ata Takvimi <span className="text-[10px] bg-harvest-400 text-forest-950 font-sans font-extrabold px-2 py-0.5 rounded-full">Anadolu</span>
            </h1>
            <p className="text-[11px] text-emerald-300 font-sans">Anadolu Halk Takvimi & Ay Evreleri Tarım Rehberi</p>
          </div>
        </div>

        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-harvest-400 text-forest-950 hover:bg-harvest-300 font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105"
        >
          <LogIn className="w-4 h-4 text-forest-950" />
          <span>Abone Girişi</span>
        </button>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Title & Value Props */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold shadow-inner">
              <Sparkles className="w-4 h-4 text-harvest-400" />
              <span>Çiftçiler & Doğa Severler İçin Anadolu Rehberi</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-[1.15] tracking-tight">
              Toprağın Kadim Takvimi <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-harvest-300 via-harvest-400 to-emerald-300">
                Ata Takvimi Aboneliği
              </span>
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl font-medium">
              Cemrelerden fırtınalara, Jean Meeus Ay evrelerinden 81 il canlı zirai don uyarısına kadar tüm tarımsal bilgiler tek bir platformda.
            </p>

            {/* Feature Cards Grid (High Contrast Translucent Dark Green) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e2c1c] border border-emerald-500/30 shadow-lg">
                <GlassIcon type="calendar" size={36} />
                <div>
                  <h4 className="text-xs font-bold text-white">365 Gün Halk Takvimi</h4>
                  <p className="text-[11px] text-emerald-200/80">Kocakarı takvimi & fırtına günleri</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e2c1c] border border-emerald-500/30 shadow-lg">
                <GlassIcon type="moon" size={36} />
                <div>
                  <h4 className="text-xs font-bold text-white">Astronomik Ay Evreleri</h4>
                  <p className="text-[11px] text-emerald-200/80">%100 hassas ekim & dikim motoru</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e2c1c] border border-emerald-500/30 shadow-lg">
                <GlassIcon type="weather" size={36} />
                <div>
                  <h4 className="text-xs font-bold text-white">81 İl Zirai Hava Raporu</h4>
                  <p className="text-[11px] text-emerald-200/80">Don & yağış uyarısı</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e2c1c] border border-emerald-500/30 shadow-lg">
                <GlassIcon type="sprout" size={36} />
                <div>
                  <h4 className="text-xs font-bold text-white">45 Ürün Vektör Rehberi</h4>
                  <p className="text-[11px] text-emerald-200/80">Bitki ajandası & notlar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2-Day Trial & Yearly ₺300 Subscription Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0e2d1d] border-2 border-harvest-400/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Top Discount Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                <div>
                  <span className="text-xs font-extrabold text-harvest-400 uppercase tracking-wider block">Özel Çiftçi Paketi</span>
                  <h3 className="text-xl font-bold font-serif text-white">Yıllık Ata Çiftçisi</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-serif font-black text-harvest-300">
                    ₺300 <span className="text-xs font-sans font-normal text-emerald-200">/ yıl</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    Sadece ₺25 / ay
                  </span>
                </div>
              </div>

              {/* 2-Day Free Trial Quick Form */}
              <div className="bg-[#07190f] p-4 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-harvest-300">
                  <Star className="w-4 h-4 text-harvest-400 fill-current" />
                  <span>2 Gün Ücretsiz Tam Erişim Denemesi</span>
                </div>
                <p className="text-[11px] text-emerald-200/90 leading-normal">
                  Kredi kartı gerekmez. Adınızı ve e-postanızı girerek 2 gün boyunca tüm takvimi ücretsiz kullanın:
                </p>

                {error && (
                  <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-2.5 rounded-xl font-bold">
                    {error}
                  </div>
                )}

                <form onSubmit={handleStartTrial} className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-300 mb-1">Adınız Soyadınız</label>
                    <input
                      type="text"
                      placeholder="Örn: Ahmet Yılmaz"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-300/40 outline-none focus:border-harvest-400 focus:ring-1 focus:ring-harvest-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-300 mb-1">E-posta Adresiniz</label>
                    <input
                      type="email"
                      placeholder="Örn: ahmet@gmail.com"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-emerald-300/40 outline-none focus:border-harvest-400 focus:ring-1 focus:ring-harvest-400 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-harvest-400 hover:bg-harvest-300 text-forest-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>2 Gün Ücretsiz Denemeyi Başlat</span>
                    <ArrowRight className="w-4 h-4 text-forest-950" />
                  </button>
                </form>
              </div>

              {/* Direct Purchase Button */}
              <div className="pt-1 text-center space-y-2">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full py-3 rounded-xl bg-emerald-700/50 hover:bg-emerald-600/60 border border-emerald-400/40 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-harvest-400" />
                  <span>Zaten Aboneyim / Giriş Yap</span>
                </button>
                
                <p className="text-[10px] text-emerald-300/80 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL & İyzico Güvenli Ödeme Altyapısı</span>
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 text-center text-xs text-emerald-400/80 border-t border-emerald-500/15 z-10 shrink-0 bg-[#071a10]">
        <p>© 2026 Ata Takvimi — Bir Karneyn Yazılım Hizmetleri Ltd. Şti. Ürünüdür.</p>
      </footer>
    </div>
  );
}
