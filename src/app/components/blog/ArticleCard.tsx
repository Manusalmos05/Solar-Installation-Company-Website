import { Link } from "react-router";
import { CalendarDays, Clock } from "lucide-react";
import { BlogArticle, formatDate } from "../../../data/blog";

interface ArticleCardProps {
  article: BlogArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="overflow-hidden h-48">
        <img
          src={`${import.meta.env.BASE_URL}${article.cover}`}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>

        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} /> {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {article.readingMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
