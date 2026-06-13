import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Directly Listed — The Future of Going Public. List Boldly.";

// Branded OpenGraph card used for social shares and AI link previews.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #061629 0%, #0a2540 70%, #16406b 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", marginBottom: "48px" }}>
          <div style={{ width: "26px", height: "52px", background: "#ffffff88", borderRadius: "5px" }} />
          <div style={{ width: "26px", height: "84px", background: "#ffffffcc", borderRadius: "5px" }} />
          <div style={{ width: "26px", height: "120px", background: "#36c5b5", borderRadius: "5px" }} />
        </div>
        <div style={{ display: "flex", fontSize: "64px", fontWeight: 700, letterSpacing: "-2px" }}>
          directlylisted
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#9fc3e8", marginTop: "18px" }}>
          The Future of Going Public. List Boldly.
        </div>
        <div style={{ display: "flex", fontSize: "22px", color: "#36c5b5", marginTop: "44px" }}>
          Reg D 506(b)/(c) · Reg A+ · NASDAQ &amp; NYSE Direct Listings · ELOC
        </div>
      </div>
    ),
    { ...size },
  );
}
