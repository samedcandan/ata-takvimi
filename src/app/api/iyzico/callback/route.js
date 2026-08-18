import { NextResponse } from 'next/server';
import { iyzicoRequest } from '../../../../lib/iyzico';
import { APP_CONFIG } from '../../../../lib/config';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token');

    if (!token) {
      return NextResponse.redirect(`${APP_CONFIG.domain}/?status=error&message=token_missing`);
    }

    const result = await iyzicoRequest('/payment/iyzipay/checkoutform/auth/ecom/detail', {
      locale: 'tr',
      token: token
    });

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Ödeme Başarılı - ${APP_CONFIG.appName}</title>
          </head>
          <body style="background:#0c1f14; color:#fff; font-family:sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0;">
            <div style="text-align:center; padding:2rem; background:rgba(255,255,255,0.05); border-radius:24px; border:1px solid rgba(255,255,255,0.1);">
              <h2 style="color:#4ade80;">🎉 Ödemeniz Başarıyla Alındı!</h2>
              <p>${APP_CONFIG.appName} ${APP_CONFIG.subscription.planName} aktif edildi. Yönlendiriliyorsunuz...</p>
            </div>
            <script>
              try {
                let user = JSON.parse(localStorage.getItem('ata_takvimi_user') || '{}');
                const now = new Date();
                const nextYear = new Date(now);
                nextYear.setFullYear(now.getFullYear() + 1);

                user.subscription = {
                  active: true,
                  planName: '${APP_CONFIG.subscription.planName}',
                  licenseCode: 'IYZICO-' + '${result.paymentId || Date.now()}',
                  activatedAt: now.toISOString(),
                  expiresAt: nextYear.toISOString(),
                  isTrial: false
                };
                localStorage.setItem('ata_takvimi_user', JSON.stringify(user));
                window.dispatchEvent(new Event('storage'));
              } catch(e) { console.error(e); }
              setTimeout(() => {
                window.location.href = '${APP_CONFIG.domain}/?payment=success';
              }, 1200);
            </script>
          </body>
        </html>
      `;

      return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    } else {
      const errorMsg = encodeURIComponent(result.errorMessage || 'Ödeme tamamlanamadı.');
      return NextResponse.redirect(`${APP_CONFIG.domain}/?status=error&message=${errorMsg}`);
    }
  } catch (error) {
    console.error('İyzico Callback Error:', error);
    return NextResponse.redirect(`${APP_CONFIG.domain}/?status=error&message=system_error`);
  }
}
