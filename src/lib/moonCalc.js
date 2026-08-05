/**
 * Accurate Astronomical Lunar Phase Calculator and Agricultural Guidance Motor
 * Based on Jean Meeus Astronomical Algorithms and Anadolu Traditional Farming Rules
 */

export function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based
  const day = date.getDate();

  // Julian Date calculation at 12:00 UTC
  const utcDate = Date.UTC(year, month, day, 12, 0, 0);
  const julianDate = (utcDate / 86400000) + 2440587.5;

  // Known New Moon reference: Jan 11, 2024 at 11:57 UTC (JD: 2460320.9979)
  const knownNewMoon = 2460320.9979;
  const synodicMonth = 29.53058867; // Synodic month in days

  let daysSinceNewMoon = (julianDate - knownNewMoon) % synodicMonth;
  if (daysSinceNewMoon < 0) {
    daysSinceNewMoon += synodicMonth;
  }
  const lunarAge = daysSinceNewMoon;

  // Linear Phase Ratio (0.0 = New Moon, 0.5 = Full Moon, 1.0 = New Moon)
  const phaseRatio = lunarAge / synodicMonth;

  // Linear Illumination Percentage for crisp visual daily progression (0% to 100%)
  const linearIllumination = phaseRatio <= 0.5 
    ? Math.round(phaseRatio * 200) 
    : Math.round((1 - phaseRatio) * 200);

  // Astronomical Sine Illumination for text percentage
  const astronomicalIllumination = Math.round((1 - Math.cos(phaseRatio * 2 * Math.PI)) * 50);

  // Growing phase (0 to 14.765 days is growing in Northern Hemisphere)
  const isGrowing = lunarAge < (synodicMonth / 2);

  let phaseName = "";
  let symbol = "";
  let agricultureAdvice = "";

  if (lunarAge >= 26.53 || lunarAge < 0.8) {
    phaseName = "Karanlık Ay (Nadas / Eskiay)";
    symbol = "🌑";
    agricultureAdvice = "Yeni Ay aydınlığı başlamadan önceki 3 günlük karanlık evre. Toprak nadasa bırakılır; ekim yapılmaz. Ağaç budaması, kereste kesimi ve zararlılarla mücadele zamanıdır.";
  } else if (lunarAge < 5.53699) {
    phaseName = "Yeni Ay (Aydınlık Başlangıcı)";
    symbol = "🌒";
    agricultureAdvice = "Aydınlık sürecini başlatan Yeni Ay evresi. Büyüyen Ay safhası başlar. Toprak üstü ürünlerin (marul, domates, biber, tahıllar) ekimi ve fide dikimi zamanıdır.";
  } else if (lunarAge < 9.22831) {
    phaseName = "İlk Dördün";
    symbol = "🌓";
    agricultureAdvice = "Yapraklı bitkilerin ekimi ve meyve ağaçlarının aşılanması için ideal safhadır.";
  } else if (lunarAge < 13.8) {
    phaseName = "Büyüyen Şişkinay";
    symbol = "🌔";
    agricultureAdvice = "Meyveli sebzelerin (domates, biber, salatalık) ekim ve sulama işlemlerine devam edilir.";
  } else if (lunarAge < 15.7) {
    phaseName = "Dolunay (Tam Aydınlık)";
    symbol = "🌕";
    agricultureAdvice = "Ayın %100 tam aydınlık evresidir. Bitki özsuyunun en tepe noktada olduğu zamandır. Tıbbi aromatik bitki, meyve ve sebze hasadı yapılır.";
  } else if (lunarAge < 20.30228) {
    phaseName = "Küçülen Şişkinay";
    symbol = "🌖";
    agricultureAdvice = "Toprak altı kök ürünlerinin (patates, havuç, soğan, sarımsak, turp) ekimi ve dökümü yapılır.";
  } else if (lunarAge < 23.99361) {
    phaseName = "Son Dördün";
    symbol = "🌗";
    agricultureAdvice = "Budama, çapa, yabani ot temizliği ve organik gübreleme için mükemmel bir dönemdir.";
  } else {
    phaseName = "Küçülen Hilal";
    symbol = "🌘";
    agricultureAdvice = "Ağaç budamaları, kereste kesimi ve zararlılarla mücadele için tavsiye edilir.";
  }

  return {
    lunarAge: Math.round(lunarAge * 10) / 10,
    illumination: astronomicalIllumination,
    linearIllumination,
    phaseRatio,
    phaseName,
    symbol,
    isGrowing,
    agricultureAdvice,
  };
}

/**
 * Calculates key astronomical lunar milestone events for Takvim Akışı
 */
export function getLunarMilestoneEvents(startDate = new Date(), daysCount = 365) {
  const events = [];
  let prevPhase = null;

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const curr = getMoonPhase(d);

    if (prevPhase) {
      // 1. Yeni Ay Başlangıcı (Aydınlık sürecini başlatır)
      if (prevPhase.lunarAge > 26 && curr.lunarAge < 3) {
        events.push({
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear(),
          title: "Yeni Ay (Aydınlık Süreci Başlangıcı)",
          category: "ay",
          desc: "Aydınlık sürecini başlatan Yeni Ay evresi. Büyüyen Ay safhası başlar. Toprak üstü meyve ve yapraklı bitkilerin (domates, biber, marul, tahıl) ekim, dikim ve aşı dönemi.",
          icon: "🌒",
          isLunar: true,
          illumination: 8,
          linearIllumination: 8,
          isGrowing: true
        });
      }
      // 2. Dolunay (Tam Aydınlık)
      else if (prevPhase.lunarAge < 14.76 && curr.lunarAge >= 14.76) {
        events.push({
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear(),
          title: "Dolunay (Tam Aydınlık)",
          category: "ay",
          desc: "Ayın %100 tam aydınlık zirve noktasıdır. Bitki özsuyunun tepe noktada olduğu şifalı gün. Tıbbi aromatik bitki, meyve ve sebze hasadı yapılır.",
          icon: "🌕",
          isLunar: true,
          illumination: 100,
          linearIllumination: 100,
          isGrowing: false
        });
      }
      // 3. Karanlık Ay Başlangıcı (Aydınlık başlamadan önceki 3 gün)
      else if (prevPhase.lunarAge < 26.53 && curr.lunarAge >= 26.53) {
        events.push({
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear(),
          title: "Karanlık Ay Başlangıcı (Nadas Dönemi - 3 Gün)",
          category: "ay",
          desc: "Yeni Ay aydınlığı başlamadan önceki 3 günlük karanlık evre. Toprak nadasa bırakılır; tohum ekilmez. Ağaç budaması, kereste kesimi ve zararlılarla mücadele edilir.",
          icon: "🌑",
          isLunar: true,
          illumination: 0,
          linearIllumination: 0,
          isGrowing: false
        });
      }
    }

    prevPhase = curr;
  }

  return events;
}
