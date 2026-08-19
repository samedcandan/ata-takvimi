const path = require('path');
const fs = require('fs');

const sharp = require(path.resolve(__dirname, '../../su-aritma-crm/node_modules/sharp'));

const inputImagePath = 'C:/Users/hp/.gemini/antigravity-ide/brain/96cb814d-ea7d-4daf-bb34-65c1addfe494/.user_uploaded/media_1787135611577.jpg';
const outputDir = path.resolve(__dirname, '../public/moon-phases');

async function processIcons() {
  const metadata = await sharp(inputImagePath).metadata();
  const cols = 5;
  const rows = 9;
  const totalFrames = cols * rows;

  const cellWidth = metadata.width / cols;
  const cellHeight = metadata.height / rows;

  // Let's create an SVG mask that keeps the circle in center and fades out square card borders
  const size = 100; // normalized square icon size
  const r = 46; // radius of moon + halo
  const maskSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <radialGradient id="fadeMask" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stop-color="white" stop-opacity="1" />
          <stop offset="94%" stop-color="white" stop-opacity="0.6" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="url(#fadeMask)" />
    </svg>
  `);

  const frames = [];
  for (let rIdx = 0; rIdx < rows; rIdx++) {
    for (let cIdx = 0; cIdx < cols; cIdx++) {
      const left = Math.round(cIdx * cellWidth);
      const top = Math.round(rIdx * cellHeight);
      const width = Math.round(cellWidth);
      const height = Math.round(cellHeight);

      // Crop cell and resize to 100x100
      const cellBuffer = await sharp(inputImagePath)
        .extract({ left, top, width, height })
        .resize(size, size, { fit: 'cover' })
        .png()
        .toBuffer();

      // Apply circular mask with soft anti-aliased edge to remove card corners
      const finalBuffer = await sharp(cellBuffer)
        .composite([{ input: maskSvg, blend: 'dest-in' }])
        .png()
        .toBuffer();

      frames.push(finalBuffer);
    }
  }

  // Map 30 days
  for (let day = 1; day <= 30; day++) {
    const frameIndex = Math.round(((day - 1) / 29) * (totalFrames - 1));
    const targetFile = path.join(outputDir, `day-${day}.png`);
    fs.writeFileSync(targetFile, frames[frameIndex]);
  }

  console.log('Successfully created 30 perfectly masked, transparent PNG moon icons!');
}

processIcons().catch(console.error);
