import { readFileSync } from "fs";
import path from "path";

export type LegalBlock = { type: "heading" | "paragraph"; text: string };

/** Load a legal document from src/content/legal and split it into blocks.
 * The first line is the document title; short lines without terminal
 * punctuation are treated as section headings. */
export function loadLegalDoc(slug: string): { title: string; blocks: LegalBlock[] } {
  const raw = readFileSync(
    path.join(process.cwd(), "src", "content", "legal", `${slug}.txt`),
    "utf8",
  );
  const paragraphs = raw
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const title = paragraphs.shift() ?? "";
  const blocks: LegalBlock[] = paragraphs.map((text) => ({
    type:
      text.length < 80 && !/[.;:!?)]$/.test(text) && !text.startsWith("©")
        ? "heading"
        : "paragraph",
    text,
  }));
  return { title, blocks };
}
