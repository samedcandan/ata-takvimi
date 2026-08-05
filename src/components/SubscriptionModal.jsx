"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Check, CreditCard, ShieldCheck, KeyRound, X, Star } from 'lucide-react';

export default function SubscriptionModal() {
  const { showSubModal, setShowSubModal, user, activateSubscription, setShowAuthModal } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('annual'); // 'annual' or 'monthly'
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!showSubModal || !mounted) return null;

  const handleActivate = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!user) {
      setShowSubModal(false);
      setShowAuthModal(true);
      return;
    }

    const planName = selectedPlan === 'annual' ? 'Yıllık Ata Çiftçisi Paketi' : 'Aylık Çiftçi Paketi';
    const code = promoCode.trim().toUpperCase() || 'IYZICO-SUB';

    const success = activateSubscription(planName, code);
    if (success) {
      setMessage('Aboneliğiniz başarıyla aktif edildi! Tüm premium hizmetlerden yararlanabilirsiniz.');
      setTimeout(() => {
        setShowSubModal(false);
        setMessage('');
      }, 1500);
    }
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoCode) {
      setError('Lütfen geçerli bir davet veya lisans kodu giriniz.');
      return;
    }
    const code = promoCode.trim().toUpperCase();
    const planName = 'Ata Çiftçisi Lisanslı Paket';
    const success = activateSubscription(planName, code);
    if (success) {
      setMessage(`"${code}" kodu ile aboneliğiniz aktifleştirildi!`);
      setTimeout(() => {
        setShowSubModal(false);
        setMessage('');
        setPromoCode('');
      }, 1500);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl p-5 md:p-7 max-w-2xl w-full border border-forest-800/20 shadow-2xl relative max-h-[88vh] flex flex-col overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-harvest-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-forest-800/10 pb-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-harvest-600 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Karneyn Yazılım Çiftçi Kulübü</span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-forest-900 leading-tight">
              Ata Takvimi Premium Abonelik
            </h2>
          </div>
          <button
            onClick={() => setShowSubModal(false)}
            className="p-2 text-forest-800/50 hover:text-forest-900 font-bold rounded-2xl hover:bg-forest-800/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 pr-1">
          {message && (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-2xl border border-red-200 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Premium Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs bg-forest-50/80 p-3.5 rounded-2xl border border-forest-800/10">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-harvest-400 text-forest-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</div>
              <span><strong>81 İl Canlı Hava & Don Raporu:</strong> Zirai uyarılara anında erişim.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-harvest-400 text-forest-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</div>
              <span><strong>45 Ürün Vektör Rehberi:</strong> Ekim, ilaçlama ve budama takvimleri.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-harvest-400 text-forest-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</div>
              <span><strong>Sınırsız Bitki & Not Ajandası:</strong> İleri ve geri tarihli kayıt sistemi.</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-harvest-400 text-forest-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</div>
              <span><strong>Anadolu Halk & Ay Takvimi:</strong> Ay evrelerine duyarlı tarım rehberliği.</span>
            </div>
          </div>

          {/* Subscription Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedPlan === 'monthly'
                  ? 'border-forest-800 bg-forest-800/5 ring-2 ring-forest-600 shadow-md'
                  : 'border-forest-800/15 bg-white hover:border-forest-800/30'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold text-forest-800/60 uppercase">Aylık Paket</span>
                <div className="text-2xl font-serif font-bold text-forest-900 my-1">
                  ₺149 <span className="text-xs font-sans font-normal text-forest-800/70">/ ay</span>
                </div>
                <p className="text-[11px] text-forest-800/80">Esnek aylık yenileme, dilediğiniz an iptal hakkı.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-forest-800/10 flex items-center justify-between text-xs font-bold text-forest-900">
                <span>Aylık Çiftçi</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-forest-800 bg-forest-800 text-white' : 'border-gray-300'}`}>
                  {selectedPlan === 'monthly' && '✓'}
                </span>
              </div>
            </div>

            {/* Annual Plan */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedPlan === 'annual'
                  ? 'badge-forest shadow-xl ring-2 ring-harvest-400 scale-[1.01]'
                  : 'border-harvest-500/40 bg-harvest-50 hover:border-harvest-500'
              }`}
            >
              <div className="absolute top-2 right-2 bg-harvest-400 text-forest-900 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Star className="w-3 h-3 fill-current" /> %45 İNDİRİMLİ
              </div>

              <div>
                <span className="text-[11px] font-bold text-harvest-400 uppercase">Yıllık Avantajlı Paket</span>
                <div className="text-2xl font-serif font-bold text-white my-1">
                  ₺999 <span className="text-xs font-sans font-normal text-white/70">/ yıl</span>
                </div>
                <p className="text-[11px] text-white/80">Ayda sadece <strong>₺83</strong>! 81 il hava uyarısı ve don takibi dahil.</p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
                <span>Yıllık Ata Çiftçisi</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPlan === 'annual' ? 'border-harvest-400 bg-harvest-400 text-forest-900' : 'border-white/40'}`}>
                  {selectedPlan === 'annual' && '✓'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: İyzico Payment */}
          <button
            onClick={handleActivate}
            className="w-full py-3.5 rounded-2xl badge-forest font-bold text-xs md:text-sm shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 group"
          >
            <CreditCard className="w-4 h-4 text-harvest-400 group-hover:rotate-12 transition-transform" />
            <span>İyzico Güvenli Ödeme İle Aboneliği Başlat (₺{selectedPlan === 'annual' ? '999' : '149'})</span>
          </button>

          {/* License Code Entry */}
          <div className="border-t border-forest-800/10 pt-3 space-y-1.5">
            <label className="block text-xs font-bold text-forest-900 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-harvest-500" />
              Abonelik / Lisans Kodunuz Var mı?
            </label>
            <form onSubmit={handlePromoSubmit} className="flex gap-2 text-xs">
              <input
                type="text"
                placeholder="Örn: ATA2026 veya KARNEYN"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-1 bg-forest-50 border border-forest-800/20 rounded-xl p-2.5 font-bold text-forest-900 outline-none focus:border-harvest-500 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-forest-800 text-white font-bold rounded-xl hover:bg-forest-900 transition-colors shrink-0"
              >
                Kodu Kullan
              </button>
            </form>
          </div>
        </div>

        {/* Fixed Footer Note */}
        <div className="pt-2 border-t border-forest-800/10 flex items-center justify-center gap-2 text-[11px] text-forest-800/60 shrink-0">
          <ShieldCheck className="w-4 h-4 text-forest-500" />
          <span>256-Bit SSL & İyzico Güvenli Ödeme Altyapısı ile Korumalıdır.</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
