import { NextResponse } from 'next/server';
import { createCheckoutForm } from '../../../../lib/iyzico';
import { APP_CONFIG } from '../../../../lib/config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userEmail, userName, userPhone, userId, callbackUrl } = body;

    const price = "200.0";
    const conversationId = `ATA-${Date.now()}`;
    const defaultCallback = callbackUrl || `${APP_CONFIG.domain}/api/iyzico/callback`;

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
        ip: "85.105.10.10",
        city: "Konya",
        country: "Turkey"
      },
      shippingAddress: {
        contactName: userName || "Ata Çiftçisi",
        city: "Konya",
        country: "Turkey",
        address: "Anadolu Mah. Tarım Cad. No:1"
      },
      billingAddress: {
        contactName: userName || "Ata Çiftçisi",
        city: "Konya",
        country: "Turkey",
        address: "Anadolu Mah. Tarım Cad. No:1"
      },
      basketItems: [
        {
          id: APP_CONFIG.subscription.basketItemId,
          name: APP_CONFIG.subscription.basketItemName,
          category1: "Yazılım",
          category2: "Abonelik",
          itemType: "VIRTUAL",
          price: price
        }
      ]
    };

    const result = await createCheckoutForm(requestData);

    return NextResponse.json(result);
  } catch (error) {
    console.error('İyzico Checkout Error:', error);
    return NextResponse.json({ status: 'failure', errorMessage: error.message }, { status: 500 });
  }
}
