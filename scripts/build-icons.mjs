// One-off generator for the site's favicon / app icons.
//
// Produces square brand icons (navy background + white wordmark) in src/app/ so
// Next.js's file-based metadata auto-emits the <link rel="icon"> tags — this is
// what shows as the "corner logo" in Google search results and browser tabs.
//   - src/app/icon.png        (512x512, modern browsers + Google)
//   - src/app/apple-icon.png  (180x180, iOS home screen)
//   - src/app/favicon.ico     (48x48 PNG-in-ICO, legacy)
// Re-run with: node scripts/build-icons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "public", "brand", "logo.png"); // navy "Directly" + gray "LISTED"
const outDir = path.join(root, "src", "app");
const BG = { r: 255, g: 255, b: 255, alpha: 1 }; // white background

async function squareIcon(size) {
  const inner = Math.round(size * 0.84); // padding around the wordmark
  const fg = await sharp(src)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: fg, gravity: "center" }])
    .png()
    .toBuffer();
}

// Minimal ICO container wrapping a single PNG image (browsers support PNG-in-ICO).
function pngToIco(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // image size
  entry.writeUInt32LE(6 + 16, 12); // offset to image data
  return Buffer.concat([header, entry, pngBuf]);
}

const icon512 = await squareIcon(512);
writeFileSync(path.join(outDir, "icon.png"), icon512);

const apple180 = await squareIcon(180);
writeFileSync(path.join(outDir, "apple-icon.png"), apple180);

const ico48 = await squareIcon(48);
writeFileSync(path.join(outDir, "favicon.ico"), pngToIco(ico48, 48));

console.log("Wrote src/app/icon.png (512), apple-icon.png (180), favicon.ico (48).");
