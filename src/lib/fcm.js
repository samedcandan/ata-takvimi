import crypto from 'crypto';

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'ata-takvimi';
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;

// Cache the access token and its expiration
let cachedToken = null;
let tokenExpiry = 0;

/**
 * Generates an OAuth2 access token for Google API using Service Account
 * Zero-dependency RS256 JWT signing with Node.js crypto
 */
async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && now < tokenExpiry - 60) {
    return cachedToken;
  }

  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
    throw new Error('Firebase credentials are not fully configured in env.');
  }

  // Format private key (replace literal \\n if they exist as strings)
  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  // Create JWT Header
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');

  // Create JWT Payload
  const payload = Buffer.from(JSON.stringify({
    iss: FIREBASE_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');

  // Sign JWT
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(privateKey, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  // Request Access Token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to get Google Access Token: ${JSON.stringify(data)}`);
  }

  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in;
  return cachedToken;
}

/**
 * Sends FCM V1 push notification to a specific device token.
 * @param {string} token - FCM device token
 * @param {string} title - Notification title
 * @param {string} body - Notification body text
 * @param {object} data - Additional data payload
 */
export async function sendPushToToken(token, title, body, data = {}) {
  try {
    const accessToken = await getGoogleAccessToken();

    const res = await fetch(`https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        message: {
          token: token,
          notification: { title, body },
          data: data,
        }
      }),
    });

    if (!res.ok) {
      const errJson = await res.json();
      const errorCode = errJson?.error?.details?.[0]?.errorCode || errJson?.error?.status;
      if (errorCode === 'UNREGISTERED' || errorCode === 'INVALID_ARGUMENT') {
        return { success: false, expired: true };
      }
      console.error('FCM send error:', JSON.stringify(errJson));
      return { success: false, expired: false };
    }

    return { success: true };
  } catch (err) {
    console.error('Push bildirim gönderme hatası:', err);
    return { success: false, expired: false };
  }
}

/**
 * Sends push notification to multiple tokens.
 * Automatically removes expired/invalid tokens.
 * @param {string[]} tokens - Array of FCM device tokens
 * @param {string} title - Notification title
 * @param {string} body - Notification body text
 * @param {object} data - Additional data payload
 * @returns {object} - { sent: number, expired: string[] }
 */
export async function sendPushToAll(tokens, title, body, data = {}) {
  if (!tokens || tokens.length === 0) return { sent: 0, expired: [] };

  const results = await Promise.allSettled(
    tokens.map(token => sendPushToToken(token, title, body, data))
  );

  let sent = 0;
  const expiredTokens = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      if (result.value.success) sent++;
      if (result.value.expired) expiredTokens.push(tokens[i]);
    }
  });

  return { sent, expired: expiredTokens };
}
