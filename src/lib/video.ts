/** Convert a YouTube or Vimeo URL into an embeddable iframe URL. */
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v") ?? u.pathname.match(/\/(?:shorts|embed)\/([\w-]{6,})/)?.[1];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.match(/\/(\d{6,})/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === "player.vimeo.com") {
      return url;
    }
    return null;
  } catch {
    return null;
  }
}

export function isSupportedVideoUrl(url: string): boolean {
  return toEmbedUrl(url) !== null;
}
