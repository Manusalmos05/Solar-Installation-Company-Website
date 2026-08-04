import { useEffect, useRef, useState } from "react";
// @ts-ignore
import "../../../styles/blog.css";

interface ArticleContentProps {
  slug: string;
}

export default function ArticleContent({ slug }: ArticleContentProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    setError(false);

    fetch(`${import.meta.env.BASE_URL}blog/articles/${slug}.html`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setHtml(text);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!html || !containerRef.current) return;
    let cancelled = false;

    (async () => {
      // @ts-ignore
      await import("katex/dist/katex.min.css");
      const { default: renderMathInElement } = await import(
        // @ts-ignore
        "katex/contrib/auto-render"
      );
      if (!cancelled && containerRef.current) {
        renderMathInElement(containerRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\(", right: "\\)", display: false },
          ],
          throwOnError: false,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [html]);

  if (error) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No se pudo cargar el contenido del artículo. Inténtalo de nuevo más tarde.
      </p>
    );
  }

  if (html === null) {
    return (
      <div className="space-y-4 py-8 animate-pulse">
        <div className="h-4 bg-secondary rounded w-3/4" />
        <div className="h-4 bg-secondary rounded" />
        <div className="h-4 bg-secondary rounded w-5/6" />
        <div className="h-48 bg-secondary rounded-2xl" />
        <div className="h-4 bg-secondary rounded w-2/3" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="article-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
