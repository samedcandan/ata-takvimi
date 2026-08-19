"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Moon, Calendar, Sprout, CloudSnow, Check, X, ShieldCheck, Sparkles, Send, AlertCircle } from 'lucide-react';
import { requestNotificationPermission, sendBrowserNotification, DEFAULT_NOTIFICATION_PREFS } from '../lib/notificationEngine';

export default function NotificationModal() {
  const { showNotificationModal, setShowNotificationModal, notificationPrefs, updateNotificationPrefs } = useAuth();
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [testSuccess, setTestSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  if (!showNotificationModal || !mounted) return null;

  const handleRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermissionStatus(status);
    if (status === 'granted') {
      updateNotificationPrefs({ ...notificationPrefs, enabled: true });
      sendBrowserNotification(
        '🔔 Ata Takvimi Bildirimleri Aktif!',
        'Toprağın kadim takvimi ve zirai don uyarıları artık tarayıcınıza iletilecektir.'
      );
    }
  };

  const handleToggleCategory = (categoryKey) => {
    const newPrefs = {
      ...notificationPrefs,
      [categoryKey]: !notificationPrefs[categoryKey]
    };
    updateNotificationPrefs(newPrefs);
  };

  const handleSendTest = () => {
    if (permissionStatus !== 'granted') {
      handleRequestPermission();
      return;
    }
    const success = sendBrowserNotification(
      '🌱 Test Bildirimi — Ata Takvimi',
      'Bildirim sisteminiz kusursuz çalışıyor! Ay evresi ve zirai don uyarıları cebinizde.'
    );
    if (success) {
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 3000);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl p-5 md:p-7 max-w-lg w-full border border-forest-800/20 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-harvest-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-forest-800/10 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-forest-800 text-white flex items-center justify-center font-bold">
              <Bell className="w-5 h-5 text-harvest-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-harvest-600 uppercase tracking-wider">Ata Takvimi</span>
              <h2 className="text-lg md:text-xl font-serif font-bold text-forest-900 leading-tight">
                Bildirim Tercihleri
              </h2>
            </div>
          </div>
          <button
            onClick={() => setShowNotificationModal(false)}
            className="p-2 text-forest-800/50 hover:text-forest-900 font-bold rounded-2xl hover:bg-forest-800/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 pr-1">
          
          {/* Permission Status Banner */}
          <div className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-2 ${
            permissionStatus === 'granted'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : permissionStatus === 'denied'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            <div className="flex items-center gap-2">
              {permissionStatus === 'granted' ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span>
                {permissionStatus === 'granted'
                  ? 'Tarayıcı Bildirim İzni Aktif'
                  : permissionStatus === 'denied'
                  ? 'Tarayıcı Bildirimi Engellendi'
                  : 'Tarayıcı Bildirim İzni Bekleniyor'}
              </span>
            </div>

            {permissionStatus !== 'granted' && (
              <button
                onClick={handleRequestPermission}
                className="px-3 py-1.5 bg-forest-800 text-white rounded-xl text-[11px] font-bold hover:bg-forest-900 transition-colors shrink-0"
              >
                İzin Ver
              </button>
            )}
          </div>

          {testSuccess && (
            <div className="bg-emerald-100 text-emerald-900 p-3 rounded-2xl border border-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Test bildirimi tarayıcınıza iletildi!</span>
            </div>
          )}

          {/* Categories Title */}
          <p className="text-xs text-forest-800/70 font-medium">
            Almak istediğiniz bildirim kategorilerini aşağıdan özelleştirebilirsiniz:
          </p>

          {/* Categories Grid */}
          <div className="space-y-2.5">
            
            {/* Category 1: Ay Evreleri */}
            <div className="p-3.5 rounded-2xl bg-forest-50/80 border border-forest-800/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4 text-harvest-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">🌙 Ay Evreleri & Ekim Uyarıları</h4>
                  <p className="text-[11px] text-forest-800/70">Karanlık Ay (nadas), Yeni Ay ve Dolunay zamanlamaları</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(notificationPrefs.moon)}
                onChange={() => handleToggleCategory('moon')}
                className="w-5 h-5 accent-forest-800 cursor-pointer shrink-0"
              />
            </div>

            {/* Category 2: Anadolu Halk Takvimi */}
            <div className="p-3.5 rounded-2xl bg-forest-50/80 border border-forest-800/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-harvest-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">🌾 Anadolu Halk & Kocakarı Takvimi</h4>
                  <p className="text-[11px] text-forest-800/70">Cemreler, fırtına günleri ve nadas dönemleri</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(notificationPrefs.halk)}
                onChange={() => handleToggleCategory('halk')}
                className="w-5 h-5 accent-forest-800 cursor-pointer shrink-0"
              />
            </div>

            {/* Category 3: Zirai Hava & Don */}
            <div className="p-3.5 rounded-2xl bg-forest-50/80 border border-forest-800/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                  <CloudSnow className="w-4 h-4 text-terracotta-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">🌦️ 81 İl Zirai Hava & Don Uyarısı</h4>
                  <p className="text-[11px] text-forest-800/70">Dondurucu soğuklar (≤2°C), yağış ve fırtına alarmı</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(notificationPrefs.weather)}
                onChange={() => handleToggleCategory('weather')}
                className="w-5 h-5 accent-forest-800 cursor-pointer shrink-0"
              />
            </div>

            {/* Category 4: Kişisel Notlar */}
            <div className="p-3.5 rounded-2xl bg-forest-50/80 border border-forest-800/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-forest-800/10 text-forest-800 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-900">📓 Kişisel Bitki Ajandası & Notlarım</h4>
                  <p className="text-[11px] text-forest-800/70">Eklediğiniz bitki sulama, ilaçlama ve gübreleme tarihleri</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(notificationPrefs.personalNotes)}
                onChange={() => handleToggleCategory('personalNotes')}
                className="w-5 h-5 accent-forest-800 cursor-pointer shrink-0"
              />
            </div>

          </div>



        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-forest-800/10 flex items-center justify-center gap-1.5 text-[11px] text-forest-800/60 shrink-0">
          <ShieldCheck className="w-4 h-4 text-forest-600" />
          <span>Bildirim tercihleriniz cihazınızda güvenle saklanır.</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
