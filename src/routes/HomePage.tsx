import { articles } from "../articles/catalog";
import { ArticleCard } from "../components/ArticleCard";

export function HomePage() {
  return (
    <div className="wrap">
      <title>Personal Library</title>
      <header className="hero">
        <p className="kicker">Ideas · Work · Culture</p>
        <h1>Personal Library</h1>
        <p className="lede">
          值得反复读的演讲、想法与笔记。英文一行，中文一行，关键画面穿插在对应位置。
        </p>
        <p className="count">{articles.length} 篇</p>
      </header>
      <section className="list">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
      <footer>个人整理。演讲版权归原讲者与主办方。</footer>
    </div>
  );
}
