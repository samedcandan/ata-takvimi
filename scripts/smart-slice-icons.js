const path = require('path');
const fs = require('fs');

const sharp = require(path.resolve(__dirname, '../../su-aritma-crm/node_modules/sharp'));

const inputImagePath = 'C:/Users/hp/.gemini/antigravity-ide/brain/96cb814d-ea7d-4daf-bb34-65c1addfe494/.user_uploaded/media_1787137247688.jpg';
const outputDir = path.resolve(__dirname, '../public/icons');

const ICONS_MAP = [
  { key: 'nav-calendar', label: 'Ajanda / Takvim' },
  { key: 'nav-sprout', label: 'Ekim Rehberi' },
  { key: 'nav-journal', label: 'Tarla Defteri' },
  { key: 'nav-bell', label: 'Bildirim Zili' },
  { key: 'nav-location', label: 'Konum / Şehir' },

  { key: 'cemre-air', label: '1. Cemre Havaya (Alev)' },
  { key: 'cemre-water', label: '2. Cemre Suya (Damla)' },
  { key: 'cemre-earth', label: '3. Cemre Toprağa (Filiz)' },
  { key: 'event-nevruz', label: 'Nevruz (Bahar Lalesi)' },
  { key: 'event-sun', label: 'Hıdırellez (Yaz Güneşi)' },

  { key: 'event-stork', label: 'Leyleklerin Gelişi ve Göçü' },
  { key: 'event-ram', label: 'Koç Katımı' },
  { key: 'event-barn', label: 'Kışlık Ahır ve İnek' },
  { key: 'crop-hazelnut', label: 'Fındık Hasadı' },
  { key: 'event-quail-wind', label: 'Bıldırcın Geçimi Fırtınası' },

  { key: 'action-tractor', label: 'Toprak Sürme / Traktör' },
  { key: 'crop-wheat', label: 'Buğday ve Orak Hasadı' },
  { key: 'action-hoe', label: 'Ekin Çapası' },
  { key: 'action-pruning', label: 'Kış Budaması' },
  { key: 'action-tree-planting', label: 'Ağaç Dikimi' },

  { key: 'weather-spring-rain', label: 'Kırkikindi Yağmurları' },
  { key: 'weather-kite-wind', label: 'Çaylak Fırtınası' },
  { key: 'weather-leaf-wind', label: 'Ülker Fırtınası' },
  { key: 'weather-thunder', label: 'Şimşekli Fırtına' },
  { key: 'weather-frost', label: 'İlk Don ve Buzul' },

  { key: 'weather-zemheri-snow', label: 'Zemheri Kar Kristali' },
  { key: 'weather-blizzard', label: 'Dondurucu Soğuk Rüzgarı' },
  { key: 'event-hamsin-mountain', label: 'Hamsin Karlı Dağı' },
  { key: 'event-winter-solstice', label: 'Zemheri En Uzun Gece Göğü' },
  { key: 'crop-olive-grape', label: 'Zeytin ve Üzüm Hasadı' },
];

async function autoSegment() {
  const { data, info } = await sharp(inputImagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cols = 5;
  const rows = 6;
  const colWidth = info.width / cols;
  const rowHeight = info.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const meta = ICONS_MAP[idx];
      if (!meta) continue;

      const cellX0 = Math.floor(c * colWidth);
      const cellX1 = Math.floor((c + 1) * colWidth);
      const cellY0 = Math.floor(r * rowHeight);
      const cellY1 = Math.floor((r + 1) * rowHeight);

      // In each cell, find rows with non-white pixels
      const rowPixelCounts = [];
      for (let y = cellY0 + 2; y < cellY1 - 2; y++) {
        let coloredPixels = 0;
        for (let x = cellX0 + 2; x < cellX1 - 2; x++) {
          const off = (y * info.width + x) * info.channels;
          const red = data[off], grn = data[off+1], blu = data[off+2];
          if (red < 240 || grn < 240 || blu < 240) {
            coloredPixels++;
          }
        }
        rowPixelCounts.push({ y, count: coloredPixels });
      }

      // Find the main icon cluster (the first continuous chunk of colored rows from the top)
      let minY = cellY0 + 2;
      let maxY = cellY1 - 2;

      // In rows 2-6 (where text exists at bottom), text is separated by a row with 0 or very few colored pixels
      if (r > 0) {
        // Start from top of cell and find where the icon ends
        let foundIconStart = false;
        let iconEndY = cellY0 + Math.floor((cellY1 - cellY0) * 0.72); // default upper 72%

        for (let i = 0; i < rowPixelCounts.length; i++) {
          const item = rowPixelCounts[i];
          if (item.count > 5) {
            foundIconStart = true;
          } else if (foundIconStart && item.count <= 2 && i > 10 && i < rowPixelCounts.length - 8) {
            // Check if subsequent 4 rows are also nearly empty (gap between icon and text)
            const nextGap = rowPixelCounts.slice(i, i + 4).every(p => p.count <= 3);
            if (nextGap) {
              iconEndY = item.y;
              break;
            }
          }
        }
        maxY = iconEndY;
      }

      const left = cellX0 + 4;
      const top = cellY0 + 2;
      const width = Math.max(10, cellX1 - cellX0 - 8);
      const height = Math.max(10, maxY - top);

      // Extract bounding box
      const iconRaw = await sharp(inputImagePath)
        .extract({ left, top, width, height })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const imgData = iconRaw.data;
      const totalP = iconRaw.info.width * iconRaw.info.height;

      // Transparent background
      for (let i = 0; i < totalP; i++) {
        const off = i * 4;
        const rv = imgData[off];
        const gv = imgData[off + 1];
        const bv = imgData[off + 2];

        const minV = Math.min(rv, gv, bv);
        const maxV = Math.max(rv, gv, bv);
        const diffV = maxV - minV;

        if (minV > 245 && diffV < 12) {
          imgData[off + 3] = 0;
        } else if (minV > 230 && diffV < 15) {
          const a = (245 - minV) / 15;
          imgData[off + 3] = Math.round(a * 255);
        }
      }

      // Output high quality 128x128
      const finalBuffer = await sharp(imgData, {
        raw: {
          width: iconRaw.info.width,
          height: iconRaw.info.height,
          channels: 4
        }
      })
        .trim({ threshold: 5 })
        .resize(128, 128, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();

      const outPath = path.join(outputDir, `${meta.key}.png`);
      fs.writeFileSync(outPath, finalBuffer);
      console.log(`[${idx + 1}/30] Auto-segmented: ${meta.key}.png (${meta.label})`);
    }
  }

  console.log('AUTO-SEGMENTATION COMPLETE!');
}

autoSegment().catch(console.error);
