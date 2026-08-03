/**
 * Anadolu Halk Takvimi (Kocakarı Takvimi & Geleneksel Tarım Dönemleri)
 * Yıl boyu Anadolu çiftçisinin esas aldığı 365 günlük dönüm noktaları
 */

export const HALK_TAKVIMI_EVENTS = [
  // Ocak
  { month: 1, day: 1, title: "Ocak Ayı ve Kasım Günlerinin Ortası", category: "mevsim", desc: "Kışın en sert dönemi olan Zemheri devam ediyor. Hayvan barınakları sıcak tutulmalı.", icon: "❄️" },
  { month: 1, day: 8, title: "Zemheri Soğukları Zirvesi", category: "hava", desc: "Anadolu'da dondurucu soğukların tavan yaptığı günlerdir. Meyve fidanları dondan korunmalıdır.", icon: "🥶" },
  { month: 1, day: 17, title: "Karakışın Sonu", category: "mevsim", desc: "Karakışın kırıldığı, gündüzlerin uzamasının hissedildiği ilk gün.", icon: "🌤️" },
  { month: 1, day: 31, title: "Hamsin Dönemi Başlangıcı", category: "mevsim", desc: "Kışın ikinci 50 günlük dönemi olan Hamsin başlar (31 Ocak - 21 Mart).", icon: "🏔️" },

  // Şubat
  { month: 2, day: 5, title: "Gücük Ayı Soğukları", category: "hava", desc: "Şubat (Gücük) ayının ilk sert soğukları. 'Gücük ayın soğuğu, dondurur bağ bağbanı.'", icon: "🌬️" },
  { month: 2, day: 14, title: "Gübre Taşıma ve Hazırlık", category: "tarim", desc: "Toprak çözülmeden tarlalara ahır gübresi çekme zamanı.", icon: "🚜" },
  { month: 2, day: 19, title: "1. Cemre Havaya Düştü", category: "cemre", desc: "İlk cemre havaya düşer. Havanın ısınmaya başladığı, kışın kırıldığı müjdelenir.", icon: "🔥" },
  { month: 2, day: 26, title: "2. Cemre Suya Düştü", category: "cemre", desc: "İkinci cemre suya düşer. Suların ısınmaya başladığı, akarsuların buzlarının çözüldüğü gündür.", icon: "💧" },

  // Mart
  { month: 3, day: 5, title: "3. Cemre Toprağa Düştü", category: "cemre", desc: "Üçüncü cemre toprağa düşer. Toprak ısınır, bahar hazırlıkları ve ilk ekimler başlar.", icon: "🌱" },
  { month: 3, day: 11, title: "Kocakarı Soğukları (Berdü'l-Acûz)", category: "hava", desc: "Mart ayının 11-17 günleri arasında yaşanan aldatıcı bahar sonrası son sert soğuklar. Ağaç aşılarına dikkat edilmeli.", icon: "❄️" },
  { month: 3, day: 21, title: "Nevruz (Yaz Günlerinin Başlangıcı)", category: "mevsim", desc: "Gece ile gündüz eşitlenir. Hızır günlerinin habercisidir. Toprak uyanır.", icon: "🌷" },
  { month: 3, day: 26, title: "Çaylak Fırtınası", category: "hava", desc: "Baharın gelişiyle yaşanan rüzgarlı fırtına dönemi.", icon: "💨" },

  // Nisan
  { month: 4, day: 5, title: "Bahar Ekim Dönemi", category: "tarim", desc: "Mısır, ayçiçeği, nohut ve mercimek ekimlerinin hız kazandığı dönem.", icon: "🌾" },
  { month: 4, day: 11, title: "Leyleklerin Gelme Zamanı", category: "doga", desc: "Göçmen kuşların Anadolu'ya varışı. Doğanın tam anlamıyla uyandığı zaman.", icon: "🪶" },
  { month: 4, day: 18, title: "Kuğu Fırtınası", category: "hava", desc: "Nisan ayının ilk yarısındaki ani serinlik fırtınası.", icon: "🌧️" },
  { month: 4, day: 25, title: "Kırkikindi Yağmurları Başlangıcı", category: "hava", desc: "İç ve Doğu Anadolu'da öleden sonraları yağan bereketli bahar yağmurları dönemi.", icon: "🌦️" },

  // Mayıs
  { month: 5, day: 6, title: "Hıdırellez (Hızır Günleri / Yaz Başlangıcı)", category: "mevsim", desc: "Halk takvimine göre Kış biter, Hızır Günleri (Yaz) başlar (6 Mayıs - 7 Kasım). Bereket ve dirlik günüdür.", icon: "☀️" },
  { month: 5, day: 15, title: "Fide Dikim Zamanı", category: "tarim", desc: "Domates, biber, patlıcan ve salatalık fidelerinin açık tarlaya dikimi yapılır.", icon: "🍅" },
  { month: 5, day: 21, title: "Ülker Fırtınası", category: "hava", desc: "Mayıs sonu rüzgarı. Meyve tutumunda ilaçlama aksatılmamalıdır.", icon: "🍃" },

  // Haziran
  { month: 6, day: 3, title: "Filiz Fırtınası", category: "hava", desc: "Bağlarda ve meyve ağaçlarında taze filizlerin çıktığı döneme denk gelen fırtına.", icon: "🌱" },
  { month: 6, day: 12, title: "Ekin Çapa Dönemi", category: "tarim", desc: "Çapa bitkilerinde (Mısır, Ayçiçeği, Pamuk) birinici çapa ve boğaz doldurma zamanı.", icon: "🛠️" },
  { month: 6, day: 21, title: "Yaz Gün Dönümü (En Uzun Gün)", category: "mevsim", desc: "Yazın zirvesi. Tahıl başaklarının sararmaya başladığı gün.", icon: "🌞" },
  { month: 6, day: 28, title: "Yaprak Fırtınası", category: "hava", desc: "Haziran sonu rüzgarı. Ot biçimi ve saman balyalama hız kazanır.", icon: "🚜" },

  // Temmuz
  { month: 7, day: 3, title: "Sam Yeli Soğukları / Sıcakları (Eyyam-ı Bahur)", category: "hava", desc: "Çöl sıcaklarının Anadolu'ya ulaştığı, sulamanın aksatılmaması gereken dönem.", icon: "🔥" },
  { month: 7, day: 10, title: "Orak ve Hasat Başlangıcı", category: "tarim", desc: "Arpa ve buğday biçimi (Orak) zamanı. Yangın riskine karşı dikkatli olunmalı.", icon: "🌾" },
  { month: 7, day: 25, title: "Orta Bağ Çapası", category: "tarim", desc: "Bağlarda ve zeytinliklerde dip temizliği ve sulama günleri.", icon: "🍇" },

  // Ağustos
  { month: 8, day: 1, title: "Ağustos Suyu (Can Suyu)", category: "tarim", desc: "Meyve ağaçlarına ve sebzelere verilen hayati Ağustos sulaması.", icon: "💧" },
  { month: 8, day: 15, title: "Fındık Hasadı ve Zerdali Zamanı", category: "tarim", desc: "Karadeniz'de fındık toplanması, meyve kurutma ve pestil yapımı.", icon: "🌰" },
  { month: 8, day: 23, title: "Leyleklerin Göç Zamanı", category: "doga", desc: "Leyleklerin güneye göç etmeye başladığı gün. Sonbaharın sinyali.", icon: "🪶" },
  { month: 8, day: 31, title: "Miras Rüzgarı", category: "hava", desc: "Ağustos sonu poyrazı. Gece sıcaklıklarının düşmeye başladığı zaman.", icon: "🌬️" },

  // Eylül
  { month: 9, day: 7, title: "Bıldırcın Geçimi Fırtınası", category: "hava", desc: "Sonbaharın ilk hissedilir fırtınası.", icon: "🍂" },
  { month: 9, day: 15, title: "Güz Ekim Hazırlığı", category: "tarim", desc: "Kışlık buğday ve arpa ekimi için tarlaların sürülmesi ve derin pulluk yapılması.", icon: "🚜" },
  { month: 9, day: 23, title: "Sonbahar Ekinoksu", category: "mevsim", desc: "Gece ile gündüz eşitlenir. Sonbahar başlar.", icon: "🍁" },
  { month: 9, day: 28, title: "Bağ Bozumu Zamanı", category: "tarim", desc: "Üzüm toplanması, pekmez ve pestil kaynatma şenlikleri.", icon: "🍇" },

  // Ekim
  { month: 10, day: 4, title: "Koç Katımı Dönemi", category: "hayvancilik", desc: "Küçükbaş hayvancılıkta sürünün baharda yavrulaması için koç katımı şenlikleri yapılır.", icon: "🐑" },
  { month: 10, day: 15, title: "Güzlük Ekim Zamanı", category: "tarim", desc: "Kışlık buğday ve arpa tohumlarının toprağa verilmesi.", icon: "🌾" },
  { month: 10, day: 21, title: "Bağ Sökümü ve Ağaç Dikimi", category: "tarim", desc: "Fidan dikimi ve ağaçların kışa hazırlanması.", icon: "🌳" },
  { month: 10, day: 28, title: "Zeytin Hasadı Başlangıcı", category: "tarim", desc: "Ege ve Marmara'da zeytin toplama ve yağ sıkım zamanı.", icon: "🫒" },

  // Kasım
  { month: 11, day: 8, title: "Kasım Günleri (Kış Başlangıcı)", category: "mevsim", desc: "Halk takvimine göre Hızır günleri biter, Kasım günleri (Kış) başlar (8 Kasım - 5 Mayıs). 180 günlük kış dönemi.", icon: "❄️" },
  { month: 11, day: 12, title: "Pastırma Yazı", category: "hava", desc: "Kasım ortasında yaşanan 5-10 günlük sıcak, güneşli ve açık havalar. Pastırma kurutma ve kışlık hazırlık zamanıdır.", icon: "🌤️" },
  { month: 11, day: 25, title: "Pastırma Yazının Sonu ve İlk Donlar", category: "hava", desc: "Pastırma yazının bitmesiyle gece donlarının görülmeye başladığı günler.", icon: "🧊" },

  // Aralık
  { month: 12, day: 6, title: "Kışlık Bakım ve Ahır Dönemi", category: "hayvancilik", desc: "Büyükbaş ve küçükbaş hayvanların meralardan tamamen ahırlara çekilmesi.", icon: "🐄" },
  { month: 12, day: 15, title: "Kış Budaması", category: "tarim", desc: "Yaprağını döken meyve ağaçlarında kış budaması ve dinamit çukuru açımı.", icon: "✂️" },
  { month: 12, day: 22, title: "Kış Gün Dönümü ve Zemheri Başlangıcı", category: "mevsim", desc: "En uzun gece. Karakış (Zemheri) soğuklarının başladığı gün (22 Aralık - 30 Ocak). Toprak kış uykusuna yatar.", icon: "🌌" }
];

export const DAILY_TARIM_PROVERBS = [
  "Mart kapıdan baktırır, kazma kürek yaktırır.",
  "Şubatın uğursuzu Martın başında gelir.",
  "Ekimde ekilen ekin, ekmek olur.",
  "Nisan yağar sap olur, Mayıs yağar çep olur.",
  "Bağ babadan kalmalı, bahçe dededen.",
  "Kasım iki, yaz iki; sonra gelse ne ki?",
  "Zemheride su içenin içi yanar, tarlayı sürenin yüzü güler.",
  "Ay büyürken ekilen tohum başağa durur, küçülürken yapılan budama meyve verir.",
  "Tarlada izi olmayanın harmanda yüzü olmaz.",
  "Yağmur getiren rüzgar, çiftçinin dostudur."
];
