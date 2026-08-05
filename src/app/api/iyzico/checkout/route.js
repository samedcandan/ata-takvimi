import { NextResponse } from 'next/server';
import { iyzicoRequest } from '../../../../lib/iyzico';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userEmail, userName, userPhone, userId, callbackUrl } = body;

    const price = "300.00";
    const conversationId = `ATA-${Date.now()}`;
    const defaultCallback = callbackUrl || "https://atatakvimi.karneyn.com/api/iyzico/callback";

    const requestData = {
      locale: "tr",
      conversationId: conversationId,
      price: price,
      paidPrice: price,
      currency: "TRY",
      basketId: `BASKET-${userId || Date.now()}`,
      paymentGroup: "SUBSCRIPTION",
      callbackUrl: defaultCallback,
      enabledInstallments: [1],
      buyer: {
        id: userId || `USER-${Date.now()}`,
        name: userName ? userName.split(' ')[0] : "Ata",
        surname: userName && userName.split(' ').length > 1 ? userName.split(' ').slice(1).join(' ') : "Çiftçisi",
        gsmNumber: userPhone || "+905555555555",
        email: userEmail || "ciftci@karneyn.com",
        identityNumber: "11111111110",
        registrationAddress: "Anadolu Mah. Tarım Cad. No:1",
        ip: "127.0.0.1",
        city: "Istanbul",
        country: "Turkey"
      },
      shippingAddress: {
        contactName: userName || "Ata Çiftçisi",
        city: "Istanbul",
        country: "Turkey",
        address: "Anadolu Mah. Tarım Cad. No:1"
      },
      billingAddress: {
        contactName: userName || "Ata Çiftçisi",
        city: "Istanbul",
        country: "Turkey",
        address: "Anadolu Mah. Tarım Cad. No:1"
      },
      basketItems: [
        {
          id: "ATA-SUB-YEARLY-300",
          name: "Ata Takvimi Yıllık Çiftçi Aboneliği",
          category1: "Yazılım",
          category2: "Abonelik",
          itemType: "VIRTUAL",
          price: price
        }
      ]
    };

    const result = await iyzicoRequest('/payment/iyzipay/checkoutform/initialize/auth/ecom', requestData);

    return NextResponse.json(result);
  } catch (error) {
    console.error('İyzico Checkout Error:', error);
    return NextResponse.json({ status: 'failure', errorMessage: error.message }, { status: 500 });
  }
}
