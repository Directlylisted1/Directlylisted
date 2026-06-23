// Regenerates the app favicons from the Directly Listed symbol mark (the flag +
// lightning bolt from the wordmark), on a brand-navy rounded tile, so the icon
// is legible at favicon sizes (Google search, browser tabs) instead of the full
// wordmark. Run: node scripts/make-icons.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import path from "node:path";

const APP = path.join(process.cwd(), "src", "app");

// The mark, lifted from components/Logo.tsx (LogoWordmark) and centered into a
// 256×256 tile. Light elements on navy so it reads on any tab/background.
// Navy mark on white, matching the brand logo: gray flag top, navy flag lower
// + navy lightning bolt.
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="52" fill="#ffffff"/>
  <g transform="translate(-268.5 49.9) scale(1.953)">
    <polygon points="196,8 246,8 240,17 202,17" fill="#9aa6b2"/>
    <polygon points="200,21 238,21 232,30 206,30" fill="#1c3a6e"/>
    <polygon points="186,30 198,30 168,72 160,72" fill="#1c3a6e"/>
  </g>
</svg>`;
const svg = Buffer.from(SVG);

const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// Build a multi-resolution .ico from PNG-encoded entries (16/32/48).
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + 16 * entries.length;
  for (let i = 0; i < entries.length; i++) {
    const { size, buf } = entries[i];
    const e = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, e + 0);
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1);
    dir.writeUInt8(0, e + 2);
    dir.writeUInt8(0, e + 3);
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(buf.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  }
  return Buffer.concat([header, dir, ...entries.map((x) => x.buf)]);
}

const icon = await png(512);
writeFileSync(path.join(APP, "icon.png"), icon);

const apple = await png(180);
writeFileSync(path.join(APP, "apple-icon.png"), apple);

const ico = buildIco(
  await Promise.all([16, 32, 48].map(async (s) => ({ size: s, buf: await png(s) }))),
);
writeFileSync(path.join(APP, "favicon.ico"), ico);

console.log("Wrote icon.png (512), apple-icon.png (180), favicon.ico (16/32/48).");
