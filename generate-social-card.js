const sharp = require('sharp');

const width = 1200, height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e07b2a"/>
      <stop offset="100%" stop-color="#cd6a18"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <g opacity="0.08">
    <circle cx="1050" cy="80" r="220" fill="#fff"/>
    <circle cx="120" cy="560" r="260" fill="#fff"/>
  </g>
  <text x="600" y="330" font-family="Montserrat, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff" text-anchor="middle">
    Приюти за животни в България
  </text>
  <text x="600" y="400" font-family="Montserrat, Arial, sans-serif" font-size="34" font-weight="600" fill="#fdf5ec" text-anchor="middle">
    Намери приют близо до теб и се запиши за разходка
  </text>
  <text x="600" y="470" font-family="Montserrat, Arial, sans-serif" font-size="28" font-weight="500" fill="#3a3a3a" text-anchor="middle">
    🐾 Мечо и Приятели — map.mecho-ngo.bg
  </text>
</svg>
`;

(async () => {
  const logo = await sharp('logo_clean.png').resize({ width: 360 }).toBuffer();
  const logoMeta = await sharp(logo).metadata();

  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: Math.round((width - logoMeta.width) / 2), top: 60 }])
    .jpeg({ quality: 88 })
    .toFile('social-card.jpg');

  console.log('done');
})();
