const path = require('path');
const fs = require('fs');

// Use sharp from su-aritma-crm
const sharp = require(path.resolve(__dirname, '../../su-aritma-crm/node_modules/sharp'));

const inputImagePath = 'C:/Users/hp/.gemini/antigravity-ide/brain/96cb814d-ea7d-4daf-bb34-65c1addfe494/.user_uploaded/media_1787135611577.jpg';
const outputDir = path.resolve(__dirname, '../public/moon-phases');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const metadata = await sharp(inputImagePath).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);

  const cols = 5;
  const rows = 9;
  const totalFrames = cols * rows; // 45

  const cellWidth = metadata.width / cols;
  const cellHeight = metadata.height / rows;

  console.log(`Cell size: ${cellWidth} x ${cellHeight}`);

  // Extract all 45 frames
  const frames = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const left = Math.round(c * cellWidth);
      const top = Math.round(r * cellHeight);
      const width = Math.round(cellWidth);
      const height = Math.round(cellHeight);

      // Crop cell
      const buffer = await sharp(inputImagePath)
        .extract({ left, top, width, height })
        .png()
        .toBuffer();
      
      frames.push(buffer);
    }
  }
  console.log(`Extracted ${frames.length} frames successfully.`);

  // Now map exactly 30 days (Day 1 to Day 30)
  for (let day = 1; day <= 30; day++) {
    // day 1 -> index 0, day 30 -> index 44
    const frameIndex = Math.round(((day - 1) / 29) * (totalFrames - 1));
    const targetFile = path.join(outputDir, `day-${day}.png`);
    fs.writeFileSync(targetFile, frames[frameIndex]);
    console.log(`Day ${day} -> Frame #${frameIndex + 1} (${targetFile})`);
  }

  // Also save all 45 raw frames into a subfolder for full ultra-smooth option
  const allDir = path.join(outputDir, 'raw45');
  if (!fs.existsSync(allDir)) fs.mkdirSync(allDir, { recursive: true });
  for (let i = 0; i < frames.length; i++) {
    fs.writeFileSync(path.join(allDir, `frame-${i + 1}.png`), frames[i]);
  }

  console.log('ALL DONE! 30 daily phases + 45 raw frames saved.');
}

run().catch(console.error);
