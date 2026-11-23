import { NavLink } from "react-router";
import { articleHref, articles } from "../articles/catalog";

export function ArticleNav({ current }: { current?: string }) {
  return (
    <nav className="article-nav" aria-label="馆藏列表">
      {articles.map((article) => (
        <NavLink
          key={article.slug}
          to={articleHref(article.slug)}
          className="article-nav-item"
          aria-current={article.slug === current ? "page" : undefined}
        >
          <span className="en">{article.titleEn}</span>
          <span className="zh">{article.titleZh}</span>
        </NavLink>
      ))}
    </nav>
  );
}
