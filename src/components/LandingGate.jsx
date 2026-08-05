"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, ShieldCheck, Sparkles, Star, Award, KeyRound } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';

export default function LandingGate() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, setShowSubModal } = useAuth();
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
    <div className="fixed inset-0 z-[999] bg-[#071a10] text-white flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Login / Register Card */}
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
          <p className="text-xs text-emerald-300 font-sans">Abone Giriş ve Kullanıcı Portalı</p>
        </div>

        {error && (
          <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-3 rounded-xl font-bold text-center">
            {error}
          </div>
        )}

        {/* Quick Google Login */}
        {!showGooglePrompt ? (
          <button
            onClick={() => setShowGooglePrompt(true)}
            className="w-full py-3 px-4 rounded-xl bg-white text-gray-900 font-extrabold text-xs flex items-center justify-center gap-3 shadow-lg hover:bg-gray-100 transition-all hover:scale-[1.01]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google ile Hızlı Giriş Yap / Üye Ol</span>
          </button>
        ) : (
          <form onSubmit={handleGoogleSubmit} className="bg-[#07190f] p-3.5 rounded-xl border border-emerald-500/40 space-y-2.5">
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
              className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-harvest-400 font-medium"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Google Hesabı ile Onayla
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-emerald-500/20 w-full" />
          <span className="bg-[#0e2d1d] px-3 text-[10px] text-emerald-300/70 font-bold uppercase shrink-0">veya e-posta ile</span>
          <div className="border-t border-emerald-500/20 w-full" />
        </div>

        {/* Login / Register Tab Switcher */}
        <div className="flex bg-[#07190f] p-1 rounded-xl border border-emerald-500/30 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-2 rounded-lg font-bold transition-all ${
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
            className={`w-1/2 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'register'
                ? 'bg-harvest-400 text-forest-950 shadow'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Yeni Üyelik (2 Gün Ücretsiz)
          </button>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
          {activeTab === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-emerald-300 mb-1">Adınız Soyadınız</label>
              <div className="relative">
                <User className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl pl-9 p-2.5 text-white outline-none focus:border-harvest-400 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-emerald-300 mb-1">E-posta Adresi</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="ahmet@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl pl-9 p-2.5 text-white outline-none focus:border-harvest-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald-300 mb-1">Şifreniz</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400/60 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#113320] border border-emerald-500/40 rounded-xl pl-9 p-2.5 text-white outline-none focus:border-harvest-400 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-harvest-400 hover:bg-harvest-300 text-forest-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2"
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

        {/* Direct Purchase Button */}
        <div className="pt-2 border-t border-emerald-500/20 text-center">
          <button
            onClick={() => setShowSubModal(true)}
            className="w-full py-2.5 rounded-xl bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-400/30 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4 text-harvest-400" />
            <span>Doğrudan Yıllık ₺300 İle Abone Ol</span>
          </button>
        </div>

        <p className="text-[10px] text-emerald-300/80 flex items-center justify-center gap-1 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL & İyzico Güvenli Ödeme Altyapısı</span>
        </p>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal />
    </div>
  );
}
