import crypto from 'crypto';

const API_KEY = process.env.IYZICO_API_KEY || 'ryzh5T3SFuM4EY6Ur4VtglEymNyaQT1K';
const SECRET_KEY = process.env.IYZICO_SECRET_KEY || 'qol0r0cgeuNnNojYYpr4lTJr9qtrd9vg';
const BASE_URL = process.env.IYZICO_BASE_URL || 'https://api.iyzipay.com';

function generateRandomString(size = 8) {
  return process.hrtime()[0] + Math.random().toString(size).slice(2);
}

function generateAuthorizationHeaderV2(apiKey, secretKey, uri, body, randomString) {
  const payload = randomString + uri + JSON.stringify(body);
  const signature = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
  const authParams = [
    'apiKey:' + apiKey,
    'randomKey:' + randomString,
    'signature:' + signature
  ];
  return 'IYZWSv2 ' + Buffer.from(authParams.join('&')).toString('base64');
}

export async function iyzicoRequest(path, body) {
  const randomString = generateRandomString(8);
  const authHeader = generateAuthorizationHeaderV2(API_KEY, SECRET_KEY, path, body, randomString);

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-iyzi-rnd': randomString,
      'x-iyzi-client-version': 'iyzipay-node-2.0.69',
      'Authorization': authHeader
    },
    body: JSON.stringify(body)
  });

  return res.json();
}

export async function createCheckoutForm(requestData) {
  return iyzicoRequest('/payment/iyzipos/checkoutform/initialize/auth/ecom', requestData);
}

export async function retrieveCheckoutForm(token) {
  return iyzicoRequest('/payment/iyzipos/checkoutform/auth/ecom/detail', {
    locale: 'tr',
    token: token
  });
}
