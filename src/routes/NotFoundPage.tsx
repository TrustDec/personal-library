import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { Nav } from "../components/Nav";

export function NotFoundPage() {
  return (
    <MissingScreen
      title="未找到 · Personal Library"
      kicker="404"
      heading="没有这篇"
      lede="这个地址不在馆藏里。"
      withNav={false}
    />
  );
}

export function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <MissingScreen
        title="未找到 · Personal Library"
        kicker="404"
        heading="没有这篇"
        lede="这个地址不在馆藏里。"
        withNav
      />
    );
  }
  return (
    <MissingScreen
      title="出错了 · Personal Library"
      kicker="Error"
      heading="页面出了问题"
      lede="刷新试试，或回到首页。"
      withNav
    />
  );
}

function MissingScreen({
  title,
  kicker,
  heading,
  lede,
  withNav,
}: {
  title: string;
  kicker: string;
  heading: string;
  lede: string;
  withNav: boolean;
}) {
  return (
    <>
      <title>{title}</title>
      {withNav ? <Nav /> : null}
      <main className="missing">
        <p className="kicker">{kicker}</p>
        <h1>{heading}</h1>
        <p className="lede">{lede}</p>
        <Link className="btn btn-primary" to="/">
          回到首页
        </Link>
      </main>
    </>
  );
}
