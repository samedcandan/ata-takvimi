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
  if (
    typeof window === 'undefined' || 
    !('Notification' in window) || 
    typeof Notification === 'undefined' || 
    Notification.permission !== 'granted'
  ) {
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

export async function checkAndTriggerDailyNotifications(prefs = DEFAULT_NOTIFICATION_PREFS, selectedCity = "Konya", userNotes = []) {
  if (
    typeof window === 'undefined' || 
    !prefs || 
    !prefs.enabled || 
    !('Notification' in window) || 
    typeof Notification === 'undefined' || 
    Notification.permission !== 'granted'
  ) {
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
        '🌑 Karanlık Ay Evresi (Nadas Dönemi)',
        `Yeni Ay öncesi nadas dönemi! Toprağa tohum ekilmez, budama ve nadas yapılır. Aydınlık: %${moonPhase.illumination}`,
        '/takvim'
      );
      sentNotifs.moon = true;
    } else if (moonPhase.isNewMoon) {
      sendBrowserNotification(
        '🌒 Yeni Ay Doğuyor — Tohum Ekim Başlangıcı',
        `Toprağın bereketi artıyor! Yapraklı ve üst meyve veren ürünleri ekmek için ideal gün. Aydınlık: %${moonPhase.illumination}`,
        '/takvim'
      );
      sentNotifs.moon = true;
    } else if (moonPhase.isFullMoon) {
      sendBrowserNotification(
        '🌕 Dolunay Evresi — Hasat Zamanı',
        `Dolunay ışığı altında bitkilerde özsuyu zirve yapar! Hasat ve meyve toplamak için en verimli gün. Aydınlık: %${moonPhase.illumination}`,
        '/takvim'
      );
      sentNotifs.moon = true;
    } else if (moonPhase.phaseName === 'İlk Dördün') {
      sendBrowserNotification(
        '🌓 İlk Dördün — Yaprak & Aşı Dönemi',
        `Yapraklı bitki ekimi ve meyve ağacı aşılaması için ideal safha. Aydınlık: %${moonPhase.illumination}`,
        '/takvim'
      );
      sentNotifs.moon = true;
    } else if (moonPhase.phaseName === 'Son Dördün') {
      sendBrowserNotification(
        '🌗 Son Dördün — Budama & Gübreleme',
        `Budama, çapa, yabani ot temizliği ve organik gübreleme için mükemmel dönem. Aydınlık: %${moonPhase.illumination}`,
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

  // 3. 81 İl Zirai Hava & Don Uyarısı (Kategori: weather)
  if (prefs.weather && !sentNotifs.weather) {
    try {
      const { CITY_COORDS } = await import('../components/WeatherCard');
      const coords = CITY_COORDS[selectedCity];
      if (coords) {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,weathercode&timezone=Europe/Istanbul&forecast_days=1`
        );
        if (weatherRes.ok) {
          const weatherData = await weatherRes.json();
          const daily = weatherData.daily;
          if (daily) {
            const minTemp = daily.temperature_2m_min?.[0];
            const maxTemp = daily.temperature_2m_max?.[0];
            const precip = daily.precipitation_sum?.[0];
            const code = daily.weathercode?.[0];

            // Don riski (≤2°C)
            if (minTemp !== null && minTemp <= 2) {
              sendBrowserNotification(
                `🥶 Don Uyarısı — ${selectedCity}`,
                `Bugün en düşük sıcaklık ${minTemp}°C! Bitkilerinizi dondan koruyun, sera ve örtü hazırlığı yapın.`,
                '/'
              );
              sentNotifs.weather = true;
            }
            // Aşırı sıcak (≥38°C)
            else if (maxTemp !== null && maxTemp >= 38) {
              sendBrowserNotification(
                `🔥 Aşırı Sıcak Uyarısı — ${selectedCity}`,
                `Bugün en yüksek sıcaklık ${maxTemp}°C! Sulamayı sabah erken veya akşam geç saatlerde yapın.`,
                '/'
              );
              sentNotifs.weather = true;
            }
            // Yoğun yağış (>10mm)
            else if (precip !== null && precip > 10) {
              sendBrowserNotification(
                `🌧️ Yoğun Yağış Uyarısı — ${selectedCity}`,
                `Bugün ${precip}mm yağış bekleniyor! Hasadı erkene alın, drenaj kanallarını kontrol edin.`,
                '/'
              );
              sentNotifs.weather = true;
            }
            // Fırtına kodu (95-99 thunderstorm)
            else if (code !== null && code >= 95) {
              sendBrowserNotification(
                `⛈️ Fırtına Uyarısı — ${selectedCity}`,
                `Bugün şiddetli fırtına bekleniyor! Sera ve tarla örtülerini sabitleyin.`,
                '/'
              );
              sentNotifs.weather = true;
            }
          }
        }
      }
    } catch (e) {
      console.error('Weather notification error:', e);
    }
  }

  // 4. Kişisel Not & Ajanda Bildirimi (Kategori: personalNotes)
  if (prefs.personalNotes && !sentNotifs.personalNotes && userNotes && userNotes.length > 0) {
    const todayNotes = userNotes.filter(n => n.date === todayStr || n.reminderDate === todayStr || n.sowingDate === todayStr);
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
