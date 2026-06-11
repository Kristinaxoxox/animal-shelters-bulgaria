const sharp = require('sharp');

const W = 1600, H = 838;

const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#cd6a18" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#9c4f10" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <text x="800" y="440" font-family="Montserrat, Arial, sans-serif" font-size="85" font-weight="800" fill="#ffffff" text-anchor="middle">
    Приюти за животни в България
  </text>
  <text x="800" y="533" font-family="Montserrat, Arial, sans-serif" font-size="45" font-weight="600" fill="#fdf5ec" text-anchor="middle">
    Открий приют близо до теб и научи как да помогнеш
  </text>
  <text x="800" y="627" font-family="Montserrat, Arial, sans-serif" font-size="37" font-weight="500" fill="#3a2415" text-anchor="middle">
    🐾 Мечо и Приятели — map.mecho-ngo.bg
  </text>
</svg>
`;

(async () => {
  const overlaySvg = await sharp(Buffer.from(overlay)).png().toBuffer();

  const background = await sharp('images/burgas2.jpg')
    .resize(W, H, { fit: 'cover' })
    .blur(12)
    .toBuffer();

  const logo = await sharp('logo_clean.png').resize({ width: 480 }).toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const withOverlay = await sharp(background)
    .composite([{ input: overlaySvg, left: 0, top: 0 }])
    .png()
    .toBuffer();

  await sharp(withOverlay)
    .composite([{ input: logo, left: Math.round((W - logoMeta.width) / 2), top: 80 }])
    .jpeg({ quality: 95 })
    .toFile('social-card.jpg');

  console.log('done');
})();
