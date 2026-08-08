"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';

export default function LandingGate() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleEmailInput) {
      setError('Lütfen Google Gmail adresinizi girin.');
      return;
    }
    setError('');
    await loginWithGoogle({
      email: googleEmailInput,
      name: googleEmailInput.split('@')[0],
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(googleEmailInput)}`
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (activeTab === 'login') {
        loginWithEmail(formData.email, formData.password);
      } else {
        registerWithEmail(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'Giriş işlemi sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#071a10] text-white flex flex-col items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Login / Register Card */}
      <div className="max-w-md w-full bg-[#0e2d1d] border-2 border-harvest-400/40 p-4 sm:p-5 rounded-3xl shadow-2xl space-y-3 relative z-10 my-auto max-h-[96vh] overflow-y-auto">
        
        {/* Brand Header — Larger Icon, No Outer Container Square */}
        <div className="text-center space-y-1 border-b border-emerald-500/20 pb-2.5">
          <img 
            src="/icon-192.png" 
            alt="Ata Takvimi" 
            className="w-20 h-20 sm:w-22 sm:h-22 mx-auto drop-shadow-2xl object-contain hover:scale-105 transition-transform"
          />
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2 pt-0.5">
            Ata Takvimi <span className="text-[10px] bg-harvest-400 text-forest-950 font-sans font-extrabold px-2 py-0.5 rounded-full">Anadolu</span>
          </h1>
          <p className="text-[11px] text-emerald-300 font-sans">Abone Giriş ve Kullanıcı Portalı</p>
        </div>

        {error && (
          <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-2.5 rounded-xl font-bold text-center">
            {error}
          </div>
        )}

        {/* Google Play Store Banner */}
        <a
          href="https://play.google.com/store/apps/details?id=com.karneyn.atatakvimi"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] shadow-md group"
        >
          <svg width="22" height="22" viewBox="0 0 512 512" fill="none" className="shrink-0">
            <path d="M99.6 15.6C91.6 20 86.8 28.6 86.8 38.6V473.4C86.8 483.4 91.6 492 99.6 496.4L278.4 256L99.6 15.6Z" fill="#00D2FF"/>
            <path d="M344.8 189.6L278.4 256L344.8 322.4L402.4 289.6C418 280.8 418 231.2 402.4 222.4L344.8 189.6Z" fill="#FFD000"/>
            <path d="M278.4 256L99.6 496.4C106.8 500.4 116 500 124.8 494.8L344.8 322.4L278.4 256Z" fill="#FF3A44"/>
            <path d="M124.8 17.2C116 12 106.8 11.6 99.6 15.6L278.4 256L344.8 189.6L124.8 17.2Z" fill="#00E676"/>
          </svg>
          <div className="text-left leading-tight">
            <div className="text-[9px] text-emerald-300 uppercase tracking-wider font-semibold">MOBİL UYGULAMAYI HEMEN İNDİRİN</div>
            <div className="text-[11px] font-extrabold text-white group-hover:text-harvest-300 transition-colors">Google Play Store</div>
          </div>
        </a>

        {/* Quick Google Login */}
        {!showGooglePrompt ? (
          <button
            onClick={() => setShowGooglePrompt(true)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white text-gray-900 font-extrabold text-xs flex items-center justify-center gap-2.5 shadow-md hover:bg-gray-100 transition-all hover:scale-[1.01]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google ile Hızlı Giriş Yap / Üye Ol</span>
          </button>
        ) : (
          <form onSubmit={handleGoogleSubmit} className="bg-[#07190f] p-3 rounded-xl border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
              <span>Google E-postanızı Girin</span>
              <button type="button" onClick={() => setShowGooglePrompt(false)} className="text-harvest-400 underline text-[11px]">
                Geri
              </button>
            </div>
            <input
              type="email"
              required
              placeholder="ornek@gmail.com"
              value={googleEmailInput}
              onChange={e => setGoogleEmailInput(e.target.value)}
              className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl p-2 text-xs text-white outline-none focus:border-harvest-400 font-medium"
            />
            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Google Hesabı ile Onayla
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center my-0.5">
          <div className="border-t border-emerald-500/20 w-full" />
          <span className="bg-[#0e2d1d] px-2.5 text-[9px] text-emerald-300/70 font-bold uppercase shrink-0">veya e-posta ile</span>
          <div className="border-t border-emerald-500/20 w-full" />
        </div>

        {/* Login / Register Tab Switcher */}
        <div className="flex bg-[#07190f] p-1 rounded-xl border border-emerald-500/30 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-harvest-400 text-forest-950 shadow'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`w-1/2 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'register'
                ? 'bg-harvest-400 text-forest-950 shadow'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Yeni Üyelik (2 Gün Ücretsiz)
          </button>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-2 text-xs">
          {activeTab === 'register' && (
            <div>
              <label className="block text-[10px] font-bold text-emerald-300 mb-0.5">Adınız Soyadınız</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-emerald-400/60 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl pl-8 p-2 text-white outline-none focus:border-harvest-400 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-emerald-300 mb-0.5">E-posta Adresi</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-emerald-400/60 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="ahmet@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl pl-8 p-2 text-white outline-none focus:border-harvest-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-emerald-300 mb-0.5">Şifreniz</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-emerald-400/60 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl pl-8 p-2 text-white outline-none focus:border-harvest-400 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-harvest-400 hover:bg-harvest-300 text-forest-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-1"
          >
            {activeTab === 'login' ? (
              <>
                <LogIn className="w-4 h-4 text-forest-950" />
                <span>Hesabıma Giriş Yap</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-forest-950" />
                <span>2 Gün Ücretsiz Deneme İle Kaydol</span>
              </>
            )}
          </button>
        </form>

        {/* Ödeme Güvenlik Bandı & Logoları */}
        <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-center gap-2.5 flex-wrap text-xs text-emerald-200/90">
          <div className="flex items-center gap-1 font-semibold text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>iyzico ile Güvenli Ödeme</span>
          </div>
          <div className="w-px h-3.5 bg-emerald-500/30" />
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 780 500" width="26" height="17" className="opacity-90"><title>Visa</title><rect width="780" height="500" rx="40" fill="#1a1f71"/><path d="M293.2 348.7l33.4-195.2h53.4l-33.4 195.2H293.2z" fill="#fff"/><path d="M532.7 157.9c-10.6-4-27.2-8.3-47.9-8.3-52.8 0-90 26.5-90.2 64.5-.3 28.1 26.5 43.7 46.8 53.1 20.8 9.6 27.8 15.7 27.7 24.3-.1 13.1-16.6 19.1-32 19.1-21.4 0-32.7-3-50.3-10.2l-6.9-3.1-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5 56.2 0 92.6-26.2 93-66.8.2-22.3-14-39.2-44.8-53.2-18.7-9.1-30.1-15.1-30-24.3 0-8.1 9.7-16.8 30.6-16.8 17.5-.3 30.1 3.5 40 7.5l4.8 2.2 7.3-42.3z" fill="#fff"/><path d="M616.4 153.5h-41.3c-12.8 0-22.4 3.5-28 16.2l-79.3 179h56.1s9.2-24 11.2-29.3h68.5c1.6 6.9 6.5 29.3 6.5 29.3h49.6l-43.3-195.2zm-65.8 126c4.4-11.3 21.5-54.7 21.5-54.7-.3.5 4.4-11.4 7.1-18.8l3.6 17s10.3 47.2 12.5 56.5h-44.7z" fill="#fff"/><path d="M247.5 153.5l-52.3 133-5.6-27.1c-9.7-31.2-39.9-65-73.7-81.9l47.8 170.6h56.5l84.1-195.2h-56.8v.6z" fill="#fff"/></svg>
            <svg viewBox="0 0 780 500" width="26" height="17" className="opacity-90"><title>MasterCard</title><rect width="780" height="500" rx="40" fill="#16366f"/><circle cx="330" cy="250" r="150" fill="#d9222a"/><circle cx="450" cy="250" r="150" fill="#ee9f2d"/><path d="M390 130.7c-31.1 24.2-51.1 62-51.1 104.3s20 80.1 51.1 104.3c31.1-24.2 51.1-62 51.1-104.3s-20-80.1-51.1-104.3z" fill="#eb6f20"/></svg>
          </div>
        </div>

        {/* Yasal Linkler */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-300/80 flex-wrap font-medium">
          <a href="/gizlilik#hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a>
          <span className="text-emerald-500/30">•</span>
          <a href="/gizlilik" className="hover:text-white transition-colors">Gizlilik</a>
          <span className="text-emerald-500/30">•</span>
          <a href="/gizlilik#mesafeli-satis" className="hover:text-white transition-colors">Mesafeli Satış</a>
          <span className="text-emerald-500/30">•</span>
          <a href="/gizlilik#teslimat-iade" className="hover:text-white transition-colors">Teslimat & İade</a>
        </div>

        {/* Karneyn Yazılım İmza Footer */}
        <div className="pt-1.5 border-t border-emerald-500/15 flex flex-col items-center justify-center gap-1 opacity-90">
          <img src="/karneyn-icon.png" alt="Karneyn Yazılım" className="h-4 opacity-85 mix-blend-lighten" />
          <span className="text-[9px] font-bold text-emerald-300/90 tracking-widest uppercase font-sans">
            KARNEYN YAZILIM
          </span>
        </div>

      </div>

      {/* Subscription Modal */}
      <SubscriptionModal />
    </div>
  );
}
