const sharp = require('sharp');
sharp('public/GameCenterfavicon.png')
    .resize(192, 192)
    .toFile('public/icon-192.png')
    .then(() => console.log('192 created'));

sharp('public/GameCenterfavicon.png')
    .resize(512, 512)
    .toFile('public/icon-512.png')
    .then(() => console.log('512 created'));
