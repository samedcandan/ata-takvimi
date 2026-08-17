const path = require('path');
const fs = require('fs');

// Jimp kütüphanesini bul
let Jimp;
try {
  Jimp = require('../../karneyn-web/node_modules/jimp');
} catch (e) {
  try {
    Jimp = require('../../aysa-moda/node_modules/jimp');
  } catch (e2) {
    console.error('Jimp bulunamadı:', e2);
    process.exit(1);
  }
}

// Jimp v1 / v0 uyumluluğu
const readImage = async (filePath) => {
  if (Jimp.read) return await Jimp.read(filePath);
  if (Jimp.Jimp && Jimp.Jimp.read) return await Jimp.Jimp.read(filePath);
  return await Jimp(filePath);
};

const createBlank = async (w, h, color = 0x00000000) => {
  if (Jimp.Jimp) return new Jimp.Jimp({ width: w, height: h, color: color });
  return new Jimp({ width: w, height: h, color: color });
};

async function generate() {
  const iconSource = path.join(__dirname, '../public/icon-512.png');
  const resDir = path.join(__dirname, '../android/app/src/main/res');

  console.log('📂 Kaynak logo:', iconSource);
  console.log('📂 Hedef Android res dizini:', resDir);

  const mipmaps = [
    { dir: 'mipmap-mdpi', iconSize: 48, fgSize: 108 },
    { dir: 'mipmap-hdpi', iconSize: 72, fgSize: 162 },
    { dir: 'mipmap-xhdpi', iconSize: 96, fgSize: 216 },
    { dir: 'mipmap-xxhdpi', iconSize: 144, fgSize: 324 },
    { dir: 'mipmap-xxxhdpi', iconSize: 192, fgSize: 432 },
  ];

  for (const m of mipmaps) {
    const targetFolder = path.join(resDir, m.dir);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    // 1. ic_launcher.png (Kare/Standart)
    const img1 = await readImage(iconSource);
    img1.resize({ w: m.iconSize, h: m.iconSize });
    await img1.write(path.join(targetFolder, 'ic_launcher.png'));

    // 2. ic_launcher_round.png (Yuvarlak)
    const img2 = await readImage(iconSource);
    img2.resize({ w: m.iconSize, h: m.iconSize });
    await img2.write(path.join(targetFolder, 'ic_launcher_round.png'));

    // 3. ic_launcher_foreground.png (Adaptive Icon Foreground — ortalanmış ve paddingli)
    const fgCanvas = await createBlank(m.fgSize, m.fgSize, 0x00000000);
    const fgIcon = await readImage(iconSource);
    const innerSize = Math.round(m.fgSize * 0.72); // %72 güvenli alan
    fgIcon.resize({ w: innerSize, h: innerSize });
    const offset = Math.round((m.fgSize - innerSize) / 2);
    fgCanvas.composite(fgIcon, offset, offset);
    await fgCanvas.write(path.join(targetFolder, 'ic_launcher_foreground.png'));

    console.log(`✅ ${m.dir} ikonları (${m.iconSize}px & adaptive) üretildi.`);
  }

  // Splash ekranları
  const splashes = [
    { dir: 'drawable', w: 480, h: 800 },
    { dir: 'drawable-port-mdpi', w: 320, h: 480 },
    { dir: 'drawable-port-hdpi', w: 480, h: 800 },
    { dir: 'drawable-port-xhdpi', w: 720, h: 1280 },
    { dir: 'drawable-port-xxhdpi', w: 960, h: 1600 },
    { dir: 'drawable-port-xxxhdpi', w: 1280, h: 1920 },
    { dir: 'drawable-land-mdpi', w: 480, h: 320 },
    { dir: 'drawable-land-hdpi', w: 800, h: 480 },
    { dir: 'drawable-land-xhdpi', w: 1280, h: 720 },
    { dir: 'drawable-land-xxhdpi', w: 1600, h: 960 },
    { dir: 'drawable-land-xxxhdpi', w: 1920, h: 1280 },
  ];

  // Arka plan rengi: #071a10 (Ata Takvimi Koyu Zümrüt) -> 0x071a10FF
  for (const s of splashes) {
    const splashFolder = path.join(resDir, s.dir);
    if (!fs.existsSync(splashFolder)) {
      fs.mkdirSync(splashFolder, { recursive: true });
    }

    const canvas = await createBlank(s.w, s.h, 0x071a10FF);
    const logo = await readImage(iconSource);
    const logoSize = Math.min(Math.round(Math.min(s.w, s.h) * 0.45), 320);
    logo.resize({ w: logoSize, h: logoSize });
    const x = Math.round((s.w - logoSize) / 2);
    const y = Math.round((s.h - logoSize) / 2);
    canvas.composite(logo, x, y);
    await canvas.write(path.join(splashFolder, 'splash.png'));
    console.log(`✅ ${s.dir}/splash.png (${s.w}x${s.h}) üretildi.`);
  }

  console.log('🎉 Tüm Android Launcher ve Splash görselleri başarıyla güncellendi!');
}

generate().catch(err => {
  console.error('Hata:', err);
  process.exit(1);
});
