import { Link, data, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getArticle, type HeadingBlock } from "../articles/catalog";
import { ArticleContent } from "../components/ArticleContent";
import { SiteBar } from "../components/SiteBar";

export function loader({ params }: LoaderFunctionArgs) {
  const article = getArticle(params.slug ?? "");
  if (!article) {
    throw data(null, { status: 404, statusText: "Not Found" });
  }
  return { article };
}

export function ArticlePage() {
  const { article } = useLoaderData<typeof loader>();
  const headings = article.blocks.filter(
    (block): block is HeadingBlock => block.type === "heading",
  );
  const kicker = [article.event, article.location, article.date].join(" · ");
  const [minutes, seconds] = article.duration.split(":");

  return (
    <>
      <title>{`${article.titleEn} · Personal Library`}</title>
      <meta name="description" content={article.note} />
      <SiteBar current={article.titleEn} />
      <article className="wrap article">
        <header className="hero">
          <p className="kicker">{kicker}</p>
          <h1>
            {article.titleEn}
            <span className="sub">{article.titleZh}</span>
          </h1>
          <p className="meta">
            {article.speaker} · {article.role}
            <br />
            原片 {Number(minutes)} 分 {seconds} 秒 · 中英对照图文 · 幻灯片截自原视频
          </p>
        </header>
        <div className="note">{article.note}</div>
        <nav className="toc">
          <strong>目录</strong>
          {headings.map((heading) => (
            <a key={heading.id} href={`#${heading.id}`}>
              {heading.zh}
            </a>
          ))}
        </nav>
        <ArticleContent slug={article.slug} blocks={article.blocks} />
        <footer>
          来源：<a href={article.source}>{article.sourceLabel}</a>
          {` · ${article.event}，${article.date}，${article.location}。`}
          <br />
          英文按现场口播整理，数字以幻灯片为准。中文为对照翻译。
          <br />
          本页是 <Link to="/">Personal Library</Link> 中的一篇。
        </footer>
      </article>
    </>
  );
}
