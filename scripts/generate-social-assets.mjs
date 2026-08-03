import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC =
  process.argv[2] ||
  "public/kurdanahealth-logo-source.png";

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error(`Missing source logo: ${SRC}`);
  }

  const meta = await sharp(SRC).metadata();
  console.log(`source ${meta.width}x${meta.height} ${meta.format}`);

  // Exact logo PNG for public use (no redesign)
  await sharp(SRC)
    .png()
    .toFile("public/kurdanahealth-logo.png");

  // Social preview 1200x630: full logo centered on white, no crop of content
  const canvasW = 1200;
  const canvasH = 630;
  const marginX = 120;
  const marginY = 48;
  const maxW = canvasW - marginX * 2;
  const maxH = canvasH - marginY * 2;

  const fitted = await sharp(SRC)
    .resize({
      width: maxW,
      height: maxH,
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  const left = Math.round((canvasW - fitted.info.width) / 2);
  const top = Math.round((canvasH - fitted.info.height) / 2);

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: fitted.data, left, top }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile("public/kurdanahealth-social-preview.jpg");

  const previewMeta = await sharp("public/kurdanahealth-social-preview.jpg").metadata();
  console.log(
    `preview ${previewMeta.width}x${previewMeta.height} logo@${fitted.info.width}x${fitted.info.height} offset(${left},${top})`
  );

  // Emblem-only square crop (girl / circular frame). Source is vertical:
  // emblem occupies roughly the upper ~62% and is horizontally centered.
  // Crop a square tightly around the circular portrait (exclude wordmark).
  const w = meta.width;
  const h = meta.height;
  // Tuned for the supplied vertical logo: circle sits in upper portion
  const square = Math.min(w, Math.round(h * 0.58));
  const cropLeft = Math.max(0, Math.round((w - square) / 2));
  const cropTop = Math.max(0, Math.round(h * 0.02));
  const cropSize = Math.min(square, w - cropLeft, h - cropTop);

  const emblem = await sharp(SRC)
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropSize,
      height: cropSize,
    })
    .png()
    .toBuffer();

  await sharp(emblem).png().toFile("public/kurdanahealth-emblem.png");

  const sizes = [
    { file: "public/favicon-32x32.png", size: 32 },
    { file: "public/apple-touch-icon.png", size: 180 },
    { file: "public/icon-192.png", size: 192 },
    { file: "public/icon-512.png", size: 512 },
  ];

  for (const { file, size } of sizes) {
    await sharp(emblem)
      .resize(size, size, { fit: "cover", kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(file);
    console.log(`wrote ${file}`);
  }

  // Multi-size ICO for classic favicon
  const ico32 = await sharp(emblem).resize(32, 32).png().toBuffer();
  // sharp doesn't write ico natively; use 32png as favicon.png and link as icon
  await sharp(emblem).resize(32, 32).png().toFile("public/favicon.png");
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
