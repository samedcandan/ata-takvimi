"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Check, CreditCard, ShieldCheck, KeyRound, X, Star, AlertTriangle, Loader2, LogIn } from 'lucide-react';
import { APP_CONFIG } from '../lib/config';

export default function SubscriptionModal() {
  const { showSubModal, setShowSubModal, user, activateSubscription, setShowAuthModal, isAdFree, daysLeft, setAuthIntent } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!showSubModal || !mounted) return null;

  const handleIyzicoCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!user) {
      setShowSubModal(false);
      setShowAuthModal(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/iyzico/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          callbackUrl: `${window.location.origin}/api/iyzico/callback`
        })
      });

      const data = await res.json();

      if (data.status === 'success' && data.checkoutFormContent) {
        // İyzico iframe / form içeriğini render et
        const container = document.getElementById('iyzico-checkout-container');
        if (container) {
          container.innerHTML = data.checkoutFormContent;
          const scripts = container.getElementsByTagName('script');
          for (let i = 0; i < scripts.length; i++) {
            eval(scripts[i].innerText);
          }
        }
      } else {
        setError(data.errorMessage || 'Ödeme formu başlatılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Ödeme servisine bağlanırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!promoCode.trim()) {
      setError('Lütfen geçerli bir lisans veya promosyon kodu giriniz.');
      return;
    }

    const cleanCode = promoCode.trim().toUpperCase();

    try {
      setLoading(true);
      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode })
      });

      const data = await res.json();
      if (data.success) {
        const success = activateSubscription(data.planName, cleanCode);
        if (success) {
          setMessage(`"${cleanCode}" kodu ile ${APP_CONFIG.subscription.planName} aktif edildi!`);
          setTimeout(() => {
            setShowSubModal(false);
            setMessage('');
            setPromoCode('');
          }, 1500);
        }
      } else {
        setError(data.message || 'Geçersiz veya süresi dolmuş lisans kodu.');
      }
    } catch (err) {
      setError('Kod doğrulanırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e2d1d] border border-harvest-400/40 rounded-3xl p-5 sm:p-6 text-white shadow-2xl space-y-4 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowSubModal(false);
            setError('');
            setMessage('');
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-gold text-forest-900 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reklamsız Premium Deneyim</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
            {APP_CONFIG.appName} Premium
          </h2>
          <p className="text-xs text-emerald-200/90 max-w-sm mx-auto">
            Yıl boyunca tüm reklamları kaldırın, kesintisiz ve hızlı takvim deneyiminin tadını çıkarın.
          </p>
        </div>

        {/* Plan Feature Grid */}
        <div className="grid grid-cols-2 gap-2 bg-[#07190f] p-3 rounded-2xl border border-emerald-500/30 text-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-harvest-400 shrink-0" />
            <span className="text-emerald-100 font-medium">Sıfır Reklam</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-harvest-400 shrink-0" />
            <span className="text-emerald-100 font-medium">Öncelikli Bildirimler</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-harvest-400 shrink-0" />
            <span className="text-emerald-100 font-medium">Ekim & Don Alarmları</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-harvest-400 shrink-0" />
            <span className="text-emerald-100 font-medium">365 Gün Kesintisiz</span>
          </div>
        </div>

        {/* Dynamic Status / Feedback Messages */}
        {message && (
          <div className="bg-emerald-900/60 border border-emerald-400 text-emerald-200 text-xs p-3 rounded-xl font-medium text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-harvest-500/20 to-emerald-900/40 border-2 border-harvest-400/60 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-harvest-300">1 Yıllık Tam Erişim</span>
              <h3 className="text-lg font-bold text-white">Reklamsız Çiftçi Paketi</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-harvest-300">
                {APP_CONFIG.subscription.currencySymbol}{APP_CONFIG.subscription.priceNumber}
              </div>
              <span className="text-[10px] text-emerald-300/80">/ 1 Yıl Boyunca</span>
            </div>
          </div>

          <div className="border-t border-emerald-500/20 pt-3 space-y-2 text-xs text-emerald-100">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-harvest-400 shrink-0" />
              <span><strong>🌾 Ekim & Bakım Rehberi:</strong> 45 Anadolu tarım ürününün tüm ekim ve bakım detaylarına tam erişim.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-harvest-400 shrink-0" />
              <span><strong>📖 Tarla Defteri & Notlarım:</strong> Sınırsız tarla, bahçe ve ekim notu kaydetme ve takip.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-harvest-400 shrink-0" />
              <span><strong>🚫 %100 Sıfır Reklam:</strong> Tüm banner ve reklamlar tamamen kalkar, tam ekran ferah deneyim.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-harvest-400 shrink-0" />
              <span><strong>📱 Tüm Cihazlarda:</strong> Hem mobilde hem webde tek abonelikle 1 yıl geçerli.</span>
            </div>
          </div>

          {/* Checkout or Login CTA */}
          {!user ? (
            <div className="space-y-2.5 pt-1">
              <div className="bg-[#07190f] border border-harvest-400/40 rounded-xl p-3 text-xs text-emerald-100 flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-harvest-400 shrink-0 mt-0.5" />
                <span>
                  Abonelik lisansınızı hesabınıza tanımlayabilmek ve güvenli İyzico ödemesine geçebilmek için <strong>önce giriş yapmanız veya üye olmanız</strong> gerekmektedir.
                </span>
              </div>
              <button
                onClick={() => {
                  setAuthIntent('subscription');
                  setShowSubModal(false);
                  setShowAuthModal(true);
                }}
                className="w-full py-3.5 rounded-xl badge-gold text-forest-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-forest-950" />
                <span>Giriş Yap ve Abone Ol ({APP_CONFIG.subscription.currencySymbol}{APP_CONFIG.subscription.priceNumber} / Yıl)</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleIyzicoCheckout}
              disabled={loading || isAdFree}
              className="w-full py-3 rounded-xl badge-gold text-forest-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-forest-950" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              <span>
                {isAdFree
                  ? '👑 Zaten Reklamsız Premium Üyesisiniz'
                  : `İyzico Güvenli Ödeme ile Başlat (${APP_CONFIG.subscription.currencySymbol}${APP_CONFIG.subscription.priceNumber} / Yıl)`}
              </span>
            </button>
          )}
        </div>

        {/* İyzico Embedded Checkout Form Target */}
        <div id="iyzico-checkout-container" className="empty:hidden min-h-[50px] bg-white rounded-xl p-2 text-gray-900" />

        {/* Promo / License Code Option */}
        <form onSubmit={handlePromoSubmit} className="pt-1 border-t border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-emerald-300/90 font-bold">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-harvest-400" />
              <span>Lisans / Promosyon Kodunuz mu var?</span>
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Örn: KARNEYN-VIP"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              className="flex-1 bg-[#07190f] border border-emerald-500/40 rounded-xl px-3 py-2 text-xs text-white uppercase tracking-wider outline-none focus:border-harvest-400 font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shadow"
            >
              Kullan
            </button>
          </div>
        </form>

        {/* Security & Trust Footer */}
        <div className="text-center space-y-1 text-[10px] text-emerald-400/70 border-t border-emerald-500/20 pt-2">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL & İyzico 3D Secure Korumalı Altyapı</span>
          </div>
          <p>{APP_CONFIG.company} Güvencesiyle</p>
        </div>

      </div>
    </div>,
    document.body
  );
}
