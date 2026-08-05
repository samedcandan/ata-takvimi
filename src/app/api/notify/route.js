import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '../../../lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { event, userName, userEmail, planName, provider, date } = body;

    const timestamp = date || new Date().toISOString();
    const eventTitle = event === 'NEW_SUBSCRIBER_PAID'
      ? '💳 Yeni Ödemeli Abonelik (₺300)'
      : event === 'NEW_TRIAL'
      ? '🌱 Yeni 2 Günlük Deneme Kaydı'
      : '👤 Yeni Abone Girişi';

    const logPayload = {
      event: eventTitle,
      name: userName || 'Bilinmeyen Kullanıcı',
      email: userEmail || 'Bilinmeyen E-posta',
      plan: planName || 'Ata Takvimi Aboneliği',
      provider: provider || 'email',
      timestamp: timestamp
    };

    console.log('🔔 [ATA TAKVİMİ BİLDİRİMİ]:', JSON.stringify(logPayload, null, 2));

    // 1. Send Automatic Welcome Email to Subscriber
    let mailResult = null;
    if (userEmail && userEmail.includes('@')) {
      mailResult = await sendWelcomeEmail({
        toEmail: userEmail,
        userName: userName,
        planName: planName
      });
    }

    // 2. Admin Alert (Log & Webhook if present)
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🔔 *Ata Takvimi Yeni Abone Bildirimi*\n\n*Olay:* ${eventTitle}\n*İsim:* ${userName}\n*E-posta:* ${userEmail}\n*Paket:* ${planName}\n*Tarih:* ${timestamp}`
          })
        });
      } catch (err) {
        console.error('Webhook error:', err);
      }
    }

    return NextResponse.json({
      success: true,
      logged: logPayload,
      mailResult: mailResult
    });
  } catch (error) {
    console.error('Notify API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
