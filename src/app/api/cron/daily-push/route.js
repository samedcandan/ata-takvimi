import { NextResponse } from 'next/server';

/**
 * GET /api/cron/daily-push — Vercel Cron triggered daily push notifications
 * Protected by CRON_SECRET header (Vercel automatically sends this)
 * Triggers at 07:00 Turkey time (04:00 UTC) every day
 */
export async function GET(request) {
  // Verify cron secret (Vercel sends Authorization header for cron jobs)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Call push-send API internally
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://atatakvimi.karneyn.com';

    const response = await fetch(`${baseUrl}/api/push-send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.ADMIN_SECRET || 'karneyn_admin_2024',
        type: 'daily'
      }),
    });

    const result = await response.json();

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (error) {
    console.error('Cron daily-push error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
