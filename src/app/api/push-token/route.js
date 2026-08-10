import { NextResponse } from 'next/server';

/**
 * Push Token Storage — Neon PostgreSQL
 * Uses the shared Neon database with a simple ata_push_tokens table.
 * Tokens are stored with device fingerprint to avoid duplicates.
 */

const DATABASE_URL = process.env.DATABASE_URL;

async function query(sql, params = []) {
  if (!DATABASE_URL) {
    console.error('DATABASE_URL not configured');
    return [];
  }

  // Use Neon serverless HTTP driver
  const url = DATABASE_URL.replace('postgresql://', 'https://').replace(/\/[^?]+/, '/sql');
  
  // Fallback: direct pg query via fetch to Neon HTTP endpoint
  const neonHost = DATABASE_URL.match(/@([^/]+)\//)?.[1];
  const neonDb = DATABASE_URL.match(/\/([^?]+)/)?.[1];
  const neonUser = DATABASE_URL.match(/\/\/([^:]+):/)?.[1];
  const neonPass = DATABASE_URL.match(/:([^@]+)@/)?.[1];

  const res = await fetch(`https://${neonHost}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': DATABASE_URL,
    },
    body: JSON.stringify({ query: sql, params }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Neon query failed: ${text}`);
  }

  const data = await res.json();
  return data.rows || [];
}

// Ensure table exists (runs once on cold start)
let tableChecked = false;
async function ensureTable() {
  if (tableChecked) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS ata_push_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        device_info TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    tableChecked = true;
  } catch (e) {
    console.error('Failed to create ata_push_tokens table:', e);
  }
}

/**
 * POST /api/push-token — Register a new FCM push token
 * Body: { token: string, deviceInfo?: string }
 */
export async function POST(request) {
  try {
    const { token, deviceInfo } = await request.json();

    if (!token || typeof token !== 'string' || token.length < 10) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    await ensureTable();

    // Upsert: insert or ignore on conflict
    await query(
      `INSERT INTO ata_push_tokens (token, device_info) 
       VALUES ($1, $2) 
       ON CONFLICT (token) DO UPDATE SET device_info = $2, created_at = NOW()`,
      [token, deviceInfo || '']
    );

    return NextResponse.json({ success: true, registered: true });
  } catch (error) {
    console.error('Push token kayıt hatası:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/push-token — Remove a push token (logout / unregister)
 * Body: { token: string }
 */
export async function DELETE(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 400 });
    }

    await ensureTable();
    await query('DELETE FROM ata_push_tokens WHERE token = $1', [token]);

    return NextResponse.json({ success: true, removed: true });
  } catch (error) {
    console.error('Push token silme hatası:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * GET /api/push-token — Get all registered tokens (admin only)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== (process.env.ADMIN_SECRET || 'karneyn_admin_2024')) {
      return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
    }

    await ensureTable();
    const rows = await query('SELECT token, device_info, created_at FROM ata_push_tokens ORDER BY created_at DESC');

    return NextResponse.json({ tokens: rows, count: rows.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
