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

  // Reklam Yapılandırması
  ads: {
    enabled: true,
    bannerPosition: 'bottom', // 'bottom' | 'top'
    refreshRateSeconds: 60,
  }
};
