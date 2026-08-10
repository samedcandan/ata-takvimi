'use client';
import { useEffect } from 'react';

/**
 * Mobil ortamda (Capacitor native) FCM push notification izinlerini yöneten
 * ve token'ı backend'e kaydeden hook.
 * 
 * Web ortamında hiçbir şey yapmaz (Capacitor kontrolü).
 * Aysa Moda'daki kanıtlanmış implementasyondan adapte edildi.
 */
export function usePushNotifications() {
  useEffect(() => {
    // Sadece native platform (Android/iOS) için çalışır
    if (typeof window === 'undefined' || !window.Capacitor?.isNativePlatform?.()) return;

    const initPush = async () => {
      try {
        const { PushNotifications } = await import('@capacitor/push-notifications');

        // İzin kontrolü
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }
        if (permStatus.receive !== 'granted') return;

        // FCM'e kayıt ol
        await PushNotifications.register();

        // Token alındığında backend'e gönder
        await PushNotifications.addListener('registration', async (token) => {
          try {
            await fetch('/api/push-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                token: token.value,
                deviceInfo: navigator.userAgent || 'unknown'
              }),
            });
            console.log('✅ FCM token registered:', token.value.substring(0, 20) + '...');
          } catch (e) {
            console.error('FCM token kayıt hatası:', e);
          }
        });

        // Token alma hatası
        await PushNotifications.addListener('registrationError', (error) => {
          console.error('FCM registration error:', error);
        });

        // Uygulama açıkken gelen bildirimler
        await PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('📩 Push notification received:', notification);
        });

        // Bildirime tıklandığında yönlendirme
        await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
          const data = action.notification.data;
          if (data?.url) {
            window.location.href = data.url;
          } else if (data?.type === 'moon') {
            window.location.href = '/takvim';
          } else if (data?.type === 'halk') {
            window.location.href = '/';
          } else {
            window.location.href = '/';
          }
        });

      } catch (e) {
        console.error('Push notification başlatma hatası:', e);
      }
    };

    initPush();
  }, []);
}
