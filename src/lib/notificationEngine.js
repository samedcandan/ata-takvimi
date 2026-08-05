import { HALK_TAKVIMI_EVENTS } from '../data/halk-takvimi';
import { getMoonPhase } from './moonCalc';

export const DEFAULT_NOTIFICATION_PREFS = {
  enabled: true,
  moon: true,          // Ay Evreleri & Ekim Uyarıları
  halk: true,          // Anadolu Halk & Kocakarı Takvimi
  weather: true,       // 81 İl Zirai Hava & Don Uyarısı
  personalNotes: true, // Kişisel Bitki Ajandası & Notlarım
};

export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (e) {
    console.error('Notification permission error:', e);
    return 'denied';
  }
}

export function sendBrowserNotification(title, body, url = '/', icon = '/icon-192.png') {
  if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body: body,
          icon: icon,
          badge: icon,
          data: { url: url }
        });
      });
    } else {
      new Notification(title, {
        body: body,
        icon: icon,
        data: { url: url }
      });
    }
    return true;
  } catch (err) {
    console.error('Failed to send browser notification:', err);
    return false;
  }
}

export function checkAndTriggerDailyNotifications(prefs = DEFAULT_NOTIFICATION_PREFS, selectedCity = "Konya", userNotes = []) {
  if (typeof window === 'undefined' || !prefs || !prefs.enabled || Notification.permission !== 'granted') {
    return;
  }

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const cacheKey = `ata_sent_notifs_${todayStr}`;

  let sentNotifs = {};
  try {
    sentNotifs = JSON.parse(localStorage.getItem(cacheKey) || '{}');
  } catch (e) {}

  // 1. Ay Evreleri Bildirimi (Kategori: moon)
  if (prefs.moon && !sentNotifs.moon) {
    const moonPhase = getMoonPhase(now);
    if (moonPhase.isDarkMoon) {
      sendBrowserNotification(
        '🌙 Karanlık Ay Evresi (Nadas Dönemi)',
        'Yeni Ay öncesi 3 günlük nadas dönemi! Toprağa tohum ekilmez, budama ve nadas yapılır.',
        '/takvim'
      );
      sentNotifs.moon = true;
    } else if (moonPhase.percentage < 5) {
      sendBrowserNotification(
        '🌙 Yeni Ay Doğuyor — Tohum Ekim Başlangıcı',
        'Toprağın bereketi artıyor! Yapraklı ve üst meyve veren ürünleri ekmek için ideal gün.',
        '/takvim'
      );
      sentNotifs.moon = true;
    } else if (moonPhase.isFullMoon) {
      sendBrowserNotification(
        '🌕 Dolunay Evresi — Hasat Zamanı',
        'Dolunay ışığı altında bitkilerde özsuyu zirve yapar! Hasat ve meyve toplamak için en verimli gün.',
        '/takvim'
      );
      sentNotifs.moon = true;
    }
  }

  // 2. Anadolu Halk Takvimi Bildirimi (Kategori: halk)
  if (prefs.halk && !sentNotifs.halk) {
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const todayEvent = HALK_TAKVIMI_EVENTS.find(e => e.month === month && e.day === day);

    if (todayEvent) {
      sendBrowserNotification(
        `🌾 Bugün: ${todayEvent.title}`,
        `${todayEvent.desc || todayEvent.description || ''}`,
        '/'
      );
      sentNotifs.halk = true;
    }
  }

  // 3. Kişisel Not & Ajanda Bildirimi (Kategori: personalNotes)
  if (prefs.personalNotes && !sentNotifs.personalNotes && userNotes && userNotes.length > 0) {
    const todayNotes = userNotes.filter(n => n.date === todayStr || n.reminderDate === todayStr);
    if (todayNotes.length > 0) {
      const noteTitle = todayNotes[0].cropName ? `${todayNotes[0].cropName} Notunuz Var!` : 'Bugünkü Tarla Notunuz';
      sendBrowserNotification(
        `📓 ${noteTitle}`,
        `${todayNotes[0].notes || 'Tarlanızla ilgili hatırlatıcınız var.'}`,
        '/tarlam'
      );
      sentNotifs.personalNotes = true;
    }
  }

  // Cache sent notifications for today
  try {
    localStorage.setItem(cacheKey, JSON.stringify(sentNotifs));
  } catch (e) {}
}
