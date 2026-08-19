const path = require('path');
const fs = require('fs');

const sharp = require(path.resolve(__dirname, '../../su-aritma-crm/node_modules/sharp'));

const inputImagePath = 'C:/Users/hp/.gemini/antigravity-ide/brain/96cb814d-ea7d-4daf-bb34-65c1addfe494/.user_uploaded/media_1787137247688.jpg';
const outputDir = path.resolve(__dirname, '../public/icons');

const ROW_BOUNDS = [
  { y0: 0,   y1: 135, reserve: 0 },   // Row 1: Nav
  { y0: 136, y1: 291, reserve: 40 },  // Row 2: Cemre
  { y0: 292, y1: 447, reserve: 40 },  // Row 3: Stork & Animals
  { y0: 448, y1: 622, reserve: 44 },  // Row 4: Farming Tools
  { y0: 623, y1: 769, reserve: 38 },  // Row 5: Weather Storms
  { y0: 770, y1: 1023, reserve: 56 }  // Row 6: Deep Winter & Peaks
];

const COL_BOUNDS = [
  { x0: 0,   x1: 112 },
  { x0: 114, x1: 228 },
  { x0: 230, x1: 343 },
  { x0: 345, x1: 458 },
  { x0: 460, x1: 571 }
];

const ICONS_MAP = [
  // Row 1 (Nav & System)
  { key: 'nav-calendar', label: 'Ajanda / Takvim' },
  { key: 'nav-sprout', label: 'Ekim Rehberi' },
  { key: 'nav-journal', label: 'Tarla Defteri' },
  { key: 'nav-bell', label: 'Bildirim Zili' },
  { key: 'nav-location', label: 'Konum / Şehir' },

  // Row 2 (Cemre & Spring)
  { key: 'cemre-air', label: '1. Cemre Havaya (Alev)' },
  { key: 'cemre-water', label: '2. Cemre Suya (Damla)' },
  { key: 'cemre-earth', label: '3. Cemre Toprağa (Filiz)' },
  { key: 'event-nevruz', label: 'Nevruz (Bahar Lalesi)' },
  { key: 'event-sun', label: 'Hıdırellez (Yaz Güneşi)' },

  // Row 3 (Wildlife, Storks & Pastoral)
  { key: 'event-stork', label: 'Leyleklerin Gelişi ve Göçü' },
  { key: 'event-ram', label: 'Koç Katımı' },
  { key: 'event-barn', label: 'Kışlık Ahır ve İnek' },
  { key: 'crop-hazelnut', label: 'Fındık Hasadı' },
  { key: 'event-quail-wind', label: 'Bıldırcın Geçimi Fırtınası' },

  // Row 4 (Farming Tools & Actions)
  { key: 'action-tractor', label: 'Toprak Sürme / Traktör' },
  { key: 'crop-wheat', label: 'Buğday ve Orak Hasadı' },
  { key: 'action-hoe', label: 'Ekin Çapası' },
  { key: 'action-pruning', label: 'Kış Budaması' },
  { key: 'action-tree-planting', label: 'Ağaç Dikimi' },

  // Row 5 (Weather & Storms)
  { key: 'weather-spring-rain', label: 'Kırkikindi Yağmurları' },
  { key: 'weather-kite-wind', label: 'Çaylak Fırtınası' },
  { key: 'weather-leaf-wind', label: 'Ülker Fırtınası' },
  { key: 'weather-thunder', label: 'Şimşekli Fırtına' },
  { key: 'weather-frost', label: 'İlk Don ve Buzul' },

  // Row 6 (Deep Winter & Peaks)
  { key: 'weather-zemheri-snow', label: 'Zemheri Kar Kristali' },
  { key: 'weather-blizzard', label: 'Dondurucu Soğuk Rüzgarı' },
  { key: 'event-hamsin-mountain', label: 'Hamsin Karlı Dağı' },
  { key: 'event-winter-solstice', label: 'Zemheri En Uzun Gece Göğü' },
  { key: 'crop-olive-grape', label: 'Zeytin ve Üzüm Hasadı' },
];

async function exactSlice() {
  for (let r = 0; r < ROW_BOUNDS.length; r++) {
    const row = ROW_BOUNDS[r];
    for (let c = 0; c < COL_BOUNDS.length; c++) {
      const col = COL_BOUNDS[c];
      const idx = r * COL_BOUNDS.length + c;
      const meta = ICONS_MAP[idx];
      if (!meta) continue;

      const left = col.x0 + 2;
      const width = col.x1 - col.x0 - 4;

      const top = row.y0 + 2;
      const height = row.y1 - row.y0 - row.reserve - 4;

      const cellRaw = await sharp(inputImagePath)
        .extract({ left, top, width, height })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const { data, info } = cellRaw;
      const numP = info.width * info.height;

      // Transparent Background Conversion
      for (let i = 0; i < numP; i++) {
        const off = i * 4;
        const rv = data[off], gv = data[off + 1], bv = data[off + 2];
        const minV = Math.min(rv, gv, bv);
        const maxV = Math.max(rv, gv, bv);
        const diff = maxV - minV;

        if (minV > 245 && diff < 12) {
          data[off + 3] = 0; // 100% transparent
        } else if (minV > 228 && diff < 15) {
          const a = (245 - minV) / 17;
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

      const outFile = path.join(outputDir, `${meta.key}.png`);
      fs.writeFileSync(outFile, finalIcon);
      console.log(`[${idx + 1}/30] Saved: ${meta.key}.png (${meta.label})`);
    }
  }

  console.log('ALL 30 ICONS EXACTLY SLICED & CLEANED!');
}

exactSlice().catch(console.error);
