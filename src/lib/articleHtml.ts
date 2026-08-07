const serverStore: Record<string, string> = {};

type WindowWithArticles = Window & {
  __ARTICLE_HTML__?: Record<string, string>;
};

export function seedArticleHtml(map: Record<string, string>): void {
  Object.assign(serverStore, map);
}

export function readArticleHtml(slug: string): string | null {
  if (typeof window !== "undefined") {
    return (window as WindowWithArticles).__ARTICLE_HTML__?.[slug] ?? null;
  }
  return serverStore[slug] ?? null;
}
