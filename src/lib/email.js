import nodemailer from 'nodemailer';
import { APP_CONFIG } from './config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'info@karneyn.com',
    pass: process.env.SMTP_PASS || 'karneyn_smtp_pass_2026'
  }
});

export async function sendWelcomeEmail({ toEmail, userName, planName }) {
  const isPaid = planName && (planName.includes('200') || planName.includes('Premium'));
  const subject = isPaid
    ? `🎉 ${APP_CONFIG.appName} 1 Yıllık Reklamsız Premium Aboneliğiniz Aktif Edildi!`
    : `🌱 ${APP_CONFIG.appName}'ne Hoş Geldiniz!`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #071a10; color: #ffffff; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0e2d1d; border: 2px solid #f3be53; border-radius: 24px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .header { text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px; }
          .logo { font-size: 32px; font-weight: bold; color: #f3be53; }
          .title { font-size: 24px; font-weight: bold; color: #ffffff; margin-top: 12px; }
          .badge { display: inline-block; background: #22b558; color: #071a10; font-size: 12px; font-weight: bold; padding: 6px 16px; border-radius: 99px; margin-top: 8px; }
          .content { font-size: 14px; line-height: 1.6; color: #d1fae5; }
          .feature-box { background: #07190f; border: 1px solid rgba(34,181,88,0.3); border-radius: 16px; padding: 16px; margin: 20px 0; }
          .feature-item { margin: 8px 0; font-size: 13px; color: #ffffff; }
          .btn { display: block; width: 100%; text-align: center; background: #f3be53; color: #071a10; font-weight: bold; text-decoration: none; padding: 14px 0; border-radius: 16px; font-size: 15px; margin-top: 24px; }
          .footer { text-align: center; font-size: 11px; color: #6ee7b7; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌱 ${APP_CONFIG.appName}</div>
            <div class="title">Aramıza Hoş Geldiniz!</div>
            <div class="badge">${isPaid ? '👑 1 Yıllık Reklamsız Premium' : '🌾 Ücretsiz Kullanıcı'}</div>
          </div>

          <div class="content">
            <p>Sayın <strong>${userName || 'Değerli Kullanıcımız'}</strong>,</p>
            <p>
              Anadolu'nun bin yıllık toprak tecrübesini astronomik ay evreleri ve 81 il hava tahminleriyle buluşturan <strong>${APP_CONFIG.appName}</strong> ailesine katıldığınız için teşekkür ederiz.
            </p>

            <div class="feature-box">
              <div style="font-weight:bold; color:#f3be53; margin-bottom:8px; font-size:14px;">🌟 Ayrıcalıklarınız:</div>
              <div class="feature-item">✓ <strong>365 Gün Anadolu Halk Takvimi:</strong> Cemre, fırtına ve mevsim döngüleri.</div>
              <div class="feature-item">✓ <strong>Astronomik Ay Evreleri:</strong> Hassas ekim, dikim ve hasat tavsiyeleri.</div>
              <div class="feature-item">✓ <strong>81 İl Zirai Hava Raporu:</strong> Canlı don, aşırı yağış ve rüzgar uyarıları.</div>
              <div class="feature-item">✓ <strong>Kişisel Notlar & Hatırlatıcılar:</strong> Tarlanızı ve bahçenizi kolayca takip edin.</div>
            </div>

            <p style="font-size:12px; color:#a7f3d0;">
              Hesabınızla hemen giriş yapabilir, takvim ve hava durumunuzu canlı olarak takip edebilirsiniz.
            </p>

            <a href="${APP_CONFIG.domain}" class="btn">Ata Takvimi'ne Giriş Yap 🚀</a>
          </div>

          <div class="footer">
            <p>© 2026 ${APP_CONFIG.appName} — Bir ${APP_CONFIG.company} Ürünüdür.</p>
            <p>Destek ve İletişim: info@karneyn.com | www.karneyn.com</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${APP_CONFIG.appName} — Karneyn Yazılım" <info@karneyn.com>`,
      to: toEmail,
      subject: subject,
      html: htmlContent
    });
    console.log('✉️ Hoş geldiniz e-postası gönderildi:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('E-posta gönderim hatası:', error);
    return { success: false, error: error.message };
  }
}
