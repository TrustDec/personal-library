import { Link } from "react-router";
import { articleHref, slideSrc, type Article } from "../articles/catalog";

export function ArticleCard({ article }: { article: Article }) {
  const kicker = [article.event, article.date].join(" · ");
  const meta = [article.speaker, article.duration].join(" · ");

  return (
    <Link className="card" to={articleHref(article.slug)}>
      <img src={slideSrc(article.slug, article.cover)} alt="" />
      <div className="body">
        <p className="kicker">{kicker}</p>
        <h3>{article.titleEn}</h3>
        <p className="zh">{article.titleZh}</p>
        <p className="meta">{meta}</p>
      </div>
    </Link>
  );
}
