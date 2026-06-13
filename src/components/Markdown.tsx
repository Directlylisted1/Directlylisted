import { Fragment } from "react";

/** Render a markdown-lite body: blank-line paragraphs, "## " headings,
 * "- " bullet lists, and [text](url) links. External links open safely. */
export function MarkdownLite({ content }: { content: string }) {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-navy-900">
              {renderInline(block.slice(3))}
            </h2>
          );
        }
        if (block.split("\n").every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="mb-5 list-disc space-y-2 pl-6 text-navy-900/85">
              {block.split("\n").map((l, j) => (
                <li key={j}>{renderInline(l.trim().slice(2))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mb-5 leading-relaxed text-navy-900/85">
            {renderInline(block.replace(/\n/g, " "))}
          </p>
        );
      })}
    </>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    const [, label, href] = m;
    const external = href.startsWith("http");
    return (
      <a
        key={i}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-semibold text-brand-600 underline-offset-2 hover:underline"
      >
        {label}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  });
}
