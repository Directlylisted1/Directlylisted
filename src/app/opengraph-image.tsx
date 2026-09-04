import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Directly Listed — The Future of Going Public. List Boldly.";

// Branded OpenGraph card used for social shares and AI link previews.
// Features the official blue Directly Listed logo on a clean light ground —
// the previous builds' light-on-white logo rendered as an unreadable white
// banner in Facebook/X/LinkedIn link previews.
export default async function OgImage() {
  const logo = await fs.readFile(path.join(process.cwd(), "public", "brand", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #ffffff 0%, #f2f6fb 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={600} height={276} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: "34px",
            fontWeight: 700,
            color: "#0a2540",
            marginTop: "40px",
            letterSpacing: "-0.5px",
          }}
        >
          The Future of Going Public. List Boldly.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#41556e",
            marginTop: "16px",
          }}
        >
          NASDAQ &amp; NYSE Direct Listings · Reg A+ · Reg D 506(b)/(c) · ELOC
        </div>
        {/* Navy footer bar for weight and brand colour */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "18px",
            display: "flex",
            background: "linear-gradient(90deg, #0a2540 0%, #16406b 60%, #36c5b5 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
