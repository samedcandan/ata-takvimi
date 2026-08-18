// Ata Takvimi Reklam Motoru (AdMob & Web AdSense)
import { APP_CONFIG } from './config';

export const isNativePlatform = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
};

export const getAdMobBannerId = () => {
  if (typeof window === 'undefined') return '';
  const isIos = window.Capacitor && window.Capacitor.getPlatform && window.Capacitor.getPlatform() === 'ios';
  return isIos ? APP_CONFIG.ads.admob.bannerIos : APP_CONFIG.ads.admob.bannerAndroid;
};

export const getAdMobInterstitialId = () => {
  if (typeof window === 'undefined') return '';
  const isIos = window.Capacitor && window.Capacitor.getPlatform && window.Capacitor.getPlatform() === 'ios';
  return isIos ? APP_CONFIG.ads.admob.interstitialIos : APP_CONFIG.ads.admob.interstitialAndroid;
};

// Örnek Sponsor / Dahili Reklam Havuzu (AdSense yüklenemediğinde veya yerel sponsor gösteriminde)
export const NATIVE_SPONSOR_ADS = [
  {
    id: 'sponsor-1',
    title: '🌾 Yerli Tohum ve Gübre Rehberi',
    description: 'Anadolu topraklarına en uygun geleneksel tohumlar ve organik gübreleme tekniklerini keşfedin.',
    cta: 'Rehberi İncele',
    tag: 'Tavsiye & Reklam',
    link: 'https://atatakvimi.karneyn.com/ekim-rehberi'
  },
  {
    id: 'sponsor-2',
    title: '💧 Akıllı Zirai Sulama ve Don Alarmı',
    description: 'Don tehlikelerine ve kuraklığa karşı anlık uyarılarla mahsulünüzü güvenceye alın.',
    cta: 'Hava Durumuna Bak',
    tag: 'Faydalı İpucu',
    link: 'https://atatakvimi.karneyn.com'
  },
  {
    id: 'sponsor-3',
    title: '👑 Ata Takvimi Reklamsız Premium',
    description: 'Tüm reklamları kaldırın, 365 gün boyunca kesintisiz ve hızlı takvim deneyimi yaşayın.',
    cta: '₺200 / Yıl Başlat',
    tag: 'Özel Teklif',
    isUpgrade: true
  }
];
