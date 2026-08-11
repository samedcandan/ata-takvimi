/**
 * Neon PostgreSQL HTTP Query Helper
 * Shared database utility for Ata Takvimi serverless API routes.
 */

const DATABASE_URL = process.env.DATABASE_URL;

export async function query(sql, params = []) {
  if (!DATABASE_URL) {
    console.error('DATABASE_URL not configured');
    return [];
  }

  const neonHost = DATABASE_URL.match(/@([^/]+)\//)?.[1];

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
