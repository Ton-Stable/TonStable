const fs = require('fs');
const path = require('path');

// Функция для копирования директории
function copyDirectory(source, destination) {
  // Создаем директорию назначения, если она не существует
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Читаем содержимое исходной директории
  const files = fs.readdirSync(source);

  // Копируем каждый файл
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      // Рекурсивно копируем поддиректории
      copyDirectory(sourcePath, destPath);
    } else {
      // Копируем файл
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Создаем manifest.json для расширения
const manifest = {
  "manifest_version": 3,
  "name": "TON Stable Wallet",
  "version": "1.0.0",
  "description": "A secure and user-friendly wallet for TON blockchain",
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "assets/icons/icon16.png",
      "48": "assets/icons/icon48.png",
      "128": "assets/icons/icon128.png"
    }
  },
  "icons": {
    "16": "assets/icons/icon16.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  },
  "permissions": [
    "storage"
  ]
};

// Путь к собранной веб-версии
const webBuildPath = path.join(__dirname, '..', 'dist');
// Путь к директории расширения
const extensionPath = path.join(__dirname, '..', 'builds', 'extension');

// Копируем файлы из веб-сборки в директорию расширения
copyDirectory(webBuildPath, extensionPath);

// Создаем директорию для иконок
const iconsPath = path.join(extensionPath, 'assets', 'icons');
if (!fs.existsSync(iconsPath)) {
  fs.mkdirSync(iconsPath, { recursive: true });
}

// Копируем иконки
const iconSizes = [16, 48, 128];
iconSizes.forEach(size => {
  fs.copyFileSync(
    path.join(__dirname, '..', 'assets', 'icons', `icon${size}.png`),
    path.join(iconsPath, `icon${size}.png`)
  );
});

// Создаем manifest.json
fs.writeFileSync(
  path.join(extensionPath, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('Chrome Extension build completed!'); 