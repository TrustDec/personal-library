import { data, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getArticle, type HeadingBlock } from "../articles/catalog";
import { ArticleContent } from "../components/ArticleContent";
import { ArticleNav } from "../components/ArticleNav";
import { useActiveHeading } from "../lib/useActiveHeading";

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
  const headingIds = headings.map((heading) => heading.id);
  const active = useActiveHeading(headingIds);
  const kicker = [article.event, article.location, article.date].join(" · ");
  const timeMatch = /^(\d+):(\d{2})$/.exec(article.duration);
  const durationLabel = timeMatch
    ? `原片 ${Number(timeMatch[1])} 分 ${timeMatch[2]} 秒`
    : article.duration;

  return (
    <div className="reading">
      <title>{`${article.titleEn} · Personal Library`}</title>
      <meta name="description" content={article.titleZh} />

      <div className="reading-mobile">
        <details>
          <summary>馆藏</summary>
          <ArticleNav current={article.slug} />
        </details>
        <details>
          <summary>目录</summary>
          <Toc headings={headings} active={active} />
        </details>
      </div>

      <aside className="rail rail-left">
        <p className="rail-label">馆藏</p>
        <ArticleNav current={article.slug} />
      </aside>

      <article className="article">
        <header className="article-hero">
          <p className="kicker">{kicker}</p>
          <h1>
            {article.titleEn}
            <span className="sub">{article.titleZh}</span>
          </h1>
          <p className="meta">
            {article.speaker} · {article.role}
            <br />
            {durationLabel}
          </p>
        </header>
        <ArticleContent slug={article.slug} blocks={article.blocks} />
        <footer className="article-footer">
          来源：<a href={article.source}>{article.sourceLabel}</a>
          {` · ${article.event}，${article.date}，${article.location}。`}
        </footer>
      </article>

      <aside className="rail rail-right">
        <p className="rail-label">目录</p>
        <Toc headings={headings} active={active} />
      </aside>
    </div>
  );
}

function Toc({
  headings,
  active,
}: {
  headings: HeadingBlock[];
  active: string;
}) {
  return (
    <nav className="toc" aria-label="文章目录">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          aria-current={heading.id === active ? "location" : undefined}
        >
          {heading.zh}
        </a>
      ))}
    </nav>
  );
}
