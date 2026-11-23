import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { SiteBar } from "../components/SiteBar";

export function NotFoundPage() {
  return (
    <MissingScreen
      title="未找到 · Personal Library"
      kicker="404"
      heading="没有这篇"
      lede="这个地址不在馆藏里。"
    />
  );
}

export function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }
  return (
    <MissingScreen
      title="出错了 · Personal Library"
      kicker="Error"
      heading="页面出了问题"
      lede="刷新试试，或回到首页。"
    />
  );
}

function MissingScreen({
  title,
  kicker,
  heading,
  lede,
}: {
  title: string;
  kicker: string;
  heading: string;
  lede: string;
}) {
  return (
    <>
      <title>{title}</title>
      <SiteBar />
      <div className="wrap">
        <header className="hero">
          <p className="kicker">{kicker}</p>
          <h1>{heading}</h1>
          <p className="lede">{lede}</p>
        </header>
        <p className="empty">
          <Link to="/">回到 Personal Library</Link>
        </p>
      </div>
    </>
  );
}
