import { NextResponse } from 'next/server';

const VALID_CODES = {
  'KARNEYN-ADMIN': { planName: 'Karneyn Yazılım Kurucu Sınırsız VIP Lisansı', years: 100 },
  'KARNEYN2026': { planName: 'Karneyn VIP Sınırsız Admin Lisansı', years: 100 },
  'KARNEYN': { planName: 'Karneyn Kurumsal Sınırsız VIP Lisansı', years: 100 },
  'ATA2026': { planName: 'Ata Çiftçisi Yıllık Lisans (Promosyon)', months: 12 },
  'CIFTCI300': { planName: 'Ata Çiftçisi Yıllık Paketi', months: 12 },
  'HASAT2026': { planName: 'Hasat Dönemi Özel Lisansı', months: 12 },
  'DENEME2': { planName: '2 Gün Ek Deneme Lisansı', days: 2 }
};

export async function POST(request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ success: false, message: 'Lütfen bir kod giriniz.' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const found = VALID_CODES[cleanCode];

    if (found) {
      const now = new Date();
      const expiresAt = new Date(now);
      if (found.years) {
        expiresAt.setFullYear(expiresAt.getFullYear() + found.years);
      } else if (found.months) {
        expiresAt.setMonth(expiresAt.getMonth() + found.months);
      } else if (found.days) {
        expiresAt.setDate(expiresAt.getDate() + found.days);
      }

      return NextResponse.json({
        success: true,
        code: cleanCode,
        planName: found.planName,
        activatedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz veya süresi dolmuş lisans/promosyon kodu.'
      }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
  }
}
