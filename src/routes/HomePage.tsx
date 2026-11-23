import { articles } from "../articles/catalog";
import { ArticleCard } from "../components/ArticleCard";

export function HomePage() {
  return (
    <main className="home">
      <title>Personal Library</title>
      <section className="collection" id="collection">
        <div className="list">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      <footer className="site-footer">
        <p>个人整理。演讲版权归原讲者与主办方。</p>
      </footer>
    </main>
  );
}
