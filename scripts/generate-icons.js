const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 128, 256, 512];
const sourceIcon = path.join(__dirname, '..', 'assets', 'icon.png');
const iconsDir = path.join(__dirname, '..', 'assets', 'icons');

// Создаем директорию для иконок, если её нет
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Генерируем иконки разных размеров
async function generateIcons() {
  for (const size of sizes) {
    await sharp(sourceIcon)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon${size}.png`));
    
    console.log(`Generated ${size}x${size} icon`);
  }
  
  // Создаем .ico файл для Windows
  const icoPaths = sizes.map(size => ({
    input: path.join(iconsDir, `icon${size}.png`),
    size: size
  }));
  
  await sharp(sourceIcon)
    .resize(256, 256)
    .toFile(path.join(iconsDir, 'icon.ico'));
  
  // Создаем .icns файл для macOS
  await sharp(sourceIcon)
    .resize(1024, 1024)
    .toFile(path.join(iconsDir, 'icon.icns'));
}

generateIcons().catch(console.error); 