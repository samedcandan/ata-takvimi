/**
 * Accurate Astronomical Lunar Phase Calculator and Agricultural Guidance Motor
 * Based on Jean Meeus Astronomical Algorithms
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

  // Illumination percentage (0 to 100%)
  const illumination = Math.round((1 - Math.cos((lunarAge / synodicMonth) * 2 * Math.PI)) * 50);

  // Growing phase (Northern Hemisphere: 0 to 14.765 days is growing)
  const isGrowing = lunarAge < (synodicMonth / 2);

  // Phase Name and Symbol Determination
  let phaseName = "";
  let symbol = "";
  let agricultureAdvice = "";

  if (lunarAge < 1.84566 || lunarAge >= 27.68493) {
    phaseName = "Yeniay";
    symbol = "🌑";
    agricultureAdvice = "Toprak nadas ve temizliği için ideal zaman. Ekim yapılmaz, fideler dinlendirilir.";
  } else if (lunarAge < 5.53699) {
    phaseName = "Hilal (Büyüyen Ay)";
    symbol = "🌒";
    agricultureAdvice = "Toprak üstü ürünlerin (marul, ıspanak, lahana, tahıllar) ekimi ve fide dikimi için çok verimli dönemdir.";
  } else if (lunarAge < 9.22831) {
    phaseName = "İlk Dördün";
    symbol = "🌓";
    agricultureAdvice = "Yapraklı bitkilerin ekimi ve meyve ağaçlarının aşılanması için ideal safhadır.";
  } else if (lunarAge < 12.91963) {
    phaseName = "Büyüyen Şişkinay";
    symbol = "🌔";
    agricultureAdvice = "Meyveli sebzelerin (domates, biber, salatalık) ekim ve sulama işlemlerine devam edilir.";
  } else if (lunarAge < 16.61096) {
    phaseName = "Dolunay";
    symbol = "🌕";
    agricultureAdvice = "Bitki özsuyunun en tepe noktada olduğu zamandır. Tıbbi ve aromatik bitki hasadı yapılır. Şartlar elveriyorsa sulama yapılır.";
  } else if (lunarAge < 20.30228) {
    phaseName = "Küçülen Şişkinay";
    symbol = "🌖";
    agricultureAdvice = "Toprak altı kök ürünlerinin (patates, havuç, soğan, sarımsak, turp) ekimi ve dökümü yapılır.";
  } else if (lunarAge < 23.99361) {
    phaseName = "Son Dördün";
    symbol = "🌗";
    agricultureAdvice = "Budama, çapa, yabani ot temizliği ve organik gübreleme için mükemmel bir dönemdir.";
  } else {
    phaseName = "Küçülen Hilal (Eskiay)";
    symbol = "🌘";
    agricultureAdvice = "Ağaç budamaları, kereste kesimi ve zararlılarla mücadele için tavsiye edilir.";
  }

  return {
    lunarAge: Math.round(lunarAge * 10) / 10,
    illumination,
    phaseName,
    symbol,
    isGrowing,
    agricultureAdvice,
  };
}

/**
 * Calculates key astronomical lunar milestone events for a given period
 * (Yeni Ay Başlangıcı, Dolunay, Karanlık Ay Başlangıcı)
 */
export function getLunarMilestoneEvents(startDate = new Date(), daysCount = 365) {
  const events = [];
  let prevPhase = null;

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const curr = getMoonPhase(d);

    if (prevPhase) {
      // 1. Yeni Ay Başlangıcı (New Moon start: lunarAge wrapped)
      if (prevPhase.lunarAge > 26 && curr.lunarAge < 3) {
        events.push({
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear(),
          title: "Yeni Ay Başlangıcı (Hilal Doğumu)",
          category: "ay",
          desc: "Büyüyen Ay safhası başlar. Toprak üstü meyve ve yapraklı bitkilerin (domates, biber, marul, tahıl) ekim, dikim ve aşı zamanı.",
          icon: "🌒",
          isLunar: true,
          illumination: 10,
          isGrowing: true
        });
      }
      // 2. Dolunay (Full Moon: lunarAge crosses ~14.76)
      else if (prevPhase.lunarAge < 14.76 && curr.lunarAge >= 14.76) {
        events.push({
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear(),
          title: "Dolunay (Ayın Zirve Safhası)",
          category: "ay",
          desc: "Bitki özsuyunun tepe noktada olduğu şifalı gün. Tıbbi aromatik bitki, meyve ve sebze hasadı için en verimli zamandır.",
          icon: "🌕",
          isLunar: true,
          illumination: 100,
          isGrowing: false
        });
      }
      // 3. Karanlık Ay Başlangıcı (Dark Moon start: lunarAge crosses ~26.5)
      else if (prevPhase.lunarAge < 26.5 && curr.lunarAge >= 26.5) {
        events.push({
          month: d.getMonth() + 1,
          day: d.getDate(),
          year: d.getFullYear(),
          title: "Karanlık Ay Başlangıcı (Eskiay / Nadas)",
          category: "ay",
          desc: "Ayın gökyüzünde görünmez olduğu karanlık dönem. Toprak nadasa bırakılır; tohum ekilmez. Ağaç budaması, kereste kesimi ve zararlılarla mücadele edilir.",
          icon: "🌘",
          isLunar: true,
          illumination: 2,
          isGrowing: false
        });
      }
    }

    prevPhase = curr;
  }

  return events;
}
