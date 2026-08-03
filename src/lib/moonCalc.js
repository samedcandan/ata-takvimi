/**
 * Accurate Lunar Phase Calculator and Agricultural Guidance Motor
 */

export function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian date calculation
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (y + 4716));
  const f = Math.floor(30.6001 * (m + 1));
  const julianDate = c + day + e + f - 1524.5;

  // Known new moon reference: Jan 11, 2024 (Julian Date: 2460320.9)
  const knownNewMoon = 2460320.9;
  const synodicMonth = 29.53058867; // Synodic month length in days

  const daysSinceNewMoon = (julianDate - knownNewMoon) % synodicMonth;
  const lunarAge = daysSinceNewMoon < 0 ? daysSinceNewMoon + synodicMonth : daysSinceNewMoon;

  // Illumination percentage (0 to 100)
  const illumination = Math.round((1 - Math.cos((lunarAge / synodicMonth) * 2 * Math.PI)) * 50);

  // Phase Name and Symbol Determination
  let phaseName = "";
  let symbol = "";
  let isGrowing = false;
  let agricultureAdvice = "";

  if (lunarAge < 1.84566) {
    phaseName = "Yeniay";
    symbol = "🌑";
    isGrowing = true;
    agricultureAdvice = "Toprak nadas ve temizliği için ideal zaman. Ekim yapılmaz, fideler dinlendirilir.";
  } else if (lunarAge < 5.53699) {
    phaseName = "Hilal (Büyüyen Ay)";
    symbol = "🌒";
    isGrowing = true;
    agricultureAdvice = "Toprak üstü ürünlerin (marul, ıspanak, lahana, tahıllar) ekimi ve fide dikimi için çok verimli dönemdir.";
  } else if (lunarAge < 9.22831) {
    phaseName = "İlk Dördün";
    symbol = "🌓";
    isGrowing = true;
    agricultureAdvice = "Yapraklı bitkilerin ekimi ve meyve ağaçlarının aşılanması için ideal safhadır.";
  } else if (lunarAge < 12.91963) {
    phaseName = "Büyüyen Şişkinay";
    symbol = "🌔";
    isGrowing = true;
    agricultureAdvice = "Meyveli sebzelerin (domates, biber, salatalık) ekim ve sulama işlemlerine devam edilir.";
  } else if (lunarAge < 16.61096) {
    phaseName = "Dolunay";
    symbol = "🌕";
    isGrowing = false;
    agricultureAdvice = "Bitki özsuyunun en tepe noktada olduğu zamandır. Tıbbi ve aromatik bitki hasadı yapılır. Şartlar elveriyorsa sulama yapılır.";
  } else if (lunarAge < 20.30228) {
    phaseName = "Küçülen Şişkinay";
    symbol = "🌖";
    isGrowing = false;
    agricultureAdvice = "Toprak altı kök ürünlerinin (patates, havuç, soğan, sarımsak, turp) ekimi ve dökümü yapılır.";
  } else if (lunarAge < 23.99361) {
    phaseName = "Son Dördün";
    symbol = "🌗";
    isGrowing = false;
    agricultureAdvice = "Budama, çapa, yabani ot temizliği ve organik gübreleme için mükemmel bir dönemdir.";
  } else if (lunarAge < 27.68493) {
    phaseName = "Küçülen Hilal";
    symbol = "🌘";
    isGrowing = false;
    agricultureAdvice = "Ağaç budamaları, kereste kesimi ve zararlılarla mücadele için tavsiye edilir.";
  } else {
    phaseName = "Yeniay Yaklaşımı";
    symbol = "🌑";
    isGrowing = true;
    agricultureAdvice = "Toprak sürümü ve gübreleme hazırlanır.";
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
