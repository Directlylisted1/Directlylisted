// Regenerates the app favicons as the Directly Listed brand logo on a navy tile:
// navy-blue background, white "Directly" wordmark, gray "LISTED" + gray flag —
// composited from public/brand/logo-light.png. Run: node scripts/make-icons.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import path from "node:path";

const APP = path.join(process.cwd(), "src", "app");
const LOGO_LIGHT = path.join(process.cwd(), "public", "brand", "logo-light.png");

// Navy rounded tile (512×512) — brand navy #0a2540.
const TILE = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#0a2540"/></svg>`,
);

// Build the 512 master: navy tile + the white/gray wordmark centered with padding.
const wordmark = await sharp(LOGO_LIGHT)
  .resize({ width: 432, height: 432, fit: "inside" })
  .toBuffer();
const master = await sharp(TILE)
  .composite([{ input: wordmark, gravity: "center" }])
  .png()
  .toBuffer();

const png = (size) => sharp(master).resize(size, size).png().toBuffer();

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

writeFileSync(path.join(APP, "icon.png"), await png(512));
writeFileSync(path.join(APP, "apple-icon.png"), await png(180));
writeFileSync(
  path.join(APP, "favicon.ico"),
  buildIco(await Promise.all([16, 32, 48].map(async (s) => ({ size: s, buf: await png(s) })))),
);

console.log("Wrote navy-tile logo icons: icon.png (512), apple-icon.png (180), favicon.ico (16/32/48).");
