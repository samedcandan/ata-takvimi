// Ata Takvimi Merkezi Konfigürasyon Dosyası
export const APP_CONFIG = {
  appName: 'Ata Takvimi',
  appSubTitle: 'Anadolu Halk & Ay Takvimi Rehberi',
  company: 'Karneyn Yazılım Hizmetleri Ltd. Şti.',
  domain: 'https://atatakvimi.karneyn.com',
  
  // Fiyatlandırma ve Premium Plan
  subscription: {
    price: '200.00',
    priceNumber: 200,
    currency: 'TRY',
    currencySymbol: '₺',
    durationDays: 365,
    planName: '1 Yıllık Reklamsız Premium (₺200)',
    planBadge: '👑 Reklamsız Premium',
    basketItemId: 'ATA-PREMIUM-YEARLY-200',
    basketItemName: 'Ata Takvimi 1 Yıllık Reklamsız Premium Abonelik',
  },

  // Yetkili Admin E-postaları ve Master Anahtar
  admin: {
    emails: [
      'info@karneyn.com',
      'samed.cndn@hotmail.com',
      'samedcandan@gmail.com',
      'admin@karneyn.com',
      'karneyn@karneyn.com',
    ],
    masterPassword: 'karneyn.admin',
  },

  // Reklam Yapılandırması (Google AdMob / AdSense)
  ads: {
    enabled: true,
    // Google AdMob Android Resmi Test Reklam Birimi ID'leri (Canlı ID girilene kadar güvenli mod)
    admob: {
      appIdAndroid: 'ca-app-pub-3940256099942544~3347511713',
      appIdIos: 'ca-app-pub-3940256099942544~1458002511',
      bannerAndroid: 'ca-app-pub-3940256099942544/6300978111',
      bannerIos: 'ca-app-pub-3940256099942544/2934735716',
      interstitialAndroid: 'ca-app-pub-3940256099942544/1033173712',
      interstitialIos: 'ca-app-pub-3940256099942544/4411468910',
    },
    // Web / PWA AdSense Yapılandırması
    adsense: {
      client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-test',
      slotBanner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || '1234567890',
      slotNative: process.env.NEXT_PUBLIC_ADSENSE_SLOT_NATIVE || '0987654321',
    },
    bannerPosition: 'bottom',
  }
};
