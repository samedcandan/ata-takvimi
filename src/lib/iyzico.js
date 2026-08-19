import Iyzipay from 'iyzipay';

const API_KEY = process.env.IYZICO_API_KEY || 'ryzh5T3SFuM4EY6Ur4VtglEymNyaQT1K';
const SECRET_KEY = process.env.IYZICO_SECRET_KEY || 'qol0r0cgeuNnNojYYpr4lTJr9qtrd9vg';
const BASE_URL = process.env.IYZICO_BASE_URL || 'https://api.iyzipay.com';

export const iyzipay = new Iyzipay({
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
  uri: BASE_URL
});

export function createCheckoutForm(requestData) {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(requestData, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function retrieveCheckoutForm(token) {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve({ locale: Iyzipay.LOCALE.TR, token: token }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export { Iyzipay };
