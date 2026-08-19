import { NextResponse } from 'next/server';
import { sendPushToAll } from '../../../lib/fcm';
import { HALK_TAKVIMI_EVENTS } from '../../../data/halk-takvimi';
import { getMoonPhase } from '../../../lib/moonCalc';

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'karneyn_admin_2024';

async function getAllTokens() {
  if (!DATABASE_URL) return [];
  
  const neonHost = DATABASE_URL.match(/@([^/]+)\//)?.[1];
  
  const res = await fetch(`https://${neonHost}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': DATABASE_URL,
    },
    body: JSON.stringify({ 
      query: 'SELECT token FROM ata_push_tokens',
      params: [] 
    }),
  });

  if (!res.ok) return [];
  const data = await res.json();
  return (data.rows || []).map(r => r.token);
}

async function removeExpiredTokens(expiredTokens) {
  if (!expiredTokens.length || !DATABASE_URL) return;
  
  const neonHost = DATABASE_URL.match(/@([^/]+)\//)?.[1];
  
  for (const token of expiredTokens) {
    try {
      await fetch(`https://${neonHost}/sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Neon-Connection-String': DATABASE_URL,
        },
        body: JSON.stringify({ 
          query: 'DELETE FROM ata_push_tokens WHERE token = $1',
          params: [token] 
        }),
      });
    } catch (e) {}
  }
}

/**
 * POST /api/push-send — Send push notifications to all registered devices
 * Protected by ADMIN_SECRET
 * 
 * Body: { secret, type?, title?, body?, data? }
 * type: "daily" (auto-detect today's content), "custom" (manual title/body)
 * 
 * Can be triggered by:
 * - Vercel Cron (daily at 07:00 Turkey time)
 * - Manual admin call
 */
export async function POST(request) {
  try {
    const { secret, type = 'daily', title, body, data } = await request.json();

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
    }

    const tokens = await getAllTokens();
    if (tokens.length === 0) {
      return NextResponse.json({ success: true, message: 'Kayıtlı cihaz yok', sent: 0 });
    }

    let pushTitle, pushBody, pushData;

    if (type === 'custom' && title && body) {
      // Manual push notification
      pushTitle = title;
      pushBody = body;
      pushData = data || {};
    } else {
      // Auto-detect daily content
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      // 1. Check Ay Evresi
      const moonPhase = getMoonPhase(now);
      
      if (moonPhase.isDarkMoon) {
        pushTitle = '🌑 Karanlık Ay — Nadas Dönemi';
        pushBody = `Yeni Ay öncesi nadas! Toprağa tohum ekilmez, budama ve nadas yapılır. Aydınlık: %${moonPhase.illumination}`;
        pushData = { url: '/takvim', type: 'moon' };
      } else if (moonPhase.isNewMoon) {
        pushTitle = '🌒 Yeni Ay — Tohum Ekim Zamanı';
        pushBody = `Toprağın bereketi artıyor! Yapraklı ürünleri ekmek için ideal gün. Aydınlık: %${moonPhase.illumination}`;
        pushData = { url: '/takvim', type: 'moon' };
      } else if (moonPhase.isFullMoon) {
        pushTitle = '🌕 Dolunay — Hasat Zamanı';
        pushBody = `Bitkilerde özsuyu zirvede! Hasat ve meyve toplamak için en verimli gün. Aydınlık: %${moonPhase.illumination}`;
        pushData = { url: '/takvim', type: 'moon' };
      } else if (moonPhase.phaseName === 'İlk Dördün') {
        pushTitle = '🌓 İlk Dördün — Yaprak & Aşı Dönemi';
        pushBody = `Yapraklı bitki ekimi ve meyve ağacı aşılaması için ideal safha. Aydınlık: %${moonPhase.illumination}`;
        pushData = { url: '/takvim', type: 'moon' };
      } else if (moonPhase.phaseName === 'Son Dördün') {
        pushTitle = '🌗 Son Dördün — Budama & Gübreleme';
        pushBody = `Budama, çapa, yabani ot temizliği ve organik gübreleme için mükemmel dönem. Aydınlık: %${moonPhase.illumination}`;
        pushData = { url: '/takvim', type: 'moon' };
      }

      // 2. Check Halk Takvimi Events
      if (!pushTitle) {
        const todayEvent = HALK_TAKVIMI_EVENTS.find(e => e.month === month && e.day === day);
        if (todayEvent) {
          pushTitle = `🌾 ${todayEvent.title}`;
          pushBody = todayEvent.desc || todayEvent.description || 'Anadolu halk takviminde bugüne özel bir olay var!';
          pushData = { url: '/', type: 'halk' };
        }
      }

      // 3. Default: Günlük takvim hatırlatması
      if (!pushTitle) {
        const moonEmoji = moonPhase.illumination > 80 ? '🌕' : moonPhase.illumination > 50 ? '🌔' : moonPhase.illumination > 20 ? '🌓' : '🌒';
        pushTitle = `${moonEmoji} Ata Takvimi — Günlük Rehber`;
        pushBody = `${moonPhase.phaseName} — Ay aydınlığı: %${moonPhase.illumination}. ${moonPhase.agricultureAdvice}`;
        pushData = { url: '/', type: 'daily' };
      }
    }

    const result = await sendPushToAll(tokens, pushTitle, pushBody, pushData);

    // Clean up expired tokens
    if (result.expired.length > 0) {
      await removeExpiredTokens(result.expired);
    }

    return NextResponse.json({
      success: true,
      sent: result.sent,
      total: tokens.length,
      expired_cleaned: result.expired.length,
      notification: { title: pushTitle, body: pushBody }
    });
  } catch (error) {
    console.error('Push send hatası:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
