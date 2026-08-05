"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, ShieldCheck, X } from 'lucide-react';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (!showAuthModal) return null;

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

  const handleQuickGoogle = async () => {
    setError('');
    setShowGooglePrompt(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      if (activeTab === 'login') {
        loginWithEmail(formData.email, formData.password);
      } else {
        registerWithEmail(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'Giriş işlemi sırasında hata oluştu.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl p-5 md:p-7 max-w-md w-full border border-forest-800/20 shadow-2xl relative max-h-[88vh] flex flex-col overflow-hidden">
        {/* Decorative ambient blur */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-harvest-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-forest-800/10 pb-3 shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-harvest-600">Ata Takvimi Hesabı</span>
            <h3 className="text-xl font-serif font-bold text-forest-900 leading-tight">
              {activeTab === 'login' ? 'Giriş Yap' : 'Ücretsiz Kayıt Ol'}
            </h3>
          </div>
          <button
            onClick={() => setShowAuthModal(false)}
            className="p-2 text-forest-800/50 hover:text-forest-900 font-bold rounded-2xl hover:bg-forest-800/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 pr-1">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-2xl border border-red-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Google Sign-In Button */}
          {!showGooglePrompt ? (
            <button
              onClick={handleQuickGoogle}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border border-gray-300 text-gray-800 font-bold text-xs flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all hover:scale-[1.01]"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google İle Giriş Yap / Üye Ol</span>
            </button>
          ) : (
            <form onSubmit={handleGoogleSubmit} className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-blue-900 font-bold">
                <span>Google Hesabınızı Onaylayın</span>
                <button type="button" onClick={() => setShowGooglePrompt(false)} className="text-blue-700 underline text-[11px]">
                  Geri
                </button>
              </div>
              <input
                type="email"
                required
                placeholder="örnek@gmail.com"
                value={googleEmailInput}
                onChange={e => setGoogleEmailInput(e.target.value)}
                className="w-full bg-white border border-blue-300 rounded-xl p-2.5 text-xs outline-none focus:border-blue-500 font-medium"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Google Hesabı ile Onayla ve Bağlan
              </button>
            </form>
          )}

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-forest-800/10 w-full" />
            <span className="bg-white px-3 text-[11px] text-forest-800/50 font-bold uppercase shrink-0">veya e-posta ile</span>
            <div className="border-t border-forest-800/10 w-full" />
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-forest-50 p-1 rounded-2xl border border-forest-800/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`w-1/2 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'login'
                  ? 'bg-forest-800 text-white shadow'
                  : 'text-forest-800/70 hover:text-forest-900'
              }`}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`w-1/2 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'register'
                  ? 'bg-forest-800 text-white shadow'
                  : 'text-forest-800/70 hover:text-forest-900'
              }`}
            >
              Kayıt Ol
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
            {activeTab === 'register' && (
              <div>
                <label className="block font-bold text-forest-900 mb-1">Ad Soyad</label>
                <div className="relative">
                  <User className="w-4 h-4 text-forest-800/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ahmet Yılmaz"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-forest-50 border border-forest-800/15 rounded-xl pl-9 p-2.5 outline-none focus:border-harvest-500 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-forest-900 mb-1">E-posta Adresi</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-forest-800/40 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="ahmet@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl pl-9 p-2.5 outline-none focus:border-harvest-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-forest-900 mb-1">Şifre</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-forest-800/40 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl pl-9 p-2.5 outline-none focus:border-harvest-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl badge-forest font-bold shadow-md hover:scale-[1.01] transition-transform text-xs flex items-center justify-center gap-2 mt-2"
            >
              {activeTab === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  Hesabıma Giriş Yap
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Yeni Hesap Oluştur
                </>
              )}
            </button>
          </form>
        </div>

        {/* Fixed Footer Note */}
        <div className="pt-2 border-t border-forest-800/10 flex items-center justify-center gap-1 text-[11px] text-forest-800/60 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-forest-500" />
          <span>Verileriniz tarayıcınızda ve hesabınızda güvenle saklanır.</span>
        </div>
      </div>
    </div>
  );
}
