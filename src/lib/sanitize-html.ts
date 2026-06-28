// Lightweight allowlist HTML sanitizer for admin-authored blog content that may
// be pasted from external sources (Word, Google Docs, web pages). It KEEPS
// formatting — including inline `style` (font size/color/family), bold, lists,
// headings, links, images, tables — so pasted source styling is preserved, while
// removing active/dangerous content (scripts, event handlers, js: URLs, etc.).
//
// Note: this is a pragmatic sanitizer for trusted-admin input, not a substitute
// for a full DOM-based sanitizer on untrusted user content.

export function sanitizeHtml(input: string): string {
  let html = input;

  // Drop dangerous elements entirely (with their content where relevant).
  html = html.replace(/<\s*(script|style|iframe|object|embed|noscript|template)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "");
  // Drop void/standalone dangerous or layout-breaking tags.
  html = html.replace(/<\s*\/?\s*(script|style|iframe|object|embed|form|input|button|select|textarea|link|meta|base|html|head|body|title)\b[^>]*>/gi, "");
  // Strip HTML comments (can hide conditional/script payloads).
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  // Remove inline event handlers: on*="..." / on*='...' / on*=value.
  html = html.replace(/\son[a-z]+\s*=\s*"(?:[^"]*)"/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*'(?:[^']*)'/gi, "");
  html = html.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "");
  // Neutralize javascript:/vbscript: and non-image data: URLs in href/src.
  html = html.replace(/\s(href|src)\s*=\s*"(\s*(?:javascript|vbscript):[^"]*)"/gi, ' $1="#"');
  html = html.replace(/\s(href|src)\s*=\s*'(\s*(?:javascript|vbscript):[^']*)'/gi, " $1='#'");
  html = html.replace(/\s(href|src)\s*=\s*"(\s*data:(?!image\/)[^"]*)"/gi, ' $1="#"');
  // Remove style attributes that try to run script via url()/expression().
  html = html.replace(/style\s*=\s*"([^"]*)"/gi, (m, css) =>
    /expression\s*\(|javascript:|@import|url\s*\(\s*['"]?\s*javascript:/i.test(css) ? "" : m,
  );

  return html.trim();
}

/** Heuristic: does this content already contain HTML markup (vs. markdown-lite)? */
export function looksLikeHtml(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}
