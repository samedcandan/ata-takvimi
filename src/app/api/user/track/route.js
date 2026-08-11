import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * POST /api/user/track — Kullanıcı giriş/kayıt olduğunda DB'ye kaydet
 * Body: { email, phone, name, provider, plan }
 * 
 * Admin panelde abone tablosunda gösterilecek kullanıcı verilerini toplar.
 */
export async function POST(request) {
  try {
    const { email, phone, name, provider, plan } = await request.json();

    if (!email && !phone) {
      return NextResponse.json({ error: 'E-posta veya telefon gerekli' }, { status: 400 });
    }

    // Upsert — email ile eşleş, varsa güncelle, yoksa oluştur
    const identifier = email || `${phone}@ata.local`;

    await query(
      `INSERT INTO ata_users (email, phone, name, provider, plan, last_login_at, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT (email) DO UPDATE SET 
         phone = COALESCE($2, ata_users.phone),
         name = COALESCE($3, ata_users.name),
         provider = COALESCE($4, ata_users.provider),
         plan = COALESCE($5, ata_users.plan),
         last_login_at = NOW()`,
      [identifier, phone || null, name || null, provider || 'email', plan || 'FREE']
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User track error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
