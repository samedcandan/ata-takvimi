const path = require('path');
const fs = require('fs');

const sharp = require(path.resolve(__dirname, '../../su-aritma-crm/node_modules/sharp'));

const inputImagePath = 'C:/Users/hp/.gemini/antigravity-ide/brain/96cb814d-ea7d-4daf-bb34-65c1addfe494/.user_uploaded/media_1787137247688.jpg';
const outputDir = path.resolve(__dirname, '../public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const ICONS_MAP = [
  // Row 1 (Nav & System - y: 0 to 170)
  { key: 'nav-calendar', label: 'Ajanda / Takvim' },
  { key: 'nav-sprout', label: 'Ekim Rehberi' },
  { key: 'nav-journal', label: 'Tarla Defteri' },
  { key: 'nav-bell', label: 'Bildirim Zili' },
  { key: 'nav-location', label: 'Konum / Şehir' },

  // Row 2 (Cemre & Spring - y: 171 to 341)
  { key: 'cemre-air', label: '1. Cemre Havaya (Alev)' },
  { key: 'cemre-water', label: '2. Cemre Suya (Damla)' },
  { key: 'cemre-earth', label: '3. Cemre Toprağa (Filiz)' },
  { key: 'event-nevruz', label: 'Nevruz (Bahar Lalesi)' },
  { key: 'event-sun', label: 'Hıdırellez (Yaz Güneşi)' },

  // Row 3 (Wildlife, Storks & Pastoral - y: 341 to 512)
  { key: 'event-stork', label: 'Leyleklerin Gelişi ve Göçü' },
  { key: 'event-ram', label: 'Koç Katımı' },
  { key: 'event-barn', label: 'Kışlık Ahır ve İnek' },
  { key: 'crop-hazelnut', label: 'Fındık Hasadı' },
  { key: 'event-quail-wind', label: 'Bıldırcın Geçimi Fırtınası' },

  // Row 4 (Farming Tools & Actions - y: 512 to 682)
  { key: 'action-tractor', label: 'Toprak Sürme / Traktör' },
  { key: 'crop-wheat', label: 'Buğday ve Orak Hasadı' },
  { key: 'action-hoe', label: 'Ekin Çapası' },
  { key: 'action-pruning', label: 'Kış Budaması' },
  { key: 'action-tree-planting', label: 'Ağaç Dikimi' },

  // Row 5 (Weather & Storms - y: 682 to 853)
  { key: 'weather-spring-rain', label: 'Kırkikindi Yağmurları' },
  { key: 'weather-kite-wind', label: 'Çaylak Fırtınası' },
  { key: 'weather-leaf-wind', label: 'Ülker Fırtınası' },
  { key: 'weather-thunder', label: 'Şimşekli Fırtına' },
  { key: 'weather-frost', label: 'İlk Don ve Buzul' },

  // Row 6 (Deep Winter & Peaks - y: 853 to 1024)
  { key: 'weather-zemheri-snow', label: 'Zemheri Kar Kristali' },
  { key: 'weather-blizzard', label: 'Dondurucu Soğuk Rüzgarı' },
  { key: 'event-hamsin-mountain', label: 'Hamsin Karlı Dağı' },
  { key: 'event-winter-solstice', label: 'Zemheri En Uzun Gece Göğü' },
  { key: 'crop-olive-grape', label: 'Zeytin ve Üzüm Hasadı' },
];

async function sliceAndClean() {
  const metadata = await sharp(inputImagePath).metadata();
  const cols = 5;
  const rows = 6;
  const colWidth = metadata.width / cols; // ~114.2
  const rowHeight = metadata.height / rows; // ~170.66

  console.log(`Grid cell: ${colWidth} x ${rowHeight}`);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const meta = ICONS_MAP[idx];
      if (!meta) continue;

      const cellLeft = Math.round(c * colWidth);
      const cellTop = Math.round(r * rowHeight);

      // Margin inside cell to skip divider border lines
      const left = cellLeft + 6;
      const width = Math.round(colWidth) - 12;

      // In Row 1: Icons fill upper 140px. In Rows 2-6: Icons fill top 115px (text is from y=120px to 165px)
      const top = cellTop + (r === 0 ? 8 : 6);
      const height = r === 0 ? 145 : 116;

      // Extract only the icon graphic
      const rawBuffer = await sharp(inputImagePath)
        .extract({ left, top, width, height })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const { data, info } = rawBuffer;
      const numPixels = info.width * info.height;

      // Make pure white/near-white backgrounds transparent
      for (let i = 0; i < numPixels; i++) {
        const off = i * 4;
        const red = data[off];
        const green = data[off + 1];
        const blue = data[off + 2];

        const minC = Math.min(red, green, blue);
        const maxC = Math.max(red, green, blue);
        const diff = maxC - minC;

        if (minC > 246 && diff < 12) {
          data[off + 3] = 0; // 100% transparent
        } else if (minC > 232 && diff < 15) {
          const a = (246 - minC) / 14;
          data[off + 3] = Math.round(a * 255);
        }
      }

      // Trim whitespace and output high-res 128x128 PNG
      const finalIcon = await sharp(data, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4
        }
      })
        .trim({ threshold: 6 })
        .resize(128, 128, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();

      const targetPath = path.join(outputDir, `${meta.key}.png`);
      fs.writeFileSync(targetPath, finalIcon);
      console.log(`[${idx + 1}/30] OK: ${meta.key}.png (${meta.label})`);
    }
  }

  console.log('ALL 30 CLEAN ICONS GENERATED SUCCESSFULLY!');
}

sliceAndClean().catch(console.error);
